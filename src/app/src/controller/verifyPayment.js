import crypto from "crypto";
import Payment from "../model/payment.js";
import EventRegistration from "../model/eventRegistration.js";
import sendRegistrationEmail from "../utils/sendRegistration.js";
import Event from "../model/event.js";

const verifyPaymentLogic = async (razorpay_order_id, razorpay_payment_id) => {
  const payment = await Payment.findOne({ orderId: razorpay_order_id }).populate("event");

  if (!payment) {
    throw new Error("Payment record not found");
  }

  // Prevent double processing (both webhook and frontend callback might hit this simultaneously)
  if (payment.status === "paid") {
    return { success: true, message: "Payment already verified", alreadyPaid: true };
  }

  // Atomically update payment to prevent race conditions
  const updatedPayment = await Payment.findOneAndUpdate(
    { _id: payment._id, status: { $ne: "paid" } },
    { $set: { status: "paid", paymentId: razorpay_payment_id } },
    { new: true }
  );

  // If updatedPayment is null, another request already processed it
  if (!updatedPayment) {
     return { success: true, message: "Payment already verified", alreadyPaid: true };
  }

  // Create Event Registration
  const registration = new EventRegistration({
    event: payment.event._id,
    ticket: payment.ticket,
    participants: payment.participants,
    ticketCount: payment.ticketCount,
    teamName: payment.teamName,
    teamLeaderName: payment.teamLeaderName,
    payment: {
      amount: payment.amount,
      status: "paid",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    }
  });

  await registration.save();

  // Send ONE consolidated Email to the primary participant (or team leader)
  const primaryParticipant = registration.participants[0];
  if (primaryParticipant && primaryParticipant.email) {
    await sendRegistrationEmail({
      to: primaryParticipant.email,
      participantName: payment.teamLeaderName || primaryParticipant.name || "Participant",
      eventTitle: payment.event.title,
      totalTickets: registration.ticketCount,
      amount: payment.amount,
      teamName: payment.teamName,
      participants: registration.participants
    });
  }

  return { success: true, message: "Payment verified & registration confirmed", registrationId: registration._id };
}

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

    const result = await verifyPaymentLogic(razorpay_order_id, razorpay_payment_id);

    return res.json(result);

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

export { verifyPaymentLogic }; // Export for webhook to use if needed
export default verifyPayment;
