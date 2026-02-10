import { Router } from "express";
import createEvent from "../controller/Event/create.event.js";
import registerForEvent from "../controller/User/event.registration.js";
import createPayment from "../controller/createPayment.js";
import verifyPayment from "../controller/verifyPayment.js";

export const eventRouter = Router();


eventRouter.post("/event-create", createEvent);
eventRouter.post("/event-register/:eventId", registerForEvent);

// Payment routes
eventRouter.post("/create-payment/:registrationId", createPayment);
eventRouter.post("/payment-success", verifyPayment);

// Get Routes
import { getAllEvents, getEventById, getEventBySlug } from "../controller/Event/get.event.js";
eventRouter.get("/all", getAllEvents);
eventRouter.get("/get/:eventId", getEventById);
eventRouter.get("/get-slug/:slug", getEventBySlug);