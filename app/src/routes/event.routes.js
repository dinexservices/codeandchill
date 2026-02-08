import { Router } from "express";
import createEvent from "../controller/Event/create.event.js";
import registerForEvent from "../controller/User/event.registration.js";


export const eventRouter = Router();


eventRouter.post("/event-create", createEvent);
eventRouter.post("/event-register/:eventId", registerForEvent);