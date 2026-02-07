import React from 'react';
import { Network, Handshake, Users } from 'lucide-react';
import { Rocket } from 'lucide-react';

const AboutCollabify = () => {
    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
                    <div className="order-2 lg:order-1 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                                <Rocket className="w-4 h-4" />
                                <span>About Us</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Collabify <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Platform</span>
                            </h2>
                            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                                <p>
                                    <span className="text-purple-400 font-semibold">Collabify Platform</span> where your ideas meet their potential. We specialize in connecting students, professionals, and mentors to foster innovation, collaboration, and growth. With a focus on community building and resource sharing, we transform individual efforts into collective success.
                                </p>
                                <p>
                                    Our platform provides a seamless experience for finding teammates, discovering projects, and accessing mentorship. Whether you're starting a new venture or looking to join one, we offer the tools and network you need to succeed.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3">Your Network, Our Platform</h3>
                            <p className="text-slate-300 leading-relaxed">
                                At <span className="text-purple-400 font-semibold">Collabify</span>, we believe that every connection is an opportunity for growth. That's why we've built a platform that aligns with your professional goals and aspirations. Collabify is a tailor-made ecosystem where you can showcase your skills, network with industry leaders, and collaborate on projects that matter.
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute -inset-4  opacity-20"></div>
                        <div className="relative rounded-2xl overflow-hidden   p-12 flex items-center justify-center  aspect-square lg:aspect-auto ">
                            {/* Collabify Logo Placeholder */}
                            <div className="flex flex-col items-center gap-4">
                                <img
                                    src="/collab3.png"
                                    alt="Collabify"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCollabify;
