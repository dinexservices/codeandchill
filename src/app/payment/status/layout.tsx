import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Payment Status",
    description: "Check the status of your payment and registration.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PaymentStatusLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
