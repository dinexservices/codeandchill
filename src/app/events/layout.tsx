import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Events",
    description: "Browse upcoming coding events, hackathons, and workshops. Register now to participate.",
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
