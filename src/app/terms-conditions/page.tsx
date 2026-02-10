import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsConditionsPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-20 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Terms & Conditions</h1>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-white mt-8 mb-4">1. Introduction</h2>
                    <p>Welcome to Code and Chill. By accessing our website and registering for our events, you agree to comply with and be bound by the following terms and conditions.</p>

                    <h2 className="text-white mt-8 mb-4">2. Event Registration</h2>
                    <p>When you register for an event, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.</p>
                    <p>We reserve the right to refuse service, terminate accounts, or cancel registrations at our sole discretion.</p>

                    <h2 className="text-white mt-8 mb-4">3. Payments and Refunds</h2>
                    <p>All payments are processed securely. Event registration fees are generally non-refundable unless the event is cancelled by the organizers.</p>

                    <h2 className="text-white mt-8 mb-4">4. Code of Conduct</h2>
                    <p>All participants are expected to adhere to our <a href="/code-of-conduct" className="text-cyan-400 hover:text-cyan-300 underline">Code of Conduct</a>. Harassment or inappropriate behavior will not be tolerated and may result in expulsion from the event without refund.</p>

                    <h2 className="text-white mt-8 mb-4">5. Intellectual Property</h2>
                    <p>The content, layout, design, data, and graphics on this website are protected by intellectual property laws. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service for any commercial purposes.</p>

                    <h2 className="text-white mt-8 mb-4">6. Limitation of Liability</h2>
                    <p>Code and Chill shall not be liable for any direct, indirect, incidental, special, consequential or punitive damages resulting from your access to or use of our services.</p>

                    <h2 className="text-white mt-8 mb-4">7. Changes to Terms</h2>
                    <p>We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website after any changes indicates your acceptance of the new Terms.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
