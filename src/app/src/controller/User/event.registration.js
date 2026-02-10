import Event from "../../model/event.js";
import EventRegistration from "../../model/eventRegistration.js";
import sendRegistrationEmail from "../../utils/sendRegistration.js";


const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { participants, tktCount, teamName, teamLeaderName } = req.body;

    // ✅ Validation
    if (!participants || !Array.isArray(participants)) {
      return res.status(400).json({
        success: false,
        message: "Participants must be an array"
      });
    }

    if (participants.length !== tktCount) {
      return res.status(400).json({
        success: false,
        message: "Ticket count must match number of participants"
      });
    }

    // ✅ Check event exists
    const eventExist = await Event.findById(eventId);
    if (!eventExist) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // ✅ Prevent duplicate email registration per event
    const emails = participants.map(p => p.email);
    const duplicate = await EventRegistration.findOne({
      event: eventId,
      "participants.email": { $in: emails },
      "payment.status": "paid"
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "One or more emails already registered for this event"
      });
    }

    // ✅ Calculate amount
    const totalAmount = eventExist.registrationFee * tktCount;

    // ✅ Create registration
    const registration = await EventRegistration.create({
      event: eventId,
      participants,
      ticketCount: tktCount,
      teamName,
      teamLeaderName,
      payment: {
        amount: totalAmount,
        status: "pending"
      }
    });

   
    await Promise.all(
      participants.map((participant, index) =>
        sendRegistrationEmail({
          to: participant.email,
          participantName: participant.name,
          eventTitle: eventExist.title,
          ticketNumber: index + 1,
          totalTickets: tktCount,
          amount: eventExist.registrationFee
        })
      )
    );

    return res.status(201).json({
      success: true,
      message: "Successfully registered for event",
      data: registration
    });
  } catch (error) {
    console.error("Register Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export default registerForEvent;
