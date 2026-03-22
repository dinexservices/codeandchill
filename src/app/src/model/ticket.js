import mongoose from "mongoose";

// All possible registration fields the admin can choose from
export const AVAILABLE_FIELDS = [
  // Standard fields
  "name",
  "email",
  "phone",
  "college",
  "registrationNumber",
  "year",
  "department",
  // Startup / founder fields
  "startupName",
  "state",
  "city",
  "website",
  "pitchDeck",
  "stage",
  "sector",
];

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    // 'individual' = one person per ticket
    // 'group'      = between groupMin–groupMax people share one purchase
    type: {
      type: String,
      enum: ["individual", "group"],
      default: "individual"
    },

    // Price PER PERSON (always)
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    // For group tickets: minimum team size (min 2)
    groupMin: {
      type: Number,
      default: 2,
      min: 1
    },

    // For group tickets: maximum team size (null = no upper limit beyond totalSlots)
    groupMax: {
      type: Number,
      default: 4
    },

    // Which fields the admin wants to collect from each participant
    // Array of objects with field name and required flag
    // Example: [{ field: "name", required: true }, { field: "phone", required: false }]
    registrationFields: {
      type: [{
        field: { type: String, required: true },
        required: { type: Boolean, default: true }
      }],
      default: [
        { field: "name", required: true },
        { field: "email", required: true },
        { field: "phone", required: true }
      ]
    },

    // Whether this ticket requires collecting 'teamName' and 'teamLeaderName'
    // when participationType is 'team'
    requiresTeamDetails: {
      type: Boolean,
      default: false
    },

    // null = unlimited slots
    totalSlots: {
      type: Number,
      default: null
    },

    soldCount: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual: available slots (null if unlimited)
ticketSchema.virtual("availableSlots").get(function () {
  if (this.totalSlots === null) return null;
  return Math.max(0, this.totalSlots - this.soldCount);
});

ticketSchema.set("toJSON", { virtuals: true });
ticketSchema.set("toObject", { virtuals: true });

export default mongoose.model("Ticket", ticketSchema);
