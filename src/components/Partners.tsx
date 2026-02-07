import React from 'react';
import { Building2, Globe, Rocket, ShieldCheck, Cpu, Code } from 'lucide-react';

const Partners = () => {
    const partners = [
        { name: "TechCorp", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "DevStudio", icon: Code, color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Global Systems", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50" },
        { name: "SecureNet", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Future AI", icon: Cpu, color: "text-amber-600", bg: "bg-amber-50" },
        { name: "StartupHub", icon: Rocket, color: "text-pink-600", bg: "bg-pink-50" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Partners</h2>
                <p className="text-slate-600 max-w-2xl mx-auto mb-16">
                    Collaborating with industry leaders to bring you the best experience.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {partners.map((partner, index) => (
                        <div key={index} className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className={`w-16 h-16 ${partner.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <partner.icon className={`w-8 h-8 ${partner.color}`} />
                            </div>
                            <span className="font-semibold text-slate-700">{partner.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-slate-600 mb-6 font-medium">Interested in partnering with us?</p>
                    <button className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                        Become a Sponsor
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Partners;
