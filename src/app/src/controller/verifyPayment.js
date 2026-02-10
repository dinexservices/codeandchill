import crypto from "crypto";
import EventRegistration from "../model/eventRegistration.js";
import sendRegistrationEmail from "../utils/sendRegistration.js";

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing"
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature"
      });
    }

    const registration = await EventRegistration.findOne({
      "payment.orderId": razorpay_order_id
    }).populate("event");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // mark payment success
    registration.payment.status = "paid";
    registration.payment.paymentId = razorpay_payment_id;
    await registration.save();

    // send confirmation email per participant
    await Promise.all(
      registration.participants.map((p, index) =>
        sendRegistrationEmail({
          to: p.email,
          participantName: p.name,
          eventTitle: registration.event.title,
          ticketNumber: index + 1,
          totalTickets: registration.ticketCount,
          amount: registration.event.registrationFee
        })
      )
    );

    return res.json({
      success: true,
      message: "Payment verified & registration confirmed",
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

export default verifyPayment;
