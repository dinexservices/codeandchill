import Razorpay from "../../config/razorpay.js";
import Event from "../model/event.js";
import Ticket from "../model/ticket.js";
import Payment from "../model/payment.js";

const createPayment = async (req, res) => {
  try {
    const {
      eventId,
      ticketId,
      tktCount,
      participants,
      teamName,
      teamLeaderName
    } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Determine price per person
    let pricePerPerson = 0;

    if (ticketId) {
      // Use the selected ticket's price
      const ticket = await Ticket.findById(ticketId);
      if (ticket) {
        pricePerPerson = ticket.price || 0;
      }
    } else {
      // Fall back to event-level registration fee
      pricePerPerson = event.registrationFee || 0;
    }

    const amountInRupees = pricePerPerson * (tktCount || participants?.length || 1);
    const amountInPaise = Math.round(amountInRupees * 100);

    let orderId;

    if (amountInPaise > 0) {
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
      orderId = order.id;
    } else {
      // Free event / free ticket — generate a synthetic order ID
      orderId = `free_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    // Save payment record
    const payment = new Payment({
      event: event._id,
      ticket: ticketId || null,
      participants,
      ticketCount: tktCount || participants?.length || 1,
      teamName,
      teamLeaderName,
      amount: amountInRupees,
      currency: "INR",
      orderId,
      status: "created"
    });

    await payment.save();

    return res.json({
      success: true,
      orderId,
      amount: amountInRupees,
      keyId: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      paymentId: payment._id,
      isFree: amountInRupees === 0
    });
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ message: "Payment initialization failed", error: error.message });
  }
};

export default createPayment;
