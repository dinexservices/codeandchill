import crypto from "crypto";
import { verifyPaymentLogic } from "./verifyPayment.js";

const webhookPayment = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("Razorpay webhook secret not configured");
      return res.status(500).json({ message: "Webhook secret not configured" });
    }

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.body); // ✅ FIXED
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      console.error("Invalid Razorpay webhook signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const body = JSON.parse(req.body.toString()); // parse manually

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
