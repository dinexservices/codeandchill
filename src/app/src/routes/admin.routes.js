import express from "express";
import { sendOTP, verifyOTP, adminLogout, getCurrentAdmin } from "../controller/Admin/auth.controller.js";

export const adminRouter = express.Router();

adminRouter.post("/send-otp", sendOTP);
adminRouter.post("/verify-otp", verifyOTP);
adminRouter.post("/logout", adminLogout);
adminRouter.get("/me", getCurrentAdmin);
