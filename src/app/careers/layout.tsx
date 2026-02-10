import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Careers",
    description: "Join our team at Code & Chill. Explore job openings and internships.",
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
