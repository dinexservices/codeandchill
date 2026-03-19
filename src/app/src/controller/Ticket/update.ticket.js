import Ticket from "../../model/ticket.js";

const VALID_FIELDS = ["name", "email", "phone", "college", "registrationNumber", "year", "department"];

const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const {
      name, description, type, price,
      groupMin, groupMax,
      registrationFields, requiresTeamDetails,
      totalSlots, isActive
    } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    if (name !== undefined) ticket.name = name;
    if (description !== undefined) ticket.description = description;
    if (type !== undefined) ticket.type = type;
    if (price !== undefined) ticket.price = Number(price);
    if (totalSlots !== undefined) ticket.totalSlots = totalSlots === null ? null : Number(totalSlots);
    if (isActive !== undefined) ticket.isActive = isActive;
    if (requiresTeamDetails !== undefined) ticket.requiresTeamDetails = requiresTeamDetails;

    // Update group size range
    const resolvedType = type || ticket.type;
    if (resolvedType === "group") {
      if (groupMin !== undefined) ticket.groupMin = Math.max(1, Number(groupMin));
      if (groupMax !== undefined) ticket.groupMax = Math.max(ticket.groupMin, Number(groupMax));
    } else {
      ticket.groupMin = 1;
      ticket.groupMax = 1;
    }

    // Update registration fields
    if (Array.isArray(registrationFields)) {
      const valid = registrationFields.filter(f => VALID_FIELDS.includes(f));
      if (valid.length > 0) ticket.registrationFields = valid;
    }

    await ticket.save();

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket
    });
  } catch (error) {
    console.error("Update Ticket Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default updateTicket;
