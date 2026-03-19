import Event from "../../model/event.js";
import Ticket from "../../model/ticket.js";

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Soft-delete all associated tickets first
    await Ticket.updateMany({ event: eventId }, { $set: { isActive: false } });

    // Hard-delete the event (or use soft-delete by adding isDeleted field — hard for now)
    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "Event and its tickets deleted successfully"
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default deleteEvent;
