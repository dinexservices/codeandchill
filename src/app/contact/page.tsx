"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500/30 selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <ScrollAnimatedSection direction="right">
                        <div>
                            <span className="inline-block px-4 py-2 bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 rounded-full text-sm font-semibold mb-6">
                                Get in Touch
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                We'd Love to <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-500">Hear from You</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-12 leading-relaxed">
                                Have questions about the hackathon, sponsorship opportunities, or just want to say hi? Drop us a message.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500/30 transition-colors">
                                    <div className="p-3 bg-slate-900 rounded-xl shadow-inner text-indigo-400">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white mb-1">Email Us</div>
                                        <div className="text-slate-300">hello@codeandchill.com</div>
                                        <div className="text-slate-300">support@codeandchill.com</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-pink-500/30 transition-colors">
                                    <div className="p-3 bg-slate-900 rounded-xl shadow-inner text-pink-400">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white mb-1">Call Us</div>
                                        <div className="text-slate-300">+91 98765 43210</div>
                                        <div className="text-slate-400 text-sm mt-1">Mon-Fri, 9am - 6pm</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500/30 transition-colors">
                                    <div className="p-3 bg-slate-900 rounded-xl shadow-inner text-emerald-400">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white mb-1">Visit Us</div>
                                        <div className="text-slate-300">
                                            123 Innovation Hub, Tech Park,<br />
                                            Bangalore, Karnataka - 560100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimatedSection>

                    {/* Contact Form */}
                    <ScrollAnimatedSection direction="left" delay={0.2}>
                        <div className="bg-slate-800 p-8 border border-slate-700 rounded-3xl shadow-xl">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-slate-500 transition-all" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-slate-500 transition-all" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-slate-500 transition-all" placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                    <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-300 transition-all">
                                        <option>General Inquiry</option>
                                        <option>Sponsorship</option>
                                        <option>Registration Issue</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder-slate-500 transition-all" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </ScrollAnimatedSection>

                </div>
            </main>

            <Footer />
        </div>
    );
}
