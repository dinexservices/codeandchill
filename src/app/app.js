import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import transporter from "./src/config/email.js";


dotenv.config();
const app = express();


app.use(cors({
  origin: true,
  credentials: true
}));
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
