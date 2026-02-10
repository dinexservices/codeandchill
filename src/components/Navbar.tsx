"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Rocket, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
const logo = "/logo.png"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added for the new mobile menu

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'} text-white`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative overflow-hidden  transition-all duration-300">
                                <Image src={logo} alt="Logo" width={150} height={150} className="object-cover" />
                            </div>

                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">Home</Link>
                            <div
                                className="relative"
                                onMouseEnter={() => setEventsDropdownOpen(true)}
                                onMouseLeave={() => setEventsDropdownOpen(false)}
                            >
                                <Link href="/events" className="flex items-center gap-1 text-slate-300 hover:text-blue-400 font-medium transition-colors py-2">
                                    Events <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 ${eventsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                    <div className="bg-black rounded-xl shadow-xl border border-blue-800 p-2 overflow-hidden">
                                        <Link href="/events" className="block p-3 rounded-lg hover:bg-blue-900/30 group transition-colors">
                                            <div className="font-semibold text-white group-hover:text-blue-400 mb-0.5">All Events</div>
                                            <div className="text-xs text-slate-400">View upcoming events</div>
                                        </Link>
                                        {/* Code & Chill */}
                                        <Link href="/events/code-and-chill" className="block p-3 rounded-lg hover:bg-blue-900/30 group transition-colors">
                                            <div className="font-semibold text-white group-hover:text-blue-400 mb-0.5">Code & Chill</div>
                                            <div className="text-xs text-slate-400">24-hour AI Hackathon</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link href="/careers" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">Career</Link>
                            <Link href="/contact" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                                Contact Us
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors z-50 relative"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Sidebar */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-black z-[70] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-end p-5">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
                        <Link href="/" className="block text-lg font-medium text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>

                        <div className="space-y-4">
                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Events</div>
                            <Link href="/events" className="block pl-4 text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                All Events
                            </Link>
                            <Link href="/events/code-and-chill" className="block pl-4 text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                Code & Chill
                            </Link>
                        </div>

                        <Link href="/career" className="block text-lg font-medium text-slate-300 hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            Career
                        </Link>

                        <div className="pt-6 border-t border-white/10">
                            <Link href="/contact" className="block w-full py-3 bg-blue-600 text-white font-bold text-center rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20" onClick={() => setIsMobileMenuOpen(false)}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
