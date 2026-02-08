import Event from "../../model/event.js";

const createEvent = async (req, res) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      longDescription,
      eventDate,
      durationHours,
      location,
      registrationFee,
      registrationLink,
      highlights,
      domains,
      hackathonFlow,
      coverImage,
      tags
    } = req.body;

    // ✅ Validation
    if (!title || !slug || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: "Title, Slug and Short Description are required."
      });
    }

    // ✅ Slug uniqueness check
    const existingEvent = await Event.findOne({ slug });
    if (existingEvent) {
      return res.status(409).json({
        success: false,
        message: "Event with this slug already exists."
      });
    }

    // ✅ Create event
    const newEvent = await Event.create({
      title,
      slug,
      shortDescription,
      longDescription,
      eventDate,
      durationHours,
      location,
      registrationFee,
      registrationLink,
      highlights,
      domains,
      hackathonFlow,
      coverImage,
      tags
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export default createEvent;
