import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    longDescription: {
      type: String
    },

    eventDate: {
      type: Date,
      default: null
    },

    durationHours: {
      type: Number,
      default: 0
    },

    location: String,

    registrationFee: {
      type: Number,
      default: 0
    },

    registrationLink: String,

    redirectUrl: String, // URL to redirect to when "Register" is clicked

    highlights: {
      type: [String],
      default: []
    },

    domains: {
      type: [String],
      default: []
    },

    hackathonFlow: [
      {
        stepNumber: Number,
        title: String,
        description: String
      }
    ],

    eventStructure: [
      {
        phaseName: { type: String, required: true },
        time: { type: String, required: true },
        description: String
      }
    ],

    whatParticipantsWillReceive: {
      type: [String],
      default: []
    },

    rulesAndGuidelines: {
      type: [String],
      default: []
    },

    prizes: {
      firstPlace: String,
      secondPlace: String,
      thirdPlace: String
    },

    submissionRequirements: {
      type: [String],
      default: []
    },

    coverImage: String,

    tags: {
      type: [String],
      default: []
    },

    speakers: [
      {
        name: String,
        role: String,
        image: String,
        linkedin: String,
        about: String
      }
    ],

    sponsors: [
      {
        name: String,
        image: String,
        website: String
      }
    ],

    visibilityConfig: {
      showTickets: { type: Boolean, default: true },
      showAbout: { type: Boolean, default: true },
      showHighlights: { type: Boolean, default: true },
      showSpeakers: { type: Boolean, default: true },
      showDomains: { type: Boolean, default: true },
      showSchedule: { type: Boolean, default: true },
      showTimeline: { type: Boolean, default: true },
      showPrizes: { type: Boolean, default: true },
      showSponsors: { type: Boolean, default: true },
      showGuidelines: { type: Boolean, default: true }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Event", eventSchema);
