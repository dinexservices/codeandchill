import Ticket from "../../model/ticket.js";
import Event from "../../model/event.js";

const VALID_FIELDS = ["name", "email", "phone", "college", "registrationNumber", "year", "department"];

const createTicket = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      name, description, type, price,
      groupMin, groupMax,
      registrationFields,
      totalSlots, isActive
    } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    // Validate registration fields
    const fields = Array.isArray(registrationFields) && registrationFields.length > 0
      ? registrationFields.filter(f => VALID_FIELDS.includes(f))
      : ["name", "email", "phone"];

    const ticket = await Ticket.create({
      event: eventId,
      name,
      description,
      type: type || "individual",
      price: Number(price),
      groupMin: type === "group" ? Math.max(2, Number(groupMin) || 2) : 1,
      groupMax: type === "group" ? Math.max(Number(groupMin) || 2, Number(groupMax) || 4) : 1,
      registrationFields: fields,
      totalSlots: totalSlots ? Number(totalSlots) : null,
      isActive: isActive !== undefined ? isActive : true
    });

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default createTicket;
