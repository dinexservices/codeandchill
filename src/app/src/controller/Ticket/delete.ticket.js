import Ticket from "../../model/ticket.js";

const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Soft delete — set isActive = false
    ticket.isActive = false;
    await ticket.save();

    return res.status(200).json({
      success: true,
      message: "Ticket deactivated successfully"
    });
  } catch (error) {
    console.error("Delete Ticket Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default deleteTicket;
