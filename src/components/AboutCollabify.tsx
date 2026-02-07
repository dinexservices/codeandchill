import React from 'react';
import { Network, Handshake, Users, rocket } from 'lucide-react';
import { Rocket } from 'lucide-react';

const AboutCollabify = () => {
    return (
        <section className="py-24  relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                            Collabify
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Connect, Collaborate, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                                Create Together
                            </span>
                        </h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                Collabify is designed to bridge the gap between student developers and potential co-founders. It's more than just networking; it's about finding the right people to build your dream project with.
                            </p>
                            <p>
                                Whether you need a backend wizard, a frontend artist, or a business strategist, Collabify is the place to meet likeminded individuals.
                            </p>
                        </div>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Speed Networking Sessions",
                                "Team Formation Activities",
                                "Mentor Matching",
                                "Idea Pitching Platform"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <Rocket className="w-3 h-3" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-400/20 to-pink-500/20 rounded-full blur-3xl transform rotate-12" />
                        <div className="relative grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-purple-100 border border-slate-50 mt-12">
                                <Users className="w-10 h-10 text-purple-600 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Find Teammates</h3>
                                <p className="text-slate-500 text-sm">Discover skills that complement yours.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-pink-100 border border-slate-50">
                                <Handshake className="w-10 h-10 text-pink-600 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Build Trust</h3>
                                <p className="text-slate-500 text-sm">Form lasting professional relationships.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-indigo-100 border border-slate-50">
                                <Rocket className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Launch Ideas</h3>
                                <p className="text-slate-500 text-sm">Turn concepts into reality together.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutCollabify;
