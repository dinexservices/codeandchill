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

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'} border-b ${scrolled ? 'border-slate-800' : 'border-transparent'} text-white`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative overflow-hidden  transition-all duration-300">
                            <Image src={logo} alt="Logo" width={150} height={150}  className="object-cover" />
                        </div>
                    
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">Home</Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setEventsDropdownOpen(true)}
                            onMouseLeave={() => setEventsDropdownOpen(false)}
                        >
                            <Link href="/events" className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 font-medium transition-colors py-2">
                                Events <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
                            </Link>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 ${eventsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 p-2 overflow-hidden">
                                    <Link href="/events" className="block p-3 rounded-lg hover:bg-slate-800 group transition-colors">
                                        <div className="font-semibold text-white group-hover:text-cyan-400 mb-0.5">All Events</div>
                                        <div className="text-xs text-slate-400">View upcoming events</div>
                                    </Link>
                                    {/* Code & Chill */}
                                    <Link href="/events/code-and-chill" className="block p-3 rounded-lg hover:bg-slate-800 group transition-colors">
                                        <div className="font-semibold text-white group-hover:text-cyan-400 mb-0.5">Code & Chill</div>
                                        <div className="text-xs text-slate-400">24-hour AI Hackathon</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/career" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">Career</Link>
                        <Link href="/contact" className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20">
                            Contact Us
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 py-6 space-y-4">
                    <Link href="/" className="block text-slate-300 hover:text-cyan-400 font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <div className="space-y-2">
                        <Link href="/events" className="block text-slate-500 font-medium text-sm uppercase tracking-wider pl-1 hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
                        <Link href="/events/code-and-chill" className="block pl-4 py-2 border-l-2 border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            Code & Chill
                        </Link>
                    </div>
                    <Link href="/career" className="block text-slate-300 hover:text-cyan-400 font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Career</Link>
                    <Link href="/contact" className="block w-full py-3 bg-white text-slate-900 font-bold text-center rounded-xl hover:bg-slate-200 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
