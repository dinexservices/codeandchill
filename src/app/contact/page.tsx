"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-semibold mb-6">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            We'd Love to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">Hear from You</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-12">
                            Have questions about the hackathon, sponsorship opportunities, or just want to say hi? Drop us a message.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 mb-1">Email Us</div>
                                    <div className="text-slate-600">hello@codeandchill.com</div>
                                    <div className="text-slate-600">support@codeandchill.com</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-pink-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 mb-1">Call Us</div>
                                    <div className="text-slate-600">+91 98765 43210</div>
                                    <div className="text-slate-500 text-sm mt-1">Mon-Fri, 9am - 6pm</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 mb-1">Visit Us</div>
                                    <div className="text-slate-600">
                                        123 Innovation Hub, Tech Park,<br />
                                        Bangalore, Karnataka - 560100
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-xl">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-600">
                                    <option>General Inquiry</option>
                                    <option>Sponsorship</option>
                                    <option>Registration Issue</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
