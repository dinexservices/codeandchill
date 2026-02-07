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
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Event Registration</h1>
                    <p className="text-slate-500 mt-2">Code & Chill 2.0</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10" />
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-cyan-500 -z-10 transition-all duration-300`} style={{ width: `${((step - 1) / 3) * 100}%` }} />

                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {s}
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">

                    {/* Step 1: Registration Type */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Choose Registration Type</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <button
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.registrationType === 'individual' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 hover:border-cyan-300'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, registrationType: 'individual' }))}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${formData.registrationType === 'individual' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Individual</h3>
                                    <p className="text-sm text-slate-500 mt-1">Register as a solo participant. You can join a team later.</p>
                                </button>

                                <button
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.registrationType === 'team' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-purple-300'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, registrationType: 'team' }))}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${formData.registrationType === 'team' ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Team</h3>
                                    <p className="text-sm text-slate-500 mt-1">Register as a team leader with your squad (2-4 members).</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal / Team Details */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">
                                {formData.registrationType === 'individual' ? 'Personal Details' : 'Team Details'}
                            </h2>

                            {formData.registrationType === 'team' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Team Name</label>
                                        <input type="text" name="teamName" value={formData.teamName} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" placeholder="e.g. Code Warriors" />
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="font-semibold text-slate-900 mt-4 mb-2">Team Leader Details</h3>
                                    </div>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Registration Number</label>
                                    <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">College Name</label>
                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Course / Branch</label>
                                    <input type="text" name="courseBranch" value={formData.courseBranch} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Year of Study</label>
                                    <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none text-slate-600">
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                            </div>

                            {/* Team Members Fields */}
                            {formData.registrationType === 'team' && (
                                <div className="mt-8 space-y-6 border-t border-slate-100 pt-6">
                                    <h3 className="font-semibold text-slate-900">Team Members</h3>
                                    {formData.teamMembers.map((member, index) => (
                                        <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                                            <h4 className="text-sm font-bold text-slate-700 mb-3">Member {index + 1}</h4>
                                            <button onClick={() => removeTeamMember(index)} className="absolute top-4 right-4 text-xs text-red-500 hover:text-red-700">Remove</button>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-cyan-500" />
                                                <input type="email" placeholder="Email" value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-cyan-500" />
                                                <input type="tel" placeholder="Phone" value={member.phone} onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-cyan-500" />
                                            </div>
                                        </div>
                                    ))}
                                    {formData.teamMembers.length < 3 && (
                                        <button onClick={addTeamMember} className="text-sm text-cyan-600 font-medium hover:text-cyan-700 flex items-center gap-1">
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
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Hackathon Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Domain</label>
                                <select name="domain" value={formData.domain} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none text-slate-600">
                                    <option value="">Select Domain</option>
                                    {domains.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">GitHub / Portfolio Link (Optional)</label>
                                <input type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" placeholder="https://github.com/..." />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Prior Hackathon Experience</label>
                                <textarea name="priorExperience" value={formData.priorExperience} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none" placeholder="Briefly describe your past experience..." />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Payment */}
                    {step === 4 && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Payment Details</h2>
                            <p className="text-slate-500">Review your details and complete payment to confirm registration.</p>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-sm mx-auto mt-6">
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                                    <span>Registration Type</span>
                                    <span className="font-semibold capitalize">{formData.registrationType}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                                    <span>Participants</span>
                                    <span className="font-semibold">{formData.registrationType === 'individual' ? 1 : (1 + formData.teamMembers.length)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                                    <span>Fee per person</span>
                                    <span className="font-semibold">₹199</span>
                                </div>
                                <div className="border-t border-slate-200 my-4" />
                                <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                                    <span>Total Payable</span>
                                    <span>₹{calculateTotalFee()}</span>
                                </div>
                            </div>

                            <button className="w-full max-w-sm px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 mt-4">
                                Proceed to Pay ₹{calculateTotalFee()}
                            </button>
                        </div>
                    )}


                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10">
                        {step > 1 && (
                            <button onClick={prevStep} className="flex items-center gap-2 px-6 py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button onClick={nextStep} className="ml-auto flex items-center gap-2 px-8 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20">
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
