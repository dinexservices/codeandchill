import Event from "../../model/event.js";

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
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
            tags,
            speakers,
            sponsors
        } = req.body;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required."
            });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        // Handle slug update if provided
        if (slug && slug !== event.slug) {
            const existingSlug = await Event.findOne({ slug });
            if (existingSlug) {
                return res.status(409).json({
                    success: false,
                    message: "Event with this slug already exists."
                });
            }
            event.slug = slug;
        }

        // Update fields
        if (title) event.title = title;
        if (shortDescription) event.shortDescription = shortDescription;
        if (longDescription) event.longDescription = longDescription;
        if (eventDate) event.eventDate = eventDate;
        if (durationHours) event.durationHours = durationHours;
        if (location) event.location = location;
        if (registrationFee !== undefined) event.registrationFee = registrationFee;
        if (registrationLink) event.registrationLink = registrationLink;
        if (highlights) event.highlights = highlights;
        if (domains) event.domains = domains;
        if (hackathonFlow) event.hackathonFlow = hackathonFlow;
        if (eventStructure) event.eventStructure = eventStructure;
        if (whatParticipantsWillReceive) event.whatParticipantsWillReceive = whatParticipantsWillReceive;
        if (rulesAndGuidelines) event.rulesAndGuidelines = rulesAndGuidelines;
        if (prizes) event.prizes = prizes;
        if (submissionRequirements) event.submissionRequirements = submissionRequirements;
        if (coverImage) event.coverImage = coverImage;
        if (tags) event.tags = tags;
        if (speakers) event.speakers = speakers;
        if (sponsors) event.sponsors = sponsors;

        const updatedEvent = await event.save();

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (error) {
        console.error("Update Event Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default updateEvent;
