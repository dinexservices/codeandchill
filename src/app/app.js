import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Event Booking API! 🚀"
    });
});

// Routes
import { eventRouter } from "./src/routes/event.routes.js";

app.use("/api/v1/events", eventRouter);


export default app;
