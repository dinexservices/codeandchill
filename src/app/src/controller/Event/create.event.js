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
      eventStructure,
      whatParticipantsWillReceive,
      rulesAndGuidelines,
      prizes,
      submissionRequirements,
      coverImage,
      tags
    } = req.body;

    // ✅ Generate slug from title if not provided
    let eventSlug = slug;
    if (!eventSlug && title) {
      eventSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    // ✅ Validation
    if (!title || !eventSlug || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: "Title and Short Description are required."
      });
    }

    // ✅ Slug uniqueness check
    const existingEvent = await Event.findOne({ slug: eventSlug });
    if (existingEvent) {
      return res.status(409).json({
        success: false,
        message: "Event with this slug already exists."
      });
    }

    // ✅ Create event
    const newEvent = await Event.create({
      title,
      slug: eventSlug,
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
      eventStructure,
      whatParticipantsWillReceive,
      rulesAndGuidelines,
      prizes,
      submissionRequirements,
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
