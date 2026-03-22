import Ticket, { AVAILABLE_FIELDS } from "../../model/ticket.js";
import Event from "../../model/event.js";

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

    // Validate and normalize registration fields
    // Supports both new format [{ field, required }] and legacy [string] format
    let normalizedFields;
    if (Array.isArray(registrationFields) && registrationFields.length > 0) {
      normalizedFields = registrationFields
        .map(f => {
          // New format: { field: "name", required: true }
          if (typeof f === 'object' && f !== null && f.field) {
            if (AVAILABLE_FIELDS.includes(f.field)) {
              return { field: f.field, required: f.required !== false };
            }
            return null;
          }
          // Legacy format: "name"
          if (typeof f === 'string' && AVAILABLE_FIELDS.includes(f)) {
            return { field: f, required: true };
          }
          return null;
        })
        .filter(Boolean);
    }
    
    const fields = normalizedFields && normalizedFields.length > 0
      ? normalizedFields
      : [
          { field: "name", required: true },
          { field: "email", required: true },
          { field: "phone", required: true }
        ];

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
