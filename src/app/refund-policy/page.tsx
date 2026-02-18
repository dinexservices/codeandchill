import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-20 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Fund Management & Refund Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <p className="text-lg text-slate-400 mb-8 border-l-4 border-cyan-500 pl-4">
                        <strong>Event:</strong> Code & Chill – 24 Hour AI Hackathon<br />
                        <strong>Organized by:</strong> Collabify LPU<br />
                        <strong>In Collaboration with:</strong> Conclave Tech Media<br />
                        <strong>Under Guidance:</strong> Division of Student Welfare (DSW) & Division of Student Organizations (DSO), Lovely Professional University, Punjab<br />
                        <strong>Date:</strong> 27–28 February 2026
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 text-sm font-bold">1</span>
                            Fund Management Policy
                        </h2>
                        <p className="mb-4">
                            The organizing committee of Code & Chill – 24 Hour AI Hackathon commits to proper financial governance, transparency, and responsible utilization of funds in accordance with the event guidelines of Lovely Professional University (DSO & DSW).
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h3 className="text-xl font-semibold text-cyan-400 mb-3">1.1 Sources of Funds</h3>
                                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                    <li>Participant registration fees</li>
                                    <li>Sponsorships (monetary or in-kind)</li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                <h3 className="text-xl font-semibold text-cyan-400 mb-3">1.2 Utilization of Funds</h3>
                                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                    <li>Event kits, ID badges, and certificates</li>
                                    <li>Speaker, mentor and judge hospitality</li>
                                    <li>Branding materials and marketing outreach</li>
                                    <li>Prize pool, trophies and recognition awards</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">1.3 Financial Oversight & Accountability</h3>
                                <p>All major expenditures will be supervised by the core organizing committee and will follow DSO & DSW event conduct norms.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">1.4 Surplus & Deficit Handling</h3>
                                <p>Any surplus will be used only for future student technical activities. Any deficit will be borne by the organizing team and no additional charges will be collected from participants.</p>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-slate-800 mb-12"></div>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 text-sm font-bold">2</span>
                            Refund Policy
                        </h2>
                        <p className="mb-4">
                            The registration fee is collected for logistics, materials, and operational arrangements and is treated as event commitment charges.
                        </p>

                        <h3 className="text-xl font-semibold text-white mt-8 mb-4">2.1 Participant Cancellation</h3>
                        <div className="overflow-x-auto rounded-lg border border-slate-700">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr>
                                        <th className="p-4 font-semibold">Cancellation Period</th>
                                        <th className="p-4 font-semibold">Refund Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-900/40 divide-y divide-slate-800">
                                    <tr>
                                        <td className="p-4">7 or more days before event</td>
                                        <td className="p-4 text-green-400 font-semibold">70% refund</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">3–6 days before event</td>
                                        <td className="p-4 text-yellow-400 font-semibold">40% refund</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Less than 72 hours before event</td>
                                        <td className="p-4 text-red-400 font-semibold">No refund</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">2.2 Replacement Policy</h3>
                                <p className="text-slate-400">Participants may transfer their slot once, at least 48 hours before the event.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">2.3 Event Rescheduling</h3>
                                <p className="text-slate-400">If the event is rescheduled due to university or government instructions, participants may attend on the new date or request a 100% refund within 5 working days of announcement.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">2.4 Event Cancellation</h3>
                                <p className="text-slate-400">If the event is cancelled by the organizers or university authorities, participants will receive a simple 100% refund within 5 working days.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">2.5 Force Majeure</h3>
                                <p className="text-slate-400">Full refunds apply in case of natural disasters, pandemic restrictions, or government orders.</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-red-200 mb-2">2.6 Non-Refundable Situations</h3>
                            <p className="text-red-300">Refunds are not applicable for no-show, voluntary withdrawal during the event, or disqualification due to misconduct.</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-white mb-2">2.7 Refund Processing</h3>
                            <p className="text-slate-300">Refunds will be processed to the original payment method within 5 working days after approval.</p>
                        </div>
                    </section>

                    <div className="w-full h-px bg-slate-800 mb-12"></div>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 text-sm font-bold">3</span>
                            Contact Information
                        </h2>
                        <div className="bg-linear-to-r from-slate-900 to-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Organizer</p>
                                <p className="text-lg text-white font-medium">Collabify LPU – Code & Chill Hackathon</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Official Email</p>
                                <a href="mailto:Collabify.lpu@gmail.com" className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Collabify.lpu@gmail.com</a>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </div>
    );
}
