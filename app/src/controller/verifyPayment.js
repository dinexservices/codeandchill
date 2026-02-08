import Cashfree from "../../config/cashfree.js";
import EventRegistration from "../model/eventRegistration.js";
import sendRegistrationEmail from "../utils/sendRegistration.js";

const verifyPayment = async (req, res) => {
  try {
    const { order_id } = req.query;

    const paymentStatus = await Cashfree.PGFetchOrder("2023-08-01", order_id);

    if (paymentStatus.data.order_status !== "PAID") {
      return res.status(400).json({
        success: false,
        message: "Payment not successful"
      });
    }

    const registration = await EventRegistration.findOne({
      "payment.orderId": order_id
    }).populate("event");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // mark payment success
    registration.payment.status = "paid";
    registration.payment.paymentId = paymentStatus.data.cf_order_id;
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
      message: "Payment verified & registration confirmed"
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

export default verifyPayment;
