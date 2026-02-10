"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const contactDetails = [
    {
        icon: <Mail className="w-8 h-8 text-cyan-400" />,
        title: "Email Us",
        value: "hello@codeandchill.com",
        link: "mailto:hello@codeandchill.com",
        description: "For general inquiries and support."
    },
    {
        icon: <Phone className="w-8 h-8 text-purple-400" />,
        title: "Call Us",
        value: "+91 98765 43210",
        link: "tel:+919876543210",
        description: "Mon-Fri from 9am to 6pm."
    },
    {
        icon: <MapPin className="w-8 h-8 text-pink-400" />,
        title: "Visit Us",
        value: "Bengaluru, India",
        link: "https://maps.google.com",
        description: "Come say hello at our HQ."
    }
];

const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
];

// Metadata moved to layout.tsx

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center">

                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                            Get in Touch.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            We'd love to hear from you. Whether you have a question about events, pricing, or just want to say hi.
                        </p>
                    </motion.div>
                </div>

                {/* Contact Grid */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-20 w-full">
                    {contactDetails.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group text-center flex flex-col items-center"
                        >
                            <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-cyan-400 font-medium text-lg mb-2">{item.value}</p>
                            <p className="text-slate-500 text-sm">{item.description}</p>
                        </motion.a>
                    ))}
                </div>

                {/* Socials & Location */}
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8">Connect with us on Social Media</h2>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-500 transition-all hover:-translate-y-1"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
