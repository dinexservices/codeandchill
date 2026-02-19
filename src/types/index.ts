export interface EventData {
    _id?: string; // MongoDB ID from backend
    id: string;
    slug: string;
    title: string;

    // Backend uses different field names
    shortDescription?: string; // Backend field
    longDescription?: string; // Backend field
    description: string; // Frontend display field (mapped from shortDescription)

    // Date fields
    eventDate: string; // Backend field - raw ISO string
    date: string; // Frontend display field (formatted)
    startDate: string; // Mapped from eventDate
    endDate?: string;
    durationHours?: number;

    // Location
    location?: string; // Backend field
    venue: string; // Frontend display field (mapped from location)

    // Pricing
    registrationFee?: number; // Backend field
    price: string; // Frontend display field (mapped from registrationFee)

    // Images
    coverImage?: string; // Backend field
    imageUrl: string; // Frontend display field (mapped from coverImage)

    // Event details
    category?: string;
    subCategory?: string;
    tags?: string[];
    highlights?: string[];

    domains?: string[];

    // Speakers & Sponsors
    speakers?: Array<{ name: string; role?: string; image: string; linkedin?: string; about?: string; }>;
    sponsors?: Array<{ name: string; image: string; website?: string; }>;

    // Structure and flow
    eventStructure?: Array<{
        phaseName: string;
        time: string;
        description?: string;
    }>;
    hackathonFlow?: Array<{
        stepNumber: number;
        title: string;
        description: string;
    }>;

    // Participant benefits
    whatParticipantsWillReceive?: string[];
    rulesAndGuidelines?: string[];
    submissionRequirements?: string[];

    // Prizes
    prizes?: {
        firstPlace?: string;
        secondPlace?: string;
        thirdPlace?: string;
    };

    // Registration
    registrationLink?: string;
    redirectUrl?: string;
    isRegistrationOpen?: boolean;

    // Additional info
    info?: string;
    announcement?: string;

    // Display flags
    featured?: boolean;
    isLive?: boolean;
    isOnline?: boolean;

    // Timestamps
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
