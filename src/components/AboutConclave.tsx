import React from 'react';
import { Mic, Users, Lightbulb, Zap } from 'lucide-react';

const AboutConclave = () => {
    return (
        <section className="py-24  relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-3xl blur-3xl transform -rotate-3" />
                        <div className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-amber-50 p-6 rounded-2xl">
                                        <Mic className="w-8 h-8 text-amber-600 mb-2" />
                                        <div className="font-bold text-slate-900">Keynotes</div>
                                        <div className="text-sm text-slate-500">Industry Leaders</div>
                                    </div>
                                    <div className="bg-orange-50 p-6 rounded-2xl">
                                        <Users className="w-8 h-8 text-orange-600 mb-2" />
                                        <div className="font-bold text-slate-900">Panels</div>
                                        <div className="text-sm text-slate-500">Interactive Discussions</div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="bg-yellow-50 p-6 rounded-2xl">
                                        <Lightbulb className="w-8 h-8 text-yellow-600 mb-2" />
                                        <div className="font-bold text-slate-900">Innovation</div>
                                        <div className="text-sm text-slate-500">Future Tech Trends</div>
                                    </div>
                                    <div className="bg-red-50 p-6 rounded-2xl">
                                        <Zap className="w-8 h-8 text-red-600 mb-2" />
                                        <div className="font-bold text-slate-900">Networking</div>
                                        <div className="text-sm text-slate-500">Connect with Experts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                            Tech Conclave
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Shaping the Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                of Technology
                            </span>
                        </h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                The Tech Conclave is a premier gathering of thought leaders, innovators, and industry experts discussing the latest trends in AI, Web3, and Sustainable Technology.
                            </p>
                            <p>
                                Join us for insightful keynote sessions, engaging panel discussions, and networking opportunities that will broaden your perspective on the tech landscape.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">
                                View Schedule
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                                Meet Speakers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutConclave;
