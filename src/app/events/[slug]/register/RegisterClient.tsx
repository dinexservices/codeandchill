// Migrating existing page content to RegisterClient
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchEventBySlug, registerForEvent, createPayment, verifyPayment, clearPayment, clearRegistration } from '@/store/slices/eventSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, User, ArrowRight, CheckCircle, AlertCircle, Loader2, CreditCard, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
// Metadata import removed as this is now a client component
// import { store } from '@/store/store'; // Removed store import as it is not used directly in component logic here

interface Participant {
    name: string;
    registrationNumber: string;
    email: string;
    phoneNum: string;
    collegeName: string;
    course: string;
    yearOfStudy: string;
}

const initialParticipantState: Participant = {
    name: '',
    registrationNumber: '',
    email: '',
    phoneNum: '',
    collegeName: '',
    course: '',
    yearOfStudy: ''
};

const steps = [
    { id: 1, name: 'Type' },
    { id: 2, name: 'Details' },
    { id: 3, name: 'Payment' },
];

export default function RegisterClient() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();
    const { event, loading, error, registrationStatus, paymentStatus, registrationData, paymentData } = useAppSelector((state) => state.event);

    const [participationType, setParticipationType] = useState<'individual' | 'team'>('individual');
    const [teamName, setTeamName] = useState('');
    const [teamLeaderName, setTeamLeaderName] = useState('');
    const [participants, setParticipants] = useState<Participant[]>([initialParticipantState]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (slug) {
            dispatch(fetchEventBySlug(slug));
        }
        return () => {
            dispatch(clearRegistration());
            dispatch(clearPayment());
        };
    }, [dispatch, slug]);

    useEffect(() => {
        if (participationType === 'individual') {
            setParticipants([initialParticipantState]);
        } else {
            if (participants.length === 0) setParticipants([initialParticipantState]);
        }
    }, [participationType]);

    // Handle Registration Success -> Move to next step (Payment creation happens in background or on button click?)
    // Actually, traditionally: 
    // Step 3 is "Review & Pay". Clicking "Pay" -> Registers -> Creates Payment -> Opens Razorpay.
    // Registration step removed, payment handles everything
    useEffect(() => {
        if (registrationStatus === 'error') {
            toast.error(error || "Registration failed. Please try again.");
            setIsSubmitting(false);
        }
    }, [registrationStatus, error]);

    useEffect(() => {
        if (paymentStatus === 'success' && paymentData && paymentData.orderId) {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: paymentData.amount * 100,
                currency: "INR",
                name: "Codenchill",
                description: `Registration for ${event?.title}`,
                order_id: paymentData.orderId,
                handler: async function (response: any) {
                    setIsSubmitting(true);
                    await dispatch(verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    }));
                },
                prefill: {
                    name: participants[0].name,
                    email: participants[0].email,
                    contact: participants[0].phoneNum
                },
                theme: {
                    color: "#06b6d4"
                }
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                toast.error(response.error.description || "Payment Failed");
                setIsSubmitting(false);
            });
            rzp1.open();
        } else if (paymentStatus === 'error') {
            toast.error(error || "Payment initialization failed.");
            setIsSubmitting(false);
        }
    }, [paymentStatus, paymentData, dispatch, event, participants, error]);

    useEffect(() => {
        if (paymentStatus === 'success' && paymentData) {
            const message = paymentData.message || "Payment verified & registration confirmed";
            const transactionId = paymentData.paymentId || paymentData.transactionId || "";
            router.push(`/payment/status?status=success&message=${encodeURIComponent(message)}&transactionId=${transactionId}&eventSlug=${slug}`);
        } else if (paymentStatus === 'error') {
            router.push(`/payment/status?status=failure&message=${encodeURIComponent(error || "Payment verification failed")}&eventSlug=${slug}`);
        }
    }, [paymentStatus, paymentData, error, router, slug]);


    const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
        const newParticipants = [...participants];
        newParticipants[index] = { ...newParticipants[index], [field]: value };
        setParticipants(newParticipants);
    };

    const addParticipant = () => {
        if (participants.length < 4) {
            setParticipants([...participants, initialParticipantState]);
        } else {
            toast.warning("Maximum 4 members allowed for team participation.");
        }
    };

    const removeParticipant = (index: number) => {
        if (participants.length > 1) {
            const newParticipants = [...participants];
            newParticipants.splice(index, 1);
            setParticipants(newParticipants);
        }
    };

    const validateStep = (step: number) => {
        if (step === 1) return true; // Always valid to pick type
        if (step === 2) {
            if (participationType === 'team') {
                if (!teamName.trim()) { toast.error("Team Name is required."); return false; }
                if (!teamLeaderName.trim()) { toast.error("Team Leader Name is required."); return false; }
            }
            for (let i = 0; i < participants.length; i++) {
                const p = participants[i];
                if (!p.name || !p.registrationNumber || !p.email || !p.phoneNum || !p.collegeName || !p.course || !p.yearOfStudy) {
                    toast.error(`Please fill all details for Participant ${i + 1}`);
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
                    toast.error(`Invalid email for Participant ${i + 1}`);
                    return false;
                }
            }
            return true;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!event) return;
        setIsSubmitting(true);

        const paymentPayload = {
            tktCount: participants.length,
            participants: participants,
            teamName: participationType === 'team' ? teamName : undefined,
            teamLeaderName: participationType === 'team' ? teamLeaderName : undefined,
            eventId: event.id || event._id || ''
        };

        dispatch(createPayment(paymentPayload));
    };

    if (loading || !event) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    const pricePerPerson = Number(event.price === 'Free' ? 0 : event.price);
    const totalAmount = pricePerPerson * participants.length;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <div className="pt-28 pb-10 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">

                {/* Header & Stepper */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Event Registration</h1>
                    <p className="text-slate-400 mb-8">{event.title}</p>

                    <div className="flex items-center justify-center max-w-xl mx-auto">
                        {steps.map((s, i) => (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center relative">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 z-10
                                        ${currentStep >= s.id
                                                ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                : 'bg-black/50 border-white/20 text-slate-500'}`}
                                    >
                                        {s.id}
                                    </div>
                                    <span className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${currentStep >= s.id ? 'text-cyan-400' : 'text-slate-600'}`}>
                                        {s.name}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-0.5 w-16 md:w-24 transition-colors duration-300 -mt-4 ${currentStep > s.id ? 'bg-cyan-500/50' : 'bg-white/10'}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grow flex flex-col"
                >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl grow flex flex-col">

                        {/* Step 1: Type Selection */}
                        {currentStep === 1 && (
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-8">Choose Registration Type</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <button
                                            type="button"
                                            onClick={() => setParticipationType('individual')}
                                            className={`p-8 rounded-2xl border transition-all text-left group relative overflow-hidden ${participationType === 'individual'
                                                ? 'border-cyan-500 bg-cyan-900/10'
                                                : 'border-white/10 bg-black/20 hover:border-white/30'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${participationType === 'individual' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                                                <User className="w-6 h-6" />
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 transition-colors ${participationType === 'individual' ? 'text-white' : 'text-slate-300'}`}>Individual</h3>
                                            <p className="text-slate-400 text-sm">Register as a solo participant. You can join a team later.</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setParticipationType('team')}
                                            className={`p-8 rounded-2xl border transition-all text-left group relative overflow-hidden ${participationType === 'team'
                                                ? 'border-cyan-500 bg-cyan-900/10'
                                                : 'border-white/10 bg-black/20 hover:border-white/30'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${participationType === 'team' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 transition-colors ${participationType === 'team' ? 'text-white' : 'text-slate-300'}`}>Team</h3>
                                            <p className="text-slate-400 text-sm">Register as a team leader with your squad (2-4 members).</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={nextStep} className="px-8 py-3 bg-cyan-600 rounded-xl font-bold hover:bg-cyan-500 transition-colors flex items-center gap-2">
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details Form */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {participationType === 'individual' ? 'Participant Details' : 'Team Details'}
                                </h2>

                                {/* Team Info */}
                                {participationType === 'team' && (
                                    <div className="grid md:grid-cols-2 gap-6 p-6 bg-black/20 rounded-xl border border-white/5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Team Name *</label>
                                            <input
                                                type="text"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
                                                placeholder="e.g. Code Ninjas"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Team Leader Name *</label>
                                            <input
                                                type="text"
                                                value={teamLeaderName}
                                                onChange={(e) => setTeamLeaderName(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
                                                placeholder="Enter leader's name"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Participants List */}
                                <div className="space-y-6">
                                    {participants.map((participant, index) => (
                                        <div key={index} className="bg-black/20 rounded-xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-cyan-900/50 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/30">
                                                        {index + 1}
                                                    </span>
                                                    {participationType === 'individual' ? 'Your Details' : `Member ${index + 1}`}
                                                </h3>
                                                {participationType === 'team' && participants.length > 1 && (
                                                    <button onClick={() => removeParticipant(index)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name *"
                                                    value={participant.name}
                                                    onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Registration Number *"
                                                    value={participant.registrationNumber}
                                                    onChange={(e) => handleParticipantChange(index, 'registrationNumber', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email Address *"
                                                    value={participant.email}
                                                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number *"
                                                    value={participant.phoneNum}
                                                    onChange={(e) => handleParticipantChange(index, 'phoneNum', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="College Name *"
                                                    value={participant.collegeName}
                                                    onChange={(e) => handleParticipantChange(index, 'collegeName', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Course/Branch *"
                                                        value={participant.course}
                                                        onChange={(e) => handleParticipantChange(index, 'course', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                                                    />
                                                    <select
                                                        value={participant.yearOfStudy}
                                                        onChange={(e) => handleParticipantChange(index, 'yearOfStudy', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-slate-300"
                                                    >
                                                        <option value="" disabled>Year *</option>
                                                        <option value="1st Year">1st Year</option>
                                                        <option value="2nd Year">2nd Year</option>
                                                        <option value="3rd Year">3rd Year</option>
                                                        <option value="4th Year">4th Year</option>
                                                        <option value="5th Year">5th Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {participationType === 'team' && participants.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={addParticipant}
                                        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all font-medium flex items-center justify-center gap-2"
                                    >
                                        <span>+</span> Add Team Member
                                    </button>
                                )}

                                <div className="flex justify-between pt-4">
                                    <button onClick={prevStep} className="px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors flex items-center gap-2 text-slate-300">
                                        <ChevronLeft className="w-5 h-5" /> Back
                                    </button>
                                    <button onClick={nextStep} className="px-8 py-3 bg-cyan-600 rounded-xl font-bold hover:bg-cyan-500 transition-colors flex items-center gap-2">
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment/Summary */}
                        {currentStep === 3 && (
                            <div className="flex flex-col h-full justify-center max-w-lg mx-auto w-full">
                                <h2 className="text-2xl font-bold text-white mb-8 text-center">Registration Summary</h2>

                                <div className="bg-black/30 rounded-2xl p-8 border border-white/10 mb-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <CreditCard className="w-24 h-24 text-white" />
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Event</span>
                                            <span className="text-white font-medium text-right">{event.title}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Type</span>
                                            <span className="text-white font-medium capitalize">{participationType}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Participants</span>
                                            <span className="text-white font-medium">{participants.length}</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-2"></div>
                                        <div className="flex justify-between items-center text-xl font-bold">
                                            <span className="text-white">Total Amount</span>
                                            <span className="text-cyan-400">
                                                {event.price === 'Free' || totalAmount === 0 ? 'Free' : `₹${totalAmount}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            <>
                                                {event.price === 'Free' || totalAmount === 0 ? 'Confirm Registration' : 'Pay Now'}
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    <button onClick={prevStep} disabled={isSubmitting} className="w-full py-3 text-slate-400 hover:text-white transition-colors">
                                        Back to Details
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>



            <Footer />
        </div>
    );
}
