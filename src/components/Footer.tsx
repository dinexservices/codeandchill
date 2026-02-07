import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';
import Image from 'next/image';


const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                         
                        <Image src="/logo.png" alt="Logo" width={150} height={150}  className="object-cover" />
                        </div>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Empowering students to build innovative AI solutions for real-world challenges. Join the movement today.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                            <li><a href="#domains" className="hover:text-cyan-400 transition-colors">Domains</a></li>
                            <li><a href="#register" className="hover:text-cyan-400 transition-colors">Register</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Code of Conduct</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2024 Code & Chill. All rights reserved.
                    </p>
                    <div className="text-slate-500 text-sm flex items-center gap-1">
                        Developed by <span className="font-semibold text-slate-300">Dinex Services</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
