import jwt from "jsonwebtoken";
import Admin from "../../model/admin.js";
import transporter from "../../config/email.js";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "admin-secret-key";
const OTP_EXPIRY_MINUTES = 10;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_ADMINISTRATOR_ALIAS || process.env.MAIL_ADMINISTRATOR,
    to: email,
    subject: "Your Admin Login OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <div style="background: #0f172a; padding: 30px; border-radius: 12px;">
          <h2 style="color: #fff; margin: 0 0 20px;">Admin Login OTP</h2>
          <p style="color: #94a3b8; margin: 0 0 20px;">Your One-Time Password for admin login is:</p>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; text-align: center;">
            <span style="font-size: 32px; font-weight: bold; color: #3b82f6; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="color: #64748b; margin: 20px 0 0;">This OTP will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
          <p style="color: #64748b; margin: 10px 0 0; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with this email"
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled"
      });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    await sendOTPEmail(admin.email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email"
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled"
      });
    }

    if (!admin.otp || !admin.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "No OTP requested. Please request OTP first"
      });
    }

    if (new Date() > admin.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one"
      });
    }

    if (admin.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    const token = generateToken(admin);

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("admin_token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Admin logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-otp -otpExpires");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Get current admin error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};
