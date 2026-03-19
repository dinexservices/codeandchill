import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    default: "Admin"
  },
  role: {
    type: String,
    enum: ["super_admin", "admin"],
    default: "admin"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  otp: {
    type: String,
    default: null
  },
  otpExpires: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model("Admin", adminSchema);
