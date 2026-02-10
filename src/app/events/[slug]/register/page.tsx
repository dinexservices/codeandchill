import { fetchEventBySlug } from '@/store/slices/eventSlice';
import { store } from '@/store/store';
import { Metadata, ResolvingMetadata } from 'next';
import RegisterClient from './RegisterClient';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    // Fetch data
    try {
        const result = await store.dispatch(fetchEventBySlug(slug));

        if (fetchEventBySlug.rejected.match(result)) {
            return {
                title: 'Register for Event',
            };
        }

        const event = result.payload as any;

        if (!event) {
            return {
                title: 'Register for Event',
            };
        }

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `Register for ${event.title}`,
            description: `Secure your spot for ${event.title}. ${event.shortDescription || ''}`,
            openGraph: {
                title: `Register for ${event.title}`,
                description: `Secure your spot for ${event.title}.`,
                images: [event.coverImage || event.imageUrl || '/og-image.jpg', ...previousImages],
            },
        };
    } catch (error) {
        return {
            title: 'Register for Event',
        };
    }
}

export default function RegisterPage() {
    return <RegisterClient />;
}
