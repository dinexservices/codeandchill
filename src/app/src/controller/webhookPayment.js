import crypto from "crypto";
import { verifyPaymentLogic } from "./verifyPayment.js";

const webhookPayment = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("Razorpay webhook secret not configured");
      return res.status(500).json({ message: "Webhook secret not configured" });
    }

    // Ensure body is Buffer (important)
    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body));

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    // timing safe comparison
    const isValid =
      signature &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(signature)
      );

    if (!isValid) {
      console.error("Invalid Razorpay webhook signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    // parse safely
    const body = Buffer.isBuffer(req.body)
      ? JSON.parse(req.body.toString())
      : req.body;

    const event = body.event;

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = body.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      console.log(`Processing webhook for order: ${orderId}, payment: ${paymentId}`);

      await verifyPaymentLogic(orderId, paymentId);

      return res.status(200).json({ status: "ok" });
    }

    return res.status(200).json({ status: "ignored" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export default webhookPayment;
