"use client";

import React from 'react';
import Link from 'next/link';

const Partners = () => {
    // Dummy logos for infinite marquee
    const partnersLogos = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png"
    ];

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 6)); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Our Partners</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-16">
                    Collaborating with industry leaders to bring you the best experience.
                </p>

                <div className="relative w-full overflow-hidden bg-white/5 py-10 rounded-3xl border border-white/10 backdrop-blur-sm before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-[#0a0f1c] before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-[#0a0f1c] after:to-transparent after:content-['']">
                    <div className="flex animate-scroll w-[calc(250px*12)]">
                        {/* Original List */}
                        {partnersLogos.map((logo, index) => (
                            <div key={index} className="flex items-center justify-center w-[250px] px-8">
                                <div className="h-16 w-full relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center bg-white/90 rounded-2xl border border-white/20 p-4 shadow-lg hover:bg-white">
                                    <img src={logo} alt={`Partner ${index}`} className="max-h-12 w-auto object-contain" />
                                </div>
                            </div>
                        ))}
                        {/* Duplicated List for smooth infinite scroll loop */}
                        {partnersLogos.map((logo, index) => (
                            <div key={`dup-${index}`} className="flex items-center justify-center w-[250px] px-8">
                                <div className="h-16 w-full relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center bg-white/90 rounded-2xl border border-white/20 p-4 shadow-lg hover:bg-white">
                                    <img src={logo} alt={`Partner duplicate ${index}`} className="max-h-12 w-auto object-contain" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 p-8 bg-black/50 rounded-3xl border border-blue-900/50 inline-block w-full max-w-3xl">
                    <p className="text-slate-300 mb-6 font-medium">Interested in partnering with us?</p>
                    <Link href="/partners" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl border border-blue-500 hover:bg-blue-500 hover:border-blue-400 transition-colors shadow-sm">
                        Become a Sponsor
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Partners;
