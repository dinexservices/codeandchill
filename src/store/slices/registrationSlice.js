import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchRegistrations = createAsyncThunk('registrations/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/v1/events/all-registrations');
    return response.data.data || response.data.registrations || response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch registrations');
  }
});

const registrationSlice = createSlice({
  name: 'registrations',
  initialState: {
    registrations: [],
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
      .addCase(fetchRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = registrationSlice.actions;
export default registrationSlice.reducer;
