import Razorpay from "../../config/razorpay.js";
import Event from "../model/event.js";
import EventRegistration from "../model/eventRegistration.js";

const createPayment = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await EventRegistration.findById(registrationId).populate("event");
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const amountInPaise = Math.round(registration.payment.amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${registrationId}`,
      notes: {
        registrationId: registrationId,
        eventTitle: registration.event.title
      }
    };

    const order = await Razorpay.orders.create(options);

    // save orderId
    registration.payment.orderId = order.id;
    await registration.save();

    return res.json({
      success: true,
      orderId: order.id,
      amount: registration.payment.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      registration
    });
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ message: "Payment initialization failed", error: error.message });
  }
};

export default createPayment;
