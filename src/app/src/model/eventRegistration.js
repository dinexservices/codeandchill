import mongoose from "mongoose";

// Flexible participant schema — same field names as the frontend + ticket config
const participantSchema = new mongoose.Schema(
  {
    name:               { type: String, trim: true },
    email:              { type: String, lowercase: true },
    phone:              { type: String },
    college:            { type: String, trim: true },
    registrationNumber: { type: String, trim: true },
    year:               { type: String, trim: true },
    department:         { type: String, trim: true },
  },
  { _id: false, strict: false }
);

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: null
    },

    participants: {
      type: [participantSchema],
      required: true
    },

    ticketCount: {
      type: Number,
      required: true,
      min: 1
    },

    teamName: {
      type: String,
      trim: true
    },

    teamLeaderName: {
      type: String,
      trim: true
    },

    payment: {
      amount: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
      },
      paymentId: String,
      orderId: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("EventRegistration", eventRegistrationSchema);
