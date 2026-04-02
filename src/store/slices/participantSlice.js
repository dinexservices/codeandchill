import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchParticipants = createAsyncThunk('participants/fetchAll', async (eventId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/v1/events/participation/${eventId}`);
    return response.data.data || response.data.participants || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch participants');
  }
});

const participantSlice = createSlice({
  name: 'participants',
  initialState: {
    participants: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = participantSlice.actions;
export default participantSlice.reducer;
