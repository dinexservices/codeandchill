"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Rocket, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
const logo = "/conclave.png"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                            <Image src={logo} alt="Logo" width={50} height={50} />
                        </div>
                        <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                            Conclave TechMedia
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Home</Link>

                        <Link href="/about" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">About</Link>

                        {/* Events Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setEventsDropdownOpen(true)}
                            onMouseLeave={() => setEventsDropdownOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-slate-600 hover:text-cyan-600 font-medium transition-colors py-2">
                                Events <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 ${eventsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                                    <Link href="/events/code-and-chill" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:bg-blue-100 transition-colors">
                                            <Rocket className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Code & Chill</div>
                                            <div className="text-xs text-slate-500">24H AI Hackathon</div>
                                        </div>
                                    </Link>
                                    {/* <Link href="/events/collabify" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:bg-purple-100 transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Collabify</div>
                                            <div className="text-xs text-slate-500">Network & Grow</div>
                                        </div>
                                    </Link>
                                    <Link href="/events/conclave" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item">
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover/item:bg-amber-100 transition-colors">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Tech Conclave</div>
                                            <div className="text-xs text-slate-500">Expert Sessions</div>
                                        </div>
                                    </Link> */}
                                    <div className="h-px bg-slate-100 my-1" />
                                    <Link href="/events" className="block text-center py-2 text-sm text-cyan-600 font-medium hover:bg-slate-50 rounded-lg transition-colors">
                                        View All Events
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/career" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Career</Link>

                        <Link href="/contact" className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-4">
                    <Link href="/" className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg">Home</Link>
                    <Link href="/about" className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg">About</Link>
                    <div className="px-4 py-2">
                        <div className="font-medium text-slate-900 mb-2">Events</div>
                        <div className="pl-4 border-l-2 border-slate-100 flex flex-col gap-2">
                            <Link href="/events/code-and-chill" className="text-sm text-slate-600 hover:text-cyan-600">Code & Chill</Link>
                            <Link href="/events/collabify" className="text-sm text-slate-600 hover:text-cyan-600">Collabify</Link>
                            <Link href="/events/conclave" className="text-sm text-slate-600 hover:text-cyan-600">Tech Conclave</Link>
                            <Link href="/events" className="text-sm text-cyan-600 font-medium pt-1">View All</Link>
                        </div>
                    </div>
                    <Link href="/career" className="text-slate-600 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg">Career</Link>
                    <Link href="/contact" className="bg-slate-900 text-white font-medium py-3 px-4 rounded-xl text-center shadow-lg shadow-slate-200">
                        Contact Us
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
