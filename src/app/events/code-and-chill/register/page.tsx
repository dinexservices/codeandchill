"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Users, ChevronRight, ChevronLeft, CreditCard, Upload, CheckCircle } from 'lucide-react';

export default function RegistrationPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        registrationType: 'individual', // 'individual' or 'team'

        // Basic Details
        fullName: '',
        registrationNumber: '',
        email: '',
        phoneNumber: '',
        collegeName: '',
        courseBranch: '',
        yearOfStudy: '',

        // Team Details
        teamName: '',
        teamLeaderName: '',
        teamMembers: [
            { name: '', email: '', phone: '' },
            // Add more based on team size if needed, starting with 1 extra member for now
        ],

        // Hackathon Details
        domain: '',
        portfolioLink: '',
        githubLink: '',
        priorExperience: '',

        // Payment
        paymentStatus: 'pending'
    });

    const domains = [
        "FinTech", "HealthTech", "EdTech", "AgriTech", "Sustainability", "Open Innovation"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTeamMemberChange = (index: number, field: string, value: string) => {
        const updatedMembers = [...formData.teamMembers];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
    };

    const addTeamMember = () => {
        if (formData.teamMembers.length < 3) {
            setFormData(prev => ({
                ...prev,
                teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '' }]
            }));
        }
    };

    const removeTeamMember = (index: number) => {
        const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const calculateTotalFee = () => {
        const baseFee = 199;
        const participants = formData.registrationType === 'individual' ? 1 : (1 + formData.teamMembers.length);
        return baseFee * participants;
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-900 selection:text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <Navbar />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Event Registration</h1>
                    <p className="text-slate-400">Code & Chill 2.0</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full -z-10" />
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full -z-10 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }} />

                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 border-black ${step >= s ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/10 text-slate-500'}`}>
                            {s}
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>


                    {/* Step 1: Registration Type */}
                    {step === 1 && (
                        <div className="space-y-6 relative">
                            <h2 className="text-2xl font-bold text-white mb-6">Choose Registration Type</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <button
                                    className={`p-6 rounded-2xl border transition-all duration-300 text-left group overflow-hidden relative ${formData.registrationType === 'individual' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10 hover:border-cyan-500/50 hover:bg-white/5'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, registrationType: 'individual' }))}
                                >
                                    <div className={`absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 ${formData.registrationType === 'individual' ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${formData.registrationType === 'individual' ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-white/10 text-slate-400 group-hover:text-cyan-400'}`}>
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg relative z-10">Individual</h3>
                                    <p className="text-sm text-slate-400 mt-2 relative z-10 leading-relaxed">Register as a solo participant. You can join a team later.</p>
                                </button>

                                <button
                                    className={`p-6 rounded-2xl border transition-all duration-300 text-left group overflow-hidden relative ${formData.registrationType === 'team' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, registrationType: 'team' }))}
                                >
                                    <div className={`absolute inset-0 bg-linear-to-r from-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 ${formData.registrationType === 'team' ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${formData.registrationType === 'team' ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/10 text-slate-400 group-hover:text-purple-400'}`}>
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg relative z-10">Team</h3>
                                    <p className="text-sm text-slate-400 mt-2 relative z-10 leading-relaxed">Register as a team leader with your squad (2-4 members).</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal / Team Details */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {formData.registrationType === 'individual' ? 'Personal Details' : 'Team Details'}
                            </h2>

                            {formData.registrationType === 'team' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Team Name</label>
                                        <input type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" placeholder="e.g. Code Warriors" />
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="font-semibold text-white mt-4 mb-2 flex items-center gap-2"><User className="w-4 h-4 text-cyan-400" /> Team Leader Details</h3>
                                        <div className="h-px w-full bg-white/10 mb-4"></div>
                                    </div>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Registration Number</label>
                                    <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-400 mb-2">College Name</label>
                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Course / Branch</label>
                                    <input type="text" name="courseBranch" value={formData.courseBranch} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Year of Study</label>
                                    <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white appearance-none">
                                        <option value="" className="bg-black text-slate-400">Select Year</option>
                                        <option value="1" className="bg-black">1st Year</option>
                                        <option value="2" className="bg-black">2nd Year</option>
                                        <option value="3" className="bg-black">3rd Year</option>
                                        <option value="4" className="bg-black">4th Year</option>
                                    </select>
                                </div>
                            </div>

                            {/* Team Members Fields */}
                            {formData.registrationType === 'team' && (
                                <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
                                    <h3 className="font-semibold text-white flex items-center gap-2"><Users className="w-4 h-4 text-purple-400" /> Team Members</h3>
                                    {formData.teamMembers.map((member, index) => (
                                        <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative hover:border-white/10 transition-colors">
                                            <h4 className="text-sm font-bold text-slate-300 mb-4">Member {index + 1}</h4>
                                            <button onClick={() => removeTeamMember(index)} className="absolute top-4 right-4 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">Remove</button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600" />
                                                <input type="email" placeholder="Email" value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600" />
                                                <input type="tel" placeholder="Phone" value={member.phone} onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)} className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600" />
                                            </div>
                                        </div>
                                    ))}
                                    {formData.teamMembers.length < 3 && (
                                        <button onClick={addTeamMember} className="w-full py-3 rounded-xl border border-dashed border-white/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2">
                                            + Add Another Member
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Hackathon Details */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Hackathon Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Domain</label>
                                <select name="domain" value={formData.domain} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white appearance-none">
                                    <option value="" className="bg-black text-slate-400">Select Domain</option>
                                    {domains.map((d) => (
                                        <option key={d} value={d} className="bg-black">{d}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">GitHub / Portfolio Link (Optional)</label>
                                <input type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" placeholder="https://github.com/..." />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Prior Hackathon Experience</label>
                                <textarea name="priorExperience" value={formData.priorExperience} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-white placeholder-slate-500" placeholder="Briefly describe your past experience..." />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Payment */}
                    {step === 4 && (
                        <div className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <CreditCard className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Payment Details</h2>
                            <p className="text-slate-400 max-w-sm mx-auto">Review your details and complete payment to confirm registration.</p>

                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-sm mx-auto mt-8">
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
                                    <span>Registration Type</span>
                                    <span className="font-semibold text-white capitalize">{formData.registrationType}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
                                    <span>Participants</span>
                                    <span className="font-semibold text-white">{formData.registrationType === 'individual' ? 1 : (1 + formData.teamMembers.length)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
                                    <span>Fee per person</span>
                                    <span className="font-semibold text-white">₹199</span>
                                </div>
                                <div className="border-t border-white/10 my-4" />
                                <div className="flex justify-between items-center text-xl font-bold text-white">
                                    <span>Total Payable</span>
                                    <span className="text-emerald-400">₹{calculateTotalFee()}</span>
                                </div>
                            </div>

                            <button className="w-full max-w-sm px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 mt-6 text-lg">
                                Proceed to Pay ₹{calculateTotalFee()}
                            </button>
                        </div>
                    )}


                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
                        {step > 1 && (
                            <button onClick={prevStep} className="flex items-center gap-2 px-6 py-2 text-slate-400 font-medium hover:text-white transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button onClick={nextStep} className="ml-auto flex items-center gap-2 px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20">
                                Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : null}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
