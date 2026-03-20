import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mic, User, Github, Linkedin, Twitter } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Speakers",
    description: "Meet the brilliant minds and industry leaders speaking at Conclave Campus events.",
};

const DUMMY_SPEAKERS = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        role: "Head of AI Research, TechFusion",
        bio: "Pioneering new NLP models for low-resource languages.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        socials: { twitter: "#", linkedin: "#" }
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Principal Engineer, CloudScale",
        bio: "Expert in distributed systems and cloud-native architecture.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        socials: { github: "#", linkedin: "#" }
    },
    {
        id: 3,
        name: "Priya Patel",
        role: "Founder, SecurityFirst",
        bio: "Cybersecurity evangelist and open-source contributor.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        socials: { twitter: "#", github: "#", linkedin: "#" }
    },
    {
        id: 4,
        name: "David Kim",
        role: "Lead UX Designer, DesignOps",
        bio: "Transforming complex workflows into intuitive user experiences.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        socials: { twitter: "#", linkedin: "#" }
    }
];

export default function SpeakersPage() {
    return (
        <div className="min-h-screen bg-transparent font-sans text-white selection:bg-blue-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <Navbar />

            <main className="relative z-10 flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
                        <Mic className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400 tracking-tight">
                        Our Featured Speakers
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Meet the brilliant minds and industry leaders shaping the future of technology at Conclave Campus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {DUMMY_SPEAKERS.map((speaker) => (
                        <div key={speaker.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm flex flex-col h-full">
                            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-blue-400/50 transition-colors">
                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover bg-white/5" />
                            </div>
                            
                            <div className="text-center flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{speaker.name}</h3>
                                <p className="text-blue-400 text-sm font-medium mb-4">{speaker.role}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{speaker.bio}</p>
                            </div>

                            <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
                                {speaker.socials.twitter && (
                                    <a href={speaker.socials.twitter} className="text-slate-500 hover:text-blue-400 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {speaker.socials.github && (
                                    <a href={speaker.socials.github} className="text-slate-500 hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {speaker.socials.linkedin && (
                                    <a href={speaker.socials.linkedin} className="text-slate-500 hover:text-blue-500 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
