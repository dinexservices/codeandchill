import { Router } from "express";
import createEvent from "../controller/Event/create.event.js";
import updateEvent from "../controller/Event/update.event.js";
import registerForEvent from "../controller/User/event.registration.js";
import createPayment from "../controller/createPayment.js";
import verifyPayment from "../controller/verifyPayment.js";
import webhookPayment from "../controller/webhookPayment.js";
import paymentCallback from "../controller/paymentCallback.js";

export const eventRouter = Router();


eventRouter.post("/event-create", createEvent);
eventRouter.put("/event-update/:eventId", updateEvent);
eventRouter.post("/event-register/:eventId", registerForEvent);

// Payment routes
eventRouter.post("/create-payment", createPayment);
eventRouter.post("/payment-success", verifyPayment);
eventRouter.post("/payment-callback", paymentCallback);
eventRouter.post("/webhook/razorpay", webhookPayment);

// Get Routes
import { getAllEvents, getEventById, getEventBySlug } from "../controller/Event/get.event.js";
eventRouter.get("/all", getAllEvents);
eventRouter.get("/get/:eventId", getEventById);
eventRouter.get("/get-slug/:slug", getEventBySlug);