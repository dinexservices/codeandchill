import express from "express";
import createEvent from "../controller/Event/create.event.js";
import updateEvent from "../controller/Event/update.event.js";
import deleteEvent from "../controller/Event/delete.event.js";
import registerForEvent from "../controller/User/event.registration.js";
import createPayment from "../controller/createPayment.js";
import verifyPayment from "../controller/verifyPayment.js";
import webhookPayment from "../controller/webhookPayment.js";
import paymentCallback from "../controller/paymentCallback.js";

export const eventRouter = express.Router();

eventRouter.post("/event-create", createEvent);
eventRouter.put("/event-update/:eventId", updateEvent);
eventRouter.delete("/event-delete/:eventId", deleteEvent);
eventRouter.post("/event-register/:eventId", registerForEvent);

// Payment routes
eventRouter.post("/create-payment", createPayment);
eventRouter.post("/payment-success", verifyPayment);
eventRouter.post("/payment-callback", paymentCallback);


// Fetch event participation
import fetchEventParticipation from "../controller/User/fetch.eventParticipation.js";
eventRouter.get("/participation/:eventId", fetchEventParticipation);

// Get Routes
import { getAllEvents, getEventById, getEventBySlug } from "../controller/Event/get.event.js";
eventRouter.get("/all", getAllEvents);
eventRouter.get("/get/:eventId", getEventById);
eventRouter.get("/get-slug/:slug", getEventBySlug);

// All registrations grouped by event (admin)
import getAllRegistrations from "../controller/Event/get.all.registrations.js";
eventRouter.get("/all-registrations", getAllRegistrations);

// Export registrations to Excel (admin) — ?eventId=<id> for single, omit for all
import exportRegistrationsExcel from "../controller/Event/export.registrations.js";
eventRouter.get("/export-excel", exportRegistrationsExcel);

// ── Ticket Routes ──────────────────────────────────────────────────────────
import createTicket from "../controller/Ticket/create.ticket.js";
import { getTicketsByEvent, getAllTickets } from "../controller/Ticket/get.tickets.js";
import updateTicket from "../controller/Ticket/update.ticket.js";
import deleteTicket from "../controller/Ticket/delete.ticket.js";

// Public: get active tickets for an event
eventRouter.get("/:eventId/tickets", getTicketsByEvent);

// Admin: create ticket for an event
eventRouter.post("/:eventId/tickets", createTicket);

// Admin: update / soft-delete a specific ticket
eventRouter.put("/tickets/:ticketId", updateTicket);
eventRouter.delete("/tickets/:ticketId", deleteTicket);

// Admin: all tickets across all events
eventRouter.get("/admin/all-tickets", getAllTickets);