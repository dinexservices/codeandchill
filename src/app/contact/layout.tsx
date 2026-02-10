import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Code & Chill. We'd love to hear from you regarding collaborations, support, or general inquiries.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
