import Ticket from "../../model/ticket.js";

// Get all active tickets for a specific event (public)
export const getTicketsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const tickets = await Ticket.find({ event: eventId, isActive: true }).sort({ price: 1 });

    return res.status(200).json({
      success: true,
      message: "Tickets fetched successfully",
      tickets
    });
  } catch (error) {
    console.error("Get Tickets Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get ALL tickets across all events (admin)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("event", "title slug").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All tickets fetched",
      tickets
    });
  } catch (error) {
    console.error("Get All Tickets Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
