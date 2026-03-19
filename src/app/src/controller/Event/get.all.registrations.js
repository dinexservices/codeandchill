import eventRegistration from "../../model/eventRegistration.js";
import Event from "../../model/event.js";

// GET /api/v1/events/all-registrations
// Returns all events with their registrations nested inside
const getAllRegistrations = async (req, res) => {
  try {
    // Fetch all events (light fields only)
    const events = await Event.find({}, "_id title coverImage eventDate location").lean();

    // Fetch all registrations, grouped by event
    const registrations = await eventRegistration
      .find({})
      .sort({ createdAt: -1 })
      .lean();

    // Map eventId -> registrations[]
    const regMap = {};
    for (const reg of registrations) {
      const eid = reg.event.toString();
      if (!regMap[eid]) regMap[eid] = [];
      regMap[eid].push(reg);
    }

    // Build response: events that have at least one registration come first
    const result = events
      .map((ev) => ({
        event: ev,
        registrations: regMap[ev._id.toString()] || [],
        totalRegistrations: (regMap[ev._id.toString()] || []).length,
        totalParticipants: (regMap[ev._id.toString()] || []).reduce(
          (sum, r) => sum + (r.participants?.length || 0),
          0
        ),
        totalRevenue: (regMap[ev._id.toString()] || [])
          .filter((r) => r.payment?.status === "paid")
          .reduce((sum, r) => sum + (r.payment?.amount || 0), 0),
      }))
      .sort((a, b) => b.totalRegistrations - a.totalRegistrations);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching all registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations.",
    });
  }
};

export default getAllRegistrations;
