import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchEvents = createAsyncThunk('events/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/v1/events/all');
    return response.data.events;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
  }
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/v1/events/get/${eventId}`);
    return response.data.event;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
  }
});

export const createEvent = createAsyncThunk('events/create', async (eventData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': eventData instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    };
    const response = await api.post('/api/v1/events/event-create', eventData, config);
    return response.data.event;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create event');
  }
});

export const updateEvent = createAsyncThunk('events/update', async ({ eventId, eventData }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': eventData instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    };
    const response = await api.put(`/api/v1/events/event-update/${eventId}`, eventData, config);
    return response.data.event;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update event');
  }
});

export const deleteEvent = createAsyncThunk('events/delete', async (eventId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/v1/events/event-delete/${eventId}`);
    return eventId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
  }
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null,
    actionLoading: false,
  },
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By Id
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload) {
          state.events.push(action.payload);
        }
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload) {
          state.currentEvent = action.payload;
          const index = state.events.findIndex(e => e._id === action.payload._id);
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.events = state.events.filter(e => e._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentEvent, clearError } = eventSlice.actions;
export default eventSlice.reducer;
