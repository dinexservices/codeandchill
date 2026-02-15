import eventRegistration from "../../model/eventRegistration.js";

const fetchEventParticipation = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await eventRegistration.find({ event: eventId });

    // Flatten participants array
    const participants = registrations.flatMap((reg) =>
      reg.participants.map((p) => ({
        name: p.name,
        registrationNumber: p.registrationNumber,
        email: p.email,
        phoneNum: p.phoneNum,
        collegeName: p.collegeName,
        course: p.course,
        yearOfStudy: p.yearOfStudy,
      })),
    );

    res.status(200).json({
      success: true,
      data: participants,
    });
  } catch (error) {
    console.error("Error fetching event participation:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching event participation.",
    });
  }
};

export default fetchEventParticipation;