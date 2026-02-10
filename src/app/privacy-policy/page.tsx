import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-20 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Privacy Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <p>At Code and Chill, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and participate in our events.</p>

                    <h2 className="text-white mt-8 mb-4">1. Information We Collect</h2>
                    <p>We may collect personal information that you provide to us voluntarily when you register for an event, such as:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>College/University details</li>
                        <li>Team information</li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Facilitate event registration and management.</li>
                        <li>Process payments and verify transactions.</li>
                        <li>Communicate with you regarding event updates, schedules, and changes.</li>
                        <li>Identify and authenticate users.</li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4">3. Data Security</h2>
                    <p>We implement appropriate technical and organizational security measures to protect your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.</p>

                    <h2 className="text-white mt-8 mb-4">4. Third-Party Services</h2>
                    <p>We use third-party payment processors (Razorpay) to handle financial transactions. Your payment information is processed securely by them and is subject to their privacy policies. We do not store your full payment card details.</p>

                    <h2 className="text-white mt-8 mb-4">5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at support@codeandchill.com.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
