import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        registrationNumber: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        collegeName: {
            type: String,
            required: true,
            trim: true
        },
        course: {
            type: String,
            required: true,
            trim: true
        },
        yearOfStudy: {
            type: String,
            required: true,
            trim: true
        }
    },
    { _id: false }
);

const paymentSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
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