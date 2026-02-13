import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import transporter from "./src/config/email.js";


dotenv.config();
const app = express();

// Enable CORS for frontend
const allowedOrigins = [
    'http://localhost:3000',
    'https://www.codenchill.tech',
    'https://codenchill.tech',
    process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
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
transporter.verify((err, success) => {
  if (err) console.log(err);
  else console.log("Server is ready to send mail");
});


// Routes
import { eventRouter } from "./src/routes/event.routes.js";

app.use("/api/v1/events", eventRouter);


export default app;
