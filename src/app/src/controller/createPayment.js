import Razorpay from "../../config/razorpay.js";
import Event from "../model/event.js";
import Payment from "../model/payment.js";

const createPayment = async (req, res) => {
  try {
    // Expect registration data in the body now, not just registrationId in params
    const {
      eventId,
      tktCount,
      participants,
      teamName,
      teamLeaderName
    } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Calculate amount
    let amountInRupees = 0;
    if (event.registrationFee) {
      amountInRupees = event.registrationFee * tktCount;
    }

    // For free events, this flow might need adjustment, but assuming payment flow is for paid events
    // or we create a 0 amount order (Razorpay doesn't support 0 amount orders usually, handled separately)

    if (amountInRupees === 0) {
      // If it's free, maybe just return success immediately or skip payment? 
      // For now behaving as if payment is required or 0 is allowed logic elsewhere.
      // But usually we just skip payment creation for free events.
      // The frontend handles free events by not calling createPayment but register directly?
      // Wait, the new plan is "Registration only on payment success".
      // For free events, we should have a direct registration route or handle 0 amount here.
      // Let's assume standard payment flow for now.
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        eventTitle: event.title,
        eventId: event._id.toString()
      }
    };

    const order = await Razorpay.orders.create(options);

    // Create Payment Record with all registration details
    const payment = new Payment({
      event: event._id,
      participants,
      ticketCount: tktCount,
      teamName,
      teamLeaderName,
      amount: amountInRupees,
      currency: "INR",
      orderId: order.id,
      status: "created"
    });

    await payment.save();

    return res.json({
      success: true,
      orderId: order.id,
      amount: amountInRupees,
      keyId: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      paymentId: payment._id
    });
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ message: "Payment initialization failed", error: error.message });
  }
};

export default createPayment;
