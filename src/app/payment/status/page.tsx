"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Default to 'processing' if no status, but ideally should be success/failure.
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    const transactionId = searchParams.get('transactionId');
    const eventSlug = searchParams.get('eventSlug');

    const isSuccess = status === 'success';

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isSuccess ? 'bg-green-500/10' : 'bg-red-500/10'} rounded-full blur-[120px] pointer-events-none`}></div>
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${isSuccess ? 'bg-blue-600/10' : 'bg-orange-500/10'} rounded-full blur-[120px] pointer-events-none`}></div>

            <Navbar />

            <div className="pt-28 pb-10 grow flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-lg text-center relative overflow-hidden">

                    {/* Icon */}
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${isSuccess ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        {isSuccess ? (
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-500" />
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                    </h1>

                    {/* Message */}
                    <p className="text-slate-400 mb-8 text-lg">
                        {message || (isSuccess ? "Your registration has been confirmed." : "Something went wrong with your payment.")}
                    </p>

                    {/* Details */}
                    {transactionId && (
                        <div className="bg-black/30 rounded-xl p-4 mb-8 border border-white/5">
                            <p className="text-sm text-slate-500 mb-1">Transaction ID</p>
                            <p className="text-white font-mono break-all">{transactionId}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        {isSuccess ? (
                            <>
                                <button
                                    onClick={() => router.push(eventSlug ? `/events/${eventSlug}` : '/events')}
                                    className="w-full py-3.5 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    Go to Event Page <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => router.push('/events')}
                                    className="w-full py-3.5 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    Browse More Events
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.back()}
                                    className="w-full py-3.5 bg-red-600/20 border border-red-500/50 text-red-400 font-bold rounded-xl hover:bg-red-600/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => router.push('/events')}
                                    className="w-full py-3.5 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    Back to Events
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Payment Status",
    description: "Check the status of your payment and registration.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        }>
            <PaymentStatusContent />
        </Suspense>
    );
}
