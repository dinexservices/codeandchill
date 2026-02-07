import React from 'react';
import { Mic2, Users, Zap, Sparkles, Video } from 'lucide-react';

const AboutConclave = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="relative rounded-2xl overflow-hiddeN  p-8 flex items-center justify-center ">
                            {/* Conclave Logo */}
                            <img
                                src="/conclave.png"
                                alt="Conclave TechMedia Group"
                                className="w-full h-auto max-w-sm object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span>About Us</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Conclave TechMedia <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Group</span>
                            </h2>
                            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                                <p>
                                    <span className="text-amber-400 font-semibold">Conclave TechMedia Group</span> where your vision meets our creation. We specialize in organizing premium boardrooms and conferences, designed to elevate your business interactions, foster collaboration, and create lasting impressions. With a keen focus on detail, innovation, and seamless execution, we transform any corporate gathering into a remarkable experience.
                                </p>
                                <p>
                                    Our dedicated team of professionals brings a wealth of experience in crafting bespoke event solutions that cater to the unique needs of each client. Whether you're hosting an intimate boardroom discussion or a large-scale conference, we offer a full suite of services, from conceptualization to flawless delivery.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3">Your Vision, Our Creation</h3>
                            <p className="text-slate-300 leading-relaxed">
                                At <span className="text-amber-400 font-semibold">Conclave TechMedia</span>, we understand that every event is a reflection of your brand and goals. That's why we collaborate closely with you to design and organize events that align with your objectives and leave a lasting impact on attendees. Boardroom is a completely tailor-made program to suit your requirements where you can present your solutions, network and discuss business with highly targeted buyers comprising of decision makers and influences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutConclave;
