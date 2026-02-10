import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { EventData } from '@/types';

// Helper function to map backend event to frontend EventData
const mapBackendEvent = (backendEvent: any): EventData => {
    return {
        _id: backendEvent._id,
        id: backendEvent._id || backendEvent.id,
        slug: backendEvent.slug,
        title: backendEvent.title,

        // Map backend fields to frontend fields
        shortDescription: backendEvent.shortDescription,
        longDescription: backendEvent.longDescription,
        description: backendEvent.shortDescription || backendEvent.longDescription || '',

        // Date mapping
        eventDate: backendEvent.eventDate,
        date: backendEvent.eventDate ? new Date(backendEvent.eventDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : '',
        startDate: backendEvent.eventDate || '',
        endDate: backendEvent.eventDate ? new Date(new Date(backendEvent.eventDate).getTime() + (backendEvent.durationHours || 0) * 60 * 60 * 1000).toISOString() : '',
        durationHours: backendEvent.durationHours,

        // Location mapping
        location: backendEvent.location,
        venue: backendEvent.location || '',

        // Price mapping
        registrationFee: backendEvent.registrationFee,
        price: backendEvent.registrationFee ? backendEvent.registrationFee.toString() : 'Free',

        // Image mapping
        coverImage: backendEvent.coverImage && !backendEvent.coverImage.includes('your-cdn-link.com') ? backendEvent.coverImage : '/images/default-event.jpg',
        imageUrl: (backendEvent.coverImage && !backendEvent.coverImage.includes('your-cdn-link.com')) ? backendEvent.coverImage : '/images/default-event.jpg',

        // Event details
        category: backendEvent.category,
        subCategory: backendEvent.subCategory,
        tags: backendEvent.tags,
        highlights: backendEvent.highlights,
        domains: backendEvent.domains,

        // Structure
        eventStructure: backendEvent.eventStructure,
        hackathonFlow: backendEvent.hackathonFlow,

        // Participant benefits
        whatParticipantsWillReceive: backendEvent.whatParticipantsWillReceive,
        rulesAndGuidelines: backendEvent.rulesAndGuidelines,
        submissionRequirements: backendEvent.submissionRequirements,

        // Prizes
        prizes: backendEvent.prizes,

        // Registration
        registrationLink: backendEvent.registrationLink,
        isRegistrationOpen: backendEvent.isRegistrationOpen !== false,

        // Display flags
        featured: backendEvent.featured || false,
        isLive: backendEvent.eventDate ? new Date(backendEvent.eventDate) <= new Date() && new Date() <= new Date(new Date(backendEvent.eventDate).getTime() + (backendEvent.durationHours || 24) * 60 * 60 * 1000) : false,
        isOnline: backendEvent.isOnline || false,

        // Timestamps
        createdAt: backendEvent.createdAt,
        updatedAt: backendEvent.updatedAt,
    };
};

// Async Thunks
export const fetchAllEvents = createAsyncThunk(
    'event/fetchAllEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/v1/events/all');
            return response.data.events.map(mapBackendEvent);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchEventById = createAsyncThunk(
    'event/fetchEventById',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/events/get/${eventId}`);
            return mapBackendEvent(response.data.event);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchEventBySlug = createAsyncThunk(
    'event/fetchEventBySlug',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/events/get-slug/${slug}`);
            return mapBackendEvent(response.data.event);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const registerForEvent = createAsyncThunk(
    'event/registerForEvent',
    async ({ eventId, registrationData }: { eventId: string; registrationData: any }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/events/event-register/${eventId}`, registrationData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const createPayment = createAsyncThunk(
    'event/createPayment',
    async (paymentPayload: any, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/events/create-payment`, paymentPayload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const verifyPayment = createAsyncThunk(
    'event/verifyPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/events/payment-success', paymentData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

// State interface
interface EventState {
    events: EventData[];
    event: EventData | null;
    loading: boolean;
    error: string | null;
    registrationStatus: 'idle' | 'loading' | 'success' | 'error';
    registrationData: any | null;
    paymentStatus: 'idle' | 'loading' | 'success' | 'error';
    paymentData: any | null;
}

const initialState: EventState = {
    events: [],
    event: null,
    loading: false,
    error: null,
    registrationStatus: 'idle',
    registrationData: null,
    paymentStatus: 'idle',
    paymentData: null,
};

// Slice
const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        clearEvent: (state) => {
            state.event = null;
            state.error = null;
        },
        clearRegistration: (state) => {
            state.registrationStatus = 'idle';
            state.registrationData = null;
        },
        clearPayment: (state) => {
            state.paymentStatus = 'idle';
            state.paymentData = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch All Events
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action: PayloadAction<EventData[]>) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Event By ID
        builder
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<EventData>) => {
                state.loading = false;
                state.event = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Event By Slug
        builder
            .addCase(fetchEventBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventBySlug.fulfilled, (state, action: PayloadAction<EventData>) => {
                state.loading = false;
                state.event = action.payload;
            })
            .addCase(fetchEventBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Register for Event
        builder
            .addCase(registerForEvent.pending, (state) => {
                state.registrationStatus = 'loading';
            })
            .addCase(registerForEvent.fulfilled, (state, action) => {
                state.registrationStatus = 'success';
                state.registrationData = action.payload;
            })
            .addCase(registerForEvent.rejected, (state, action) => {
                state.registrationStatus = 'error';
                state.error = action.payload as string;
            });

        // Create Payment
        builder
            .addCase(createPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'success';
                state.paymentData = action.payload;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.paymentStatus = 'error';
                state.error = action.payload as string;
            });

        // Verify Payment
        builder
            .addCase(verifyPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'success';
                state.paymentData = action.payload;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.paymentStatus = 'error';
                state.error = action.payload as string;
            });
    },
});

export const { clearEvent, clearRegistration, clearPayment } = eventSlice.actions;
export default eventSlice.reducer;
