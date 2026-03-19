import mongoose from "mongoose";

// Flexible participant schema — accepts any set of fields the admin configures per ticket
const participantSchema = new mongoose.Schema(
    {
        // Core fields that are always stored if provided (all optional — dynamic per ticket config)
        name:               { type: String, trim: true },
        email:              { type: String, lowercase: true },
        phone:              { type: String },
        college:            { type: String, trim: true },
        registrationNumber: { type: String, trim: true },
        year:               { type: String, trim: true },
        department:         { type: String, trim: true },
    },
    { _id: false, strict: false } // strict: false allows extra fields if needed
);

const paymentSchema = new mongoose.Schema(
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
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        },
        orderId: {
            type: String,
            required: true,
            unique: true
        },
        paymentId: {
            type: String
        },
        status: {
            type: String,
            enum: ["created", "paid", "failed"],
            default: "created"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);