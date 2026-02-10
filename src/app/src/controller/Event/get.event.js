import Event from "../../model/event.js";

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ eventDate: 1 });

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events
        });
    } catch (error) {
        console.error("Get All Events Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event fetched successfully",
            event
        });
    } catch (error) {
        console.error("Get Event Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getEventBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const event = await Event.findOne({ slug });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event fetched successfully",
            event
        });
    } catch (error) {
        console.error("Get Event By Slug Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
