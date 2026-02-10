import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CodeOfConductPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-20 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Code of Conduct</h1>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <p>At Code and Chill, we are dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, or religion.</p>

                    <h2 className="text-white mt-8 mb-4">1. Expected Behavior</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Be respectful and inclusive to people of all backgrounds.</li>
                        <li>Listen to others and respect diverse viewpoints.</li>
                        <li>Be collaborative and helpful to fellow participants.</li>
                        <li>Respect the venue (whether physical or digital) and its rules.</li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4">2. Unacceptable Behavior</h2>
                    <p>We do not tolerate harassment of participants in any form. Harassment includes, but is not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Verbal comments that reinforce social structures of domination related to gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, or religion.</li>
                        <li>Sexual images in public spaces.</li>
                        <li>Deliberate intimidation, stalking, or following.</li>
                        <li>Harassing photography or recording.</li>
                        <li>Sustained disruption of talks or other events.</li>
                        <li>Inappropriate physical contact.</li>
                        <li>Unwelcome sexual attention.</li>
                        <li>Advocating for, or encouraging, any of the above behavior.</li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4">3. Enforcement</h2>
                    <p>Participants asked to stop any harassing behavior are expected to comply immediately.</p>
                    <p>If a participant engages in harassing behavior, the organizers retain the right to take any actions to keep the event a welcoming environment for all participants. This includes warning the offender or expulsion from the event with no refund.</p>

                    <h2 className="text-white mt-8 mb-4">4. Reporting</h2>
                    <p>If someone makes you or anyone else feel unsafe or unwelcome, please report it as soon as possible. You can make a report either personally or anonymously. Harassment and other code of conduct violations reduce the value of our event for everyone. We want you to be happy at our event.</p>
                    <p><strong>Contact:</strong> safety@codeandchill.com</p>

                    <h2 className="text-white mt-8 mb-4">5. Scope</h2>
                    <p>We expect all event participants (contributors, paid or otherwise; sponsors; and other guests) to abide by this Code of Conduct in all event venues and event-related social events.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
