import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import ticketReducer from './slices/ticketSlice';
import registrationReducer from './slices/registrationSlice';
import participantReducer from './slices/participantSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
    tickets: ticketReducer,
    registrations: registrationReducer,
    participants: participantReducer,
  },
});
