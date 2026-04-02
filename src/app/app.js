import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import transporter from "./src/config/email.js";


dotenv.config();
const app = express();

// Completely disable Express generating ETags to prevent '304 Not Modified' browser cache CORS issues
app.set('etag', false);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "https://www.codenchill.tech",
  "https://codenchill.tech",
  "https://admin.codenchill.tech",
  "https://organizer.codenchill.tech",
  "https://api.codenchill.tech"
];

// Custom robust CORS middleware to prevent CDN/Browser caching mismatches
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // CRITICAL: Tells CDNs and browsers to cache responses separately per Origin
  res.setHeader("Vary", "Origin");
  
  // Prevent aggressive browser caching on API routes completely to avoid 304 CORS loop
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});
app.use(cookieParser());
import webhookPayment from "./src/controller/webhookPayment.js";

app.post(
  "/api/v1/events/webhook/razorpay",
  express.raw({ type: "application/json" }),
  webhookPayment
);

/* ---------------- BODY PARSERS AFTER ---------------- */
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
import { adminRouter } from "./src/routes/admin.routes.js";

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/admin", adminRouter);


export default app;
