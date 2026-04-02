import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchAllAdminTickets = createAsyncThunk('tickets/fetchAllAdmin', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/v1/events/admin/all-tickets');
    return response.data; // Depending on API format, check later in page how it is consumed
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin tickets');
  }
});

export const fetchEventTickets = createAsyncThunk('tickets/fetchEventTickets', async (eventId, { rejectWithValue }) => {
  try {
    // Try to get using admin endpoint first
    const resAll = await api.get('/api/v1/events/admin/all-tickets');
    const allTickets = resAll.data?.tickets || [];
    const eventTickets = allTickets.filter(
      (t) => (t.event?._id || t.event) === eventId
    );
    
    if (eventTickets.length > 0) {
      return eventTickets;
    }

    // Fallback to public endpoint
    const response = await api.get(`/api/v1/events/${eventId}/tickets`);
    return response.data.tickets || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
  }
});

export const createTicket = createAsyncThunk('tickets/create', async ({ eventId, ticketData }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/v1/events/${eventId}/tickets`, ticketData);
    return response.data.ticket || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create ticket');
  }
});

export const updateTicket = createAsyncThunk('tickets/update', async ({ ticketId, ticketData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/v1/events/tickets/${ticketId}`, ticketData);
    return response.data.ticket || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update ticket');
  }
});

export const deleteTicket = createAsyncThunk('tickets/delete', async (ticketId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/v1/events/tickets/${ticketId}`);
    return ticketId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete ticket');
  }
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    actionLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Event Tickets
      .addCase(fetchEventTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventTickets.fulfilled, (state, action) => {
        state.loading = false;
        // The API returns an array or an object depending on the implementation
        state.tickets = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
      })
      .addCase(fetchEventTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Make sure we just push the object to array or reload locally
        if (action.payload && typeof action.payload === 'object') {
            state.tickets.push(action.payload);
        }
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Update Ticket
      .addCase(updateTicket.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload && action.payload._id) {
          const index = state.tickets.findIndex(t => t._id === action.payload._id);
          if (index !== -1) {
            state.tickets[index] = action.payload;
          }
        }
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Delete Ticket
      .addCase(deleteTicket.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.tickets = state.tickets.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = ticketSlice.actions;
export default ticketSlice.reducer;
