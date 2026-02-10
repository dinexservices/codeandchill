import { fetchEventBySlug } from '@/store/slices/eventSlice';
import { store } from '@/store/store';
import { Metadata, ResolvingMetadata } from 'next';
import EventDetailsClient from './EventDetailsClient';

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;

    // Fetch data
    try {
        const result = await store.dispatch(fetchEventBySlug(slug));

        if (fetchEventBySlug.rejected.match(result)) {
            return {
                title: 'Event Not Found',
            };
        }

        const event = result.payload as any;

        if (!event) {
            return {
                title: 'Event Not Found',
            };
        }

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: event.title,
            description: event.shortDescription || event.description?.slice(0, 160),
            openGraph: {
                title: event.title,
                description: event.shortDescription || event.description?.slice(0, 160),
                images: [event.coverImage || event.imageUrl || '/og-image.jpg', ...previousImages],
            },
        };
    } catch (error) {
        return {
            title: 'Event Details',
        };
    }
}

export default function EventDetailsPage() {
    return <EventDetailsClient />;
}
