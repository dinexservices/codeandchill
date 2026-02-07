import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative rounded-xl flex items-center justify-center">
                                <Image src="/conclave.png" alt="Logo" width={40} height={40} />
                            </div>
                            <span className="text-xl font-bold text-slate-900">Conclave TechMedia</span>
                        </div>
                        <p className="text-slate-500 mb-6 max-w-sm">
                            Empowering students to build innovative AI solutions for real-world challenges. Join the movement today.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-500">
                            <li><a href="#" className="hover:text-cyan-600 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-cyan-600 transition-colors">About</a></li>
                            <li><a href="#domains" className="hover:text-cyan-600 transition-colors">Domains</a></li>
                            <li><a href="#register" className="hover:text-cyan-600 transition-colors">Register</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-500">
                            <li><a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-cyan-600 transition-colors">Code of Conduct</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2024 Code & Chill. All rights reserved.
                    </p>
                    <div className="text-slate-400 text-sm flex items-center gap-1">
                        Developed by <span className="font-semibold text-slate-900">Dinex Services</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
