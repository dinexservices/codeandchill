import React from 'react';
import { Linkedin, Mail, Code2, Instagram } from 'lucide-react';
import Image from 'next/image';


const Footer = () => {
    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/codenchill_hackathon/" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/codenchil/" }
    ];

    return (
        <footer className="bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">

                            <Image src="/logo.png" alt="Logo" width={150} height={150} className="object-cover" />
                        </div>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Empowering students to build innovative AI solutions for real-world challenges. Join the movement today.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ icon: Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-blue-900/20 text-slate-400 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#domains" className="hover:text-blue-400 transition-colors">Domains</a></li>
                            <li><a href="#register" className="hover:text-blue-400 transition-colors">Register</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms-conditions" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="/code-of-conduct" className="hover:text-blue-400 transition-colors">Code of Conduct</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        ©{new Date().getFullYear()} Codenchill. All rights reserved.
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
