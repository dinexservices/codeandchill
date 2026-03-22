// RegisterClient — 3-step registration flow with Ticket selection + dynamic fields
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchEventBySlug, fetchTicketsByEvent,
    createPayment, clearPayment, clearRegistration, clearTickets
} from '@/store/slices/eventSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Users, ArrowRight, Loader2, ChevronLeft,
    Ticket as TicketIcon, CheckCircle, Tag, Users2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// ── Field metadata ─────────────────────────────────────────────────────────
const FIELD_META: Record<string, { label: string; placeholder: string; type: string }> = {
    name:               { label: "Full Name",            placeholder: "Enter full name",             type: "text" },
    email:              { label: "Email Address",        placeholder: "Enter email",                 type: "email" },
    phone:              { label: "Phone Number",         placeholder: "Enter phone number",          type: "tel" },
    college:            { label: "College Name",         placeholder: "Enter college name",          type: "text" },
    registrationNumber: { label: "Registration Number",  placeholder: "e.g. 21BCE1234",              type: "text" },
    year:               { label: "Year of Study",        placeholder: "", /* dropdown */             type: "select" },
    department:         { label: "Department / Branch",  placeholder: "e.g. Computer Science",      type: "text" },
};

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

type Participant = Record<string, string>;

const emptyParticipant = (fields: string[]): Participant =>
    Object.fromEntries(fields.map(f => [f, ""]));

const steps = [
    { id: 1, name: 'Ticket' },
    { id: 2, name: 'Details' },
    { id: 3, name: 'Payment' },
];

// ── DynamicParticipantField ────────────────────────────────────────────────
function DynamicField({
    fieldKey, value, onChange, required = true
}: { fieldKey: string; value: string; onChange: (v: string) => void; required?: boolean }) {
    const meta = FIELD_META[fieldKey] || { label: fieldKey, placeholder: "", type: "text" };
    const baseClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-white placeholder:text-slate-600";

    if (meta.type === "select" && fieldKey === "year") {
        return (
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">{meta.label} {required && "*"}</label>
                <select value={value} onChange={e => onChange(e.target.value)} className={`${baseClass} bg-black/40`}>
                    <option value="" disabled>Select year</option>
                    {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        );
    }
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">{meta.label} {required && "*"}</label>
            <input
                type={meta.type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={meta.placeholder}
                className={baseClass}
            />
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function RegisterClient() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();
    const {
        event, loading, error,
        tickets, ticketsLoading,
        registrationStatus, paymentStatus, paymentData
    } = useAppSelector((state) => state.event);

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
    const [teamName, setTeamName] = useState('');
    const [teamLeaderName, setTeamLeaderName] = useState('');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Parse registration fields from ticket (supports both object and string formats) ──────
    const parseRegistrationFields = (fields: any[]): { field: string; required: boolean }[] => {
        if (!Array.isArray(fields) || fields.length === 0) {
            return [
                { field: "name", required: true },
                { field: "email", required: true },
                { field: "phone", required: true }
            ];
        }
        const result: { field: string; required: boolean }[] = [];
        for (const f of fields) {
            if (typeof f === 'object' && f !== null && 'field' in f && typeof f.field === 'string') {
                result.push({ field: f.field, required: f.required !== false });
            } else if (typeof f === 'string') {
                result.push({ field: f, required: true });
            }
        }
        return result;
    };

    // ── Active registration fields (from selected ticket or fallback) ──────
    const activeFieldsList = parseRegistrationFields(selectedTicket?.registrationFields);
    const activeFields: string[] = activeFieldsList.map(f => f.field);

    // ── Group size constraints ─────────────────────────────────────────────
    const isGroupTicket = selectedTicket?.type === 'group';
    const isTeam = isGroupTicket;
    const groupMin: number = isGroupTicket ? (selectedTicket.groupMin ?? 1) : 1;
    const groupMax: number = isGroupTicket ? (selectedTicket.groupMax ?? 4) : 1;

    // ── Fetch event + tickets ──────────────────────────────────────────────
    useEffect(() => {
        if (slug) dispatch(fetchEventBySlug(slug));
        return () => {
            dispatch(clearRegistration());
            dispatch(clearPayment());
            dispatch(clearTickets());
        };
    }, [dispatch, slug]);

    useEffect(() => {
        if (event) {
            const eventId = (event as any).id || (event as any)._id;
            if (eventId) dispatch(fetchTicketsByEvent(eventId));
        }
    }, [dispatch, event]);

    // ── Initialize participants when ticket or fields change ──────────────
    useEffect(() => {
        if (!selectedTicket) return;
        const count = isGroupTicket ? groupMin : 1;
        setParticipants(Array.from({ length: count }, () => emptyParticipant(activeFields)));
    }, [selectedTicket, groupMin, isGroupTicket]);

    // ── Error toast ────────────────────────────────────────────────────────
    useEffect(() => {
        if (registrationStatus === 'error') {
            toast.error(error || 'Registration failed. Please try again.');
            setIsSubmitting(false);
        }
    }, [registrationStatus, error]);

    // ── Open Razorpay ──────────────────────────────────────────────────────
    useEffect(() => {
        if (paymentStatus === 'success' && paymentData?.orderId) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: paymentData.amount * 100,
                currency: 'INR',
                name: 'Codenchill',
                description: `Registration for ${event?.title}`,
                order_id: paymentData.orderId,
                callback_url: `${apiUrl}/api/v1/events/payment-callback`,
                redirect: true,
                prefill: {
                    name: participants[0]?.name || '',
                    email: participants[0]?.email || '',
                    contact: participants[0]?.phone || ''
                },
                theme: { color: '#06b6d4' },
                modal: { ondismiss: () => setIsSubmitting(false) }
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } else if (paymentStatus === 'error') {
            toast.error(error || 'Payment initialization failed.');
            setIsSubmitting(false);
        }
    }, [paymentStatus, paymentData, event, participants, error]);

    // ── Participant handlers ───────────────────────────────────────────────
    const handleParticipantChange = (idx: number, field: string, value: string) => {
        setParticipants(prev => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [field]: value };
            return updated;
        });
    };

    const addParticipant = () => {
        if (participants.length < groupMax) {
            setParticipants(prev => [...prev, emptyParticipant(activeFields)]);
        } else {
            toast.warning(`Maximum ${groupMax} members allowed for this ticket.`);
        }
    };

    const removeParticipant = (idx: number) => {
        if (participants.length > (isGroupTicket ? groupMin : 1)) {
            setParticipants(prev => prev.filter((_, i) => i !== idx));
        }
    };

    // ── Validation ─────────────────────────────────────────────────────────
    const validateStep = (step: number): boolean => {
        if (step === 1) {
            if (!selectedTicket) { toast.error('Please select a ticket'); return false; }
            return true;
        }
        if (step === 2) {
            if (isTeam && selectedTicket?.requiresTeamDetails) {
                if (!teamName.trim()) { toast.error('Team Name is required.'); return false; }
                if (!teamLeaderName.trim()) { toast.error('Team Leader Name is required.'); return false; }
            }
            if (isGroupTicket && (participants.length < groupMin || participants.length > groupMax)) {
                toast.error(`Team must have ${groupMin}–${groupMax} members for this ticket.`);
                return false;
            }
            for (let i = 0; i < participants.length; i++) {
                const p = participants[i];
                // Only validate required fields
                const requiredFields = activeFieldsList.filter(f => f.required);
                for (const fieldInfo of requiredFields) {
                    if (!p[fieldInfo.field]?.trim()) {
                        toast.error(`Participant ${i + 1}: "${FIELD_META[fieldInfo.field]?.label || fieldInfo.field}" is required.`);
                        return false;
                    }
                }
                // Email format validation (only if email is provided)
                if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
                    toast.error(`Participant ${i + 1}: Invalid email address.`);
                    return false;
                }
            }
            return true;
        }
        return true;
    };

    const nextStep = () => { if (validateStep(currentStep)) setCurrentStep(p => Math.min(p + 1, 3)); };
    const prevStep = () => setCurrentStep(p => Math.max(p - 1, 1));

    const handleSubmit = async () => {
        if (!event) return;
        setIsSubmitting(true);
        dispatch(createPayment({
            tktCount: participants.length,
            participants,
            teamName: isTeam && selectedTicket?.requiresTeamDetails ? teamName : undefined,
            teamLeaderName: isTeam && selectedTicket?.requiresTeamDetails ? teamLeaderName : undefined,
            eventId: (event as any).id || (event as any)._id || '',
            ticketId: selectedTicket?._id || selectedTicket?.id || undefined
        }));
    };

    // ── Loading ────────────────────────────────────────────────────────────
    if (loading || !event) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500" />
            </div>
        );
    }

    const pricePerPerson = selectedTicket ? Number(selectedTicket.price) : Number(event.price === 'Free' ? 0 : event.price);
    const totalAmount = pricePerPerson * participants.length;
    const isFree = pricePerPerson === 0;
    const hasTickets = tickets && tickets.length > 0;

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="pt-28 pb-10 grow flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Stepper */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Event Registration</h1>
                    <p className="text-slate-400 mb-8">{event.title}</p>
                    <div className="flex items-center justify-center max-w-xl mx-auto">
                        {steps.map((s, i) => (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 z-10
                                        ${currentStep >= s.id ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-black/50 border-white/20 text-slate-500'}`}>
                                        {currentStep > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                                    </div>
                                    <span className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${currentStep >= s.id ? 'text-cyan-400' : 'text-slate-600'}`}>
                                        {s.name}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-0.5 w-12 md:w-20 transition-colors duration-300 -mt-4 ${currentStep > s.id ? 'bg-cyan-500/50' : 'bg-white/10'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="grow flex flex-col">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl grow flex flex-col">

                        {/* ── STEP 1: Ticket ─────────────────────────────────────────── */}
                        {currentStep === 1 && (
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Choose Your Ticket</h2>
                                    <p className="text-slate-400 text-sm mb-4">Select the ticket that suits you.</p>
                                    <p className="text-slate-500 text-xs mb-6"><span className="text-cyan-400">*</span> Required field</p>

                                    {ticketsLoading ? (
                                        <div className="flex items-center justify-center py-16">
                                            <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                                        </div>
                                    ) : !hasTickets ? (
                                        /* Fallback: No tickets configured */
                                        <button type="button" onClick={() => setSelectedTicket({ 
                                            _id: null, 
                                            name: 'Standard', 
                                            type: 'individual', 
                                            price: pricePerPerson, 
                                            groupMin: 1, 
                                            groupMax: 1, 
                                            registrationFields: [
                                                { field: "name", required: true },
                                                { field: "email", required: true },
                                                { field: "phone", required: true },
                                                { field: "college", required: true },
                                                { field: "registrationNumber", required: false },
                                                { field: "year", required: true },
                                                { field: "department", required: false }
                                            ] 
                                        })}
                                            className={`w-full p-6 rounded-2xl border transition-all text-left ${selectedTicket ? 'border-cyan-500 bg-cyan-900/10' : 'border-white/10 bg-black/20 hover:border-white/30'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selectedTicket ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                                                        <TicketIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-lg">Standard Entry</p>
                                                        <p className="text-slate-400 text-sm">Individual registration</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-cyan-400">{isFree ? 'Free' : `₹${pricePerPerson}`}</p>
                                                    {!isFree && <p className="text-slate-400 text-xs">per person</p>}
                                                </div>
                                            </div>
                                            {selectedTicket && <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm"><CheckCircle className="w-4 h-4" /> Selected</div>}
                                        </button>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {tickets.map((tkt: any) => {
                                                const isSelected = selectedTicket?._id === tkt._id || selectedTicket?.id === tkt.id;
                                                const available = tkt.availableSlots;
                                                const isSoldOut = available !== null && available <= 0;
                                                const min = tkt.groupMin ?? 1;
                                                const max = tkt.groupMax ?? 4;
                                                return (
                                                    <button type="button" key={tkt._id || tkt.id} disabled={isSoldOut}
                                                        onClick={() => !isSoldOut && setSelectedTicket(tkt)}
                                                        className={`p-6 rounded-2xl border transition-all text-left relative overflow-hidden
                                                            ${isSelected ? 'border-cyan-500 bg-cyan-900/10' : isSoldOut ? 'border-white/5 bg-black/10 opacity-50 cursor-not-allowed' : 'border-white/10 bg-black/20 hover:border-white/30'}`}>

                                                        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full border ${tkt.type === 'group' ? 'bg-purple-900/30 border-purple-500/40 text-purple-300' : 'bg-cyan-900/30 border-cyan-500/40 text-cyan-300'}`}>
                                                            {tkt.type === 'group' ? `Group ${min}–${max}` : 'Individual'}
                                                        </span>
                                                        {isSoldOut && <span className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full bg-red-900/30 border border-red-500/40 text-red-300">Sold Out</span>}

                                                        <div className="flex items-start gap-3 mb-3 mt-1">
                                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                                                                {tkt.type === 'group' ? <Users2 className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
                                                            </div>
                                                            <div className="pt-0.5">
                                                                <p className="font-bold text-white text-lg leading-tight">{tkt.name}</p>
                                                                {tkt.description && <p className="text-slate-400 text-sm mt-1">{tkt.description}</p>}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-end justify-between mt-4">
                                                            <div>
                                                                <p className="text-3xl font-bold text-cyan-400">{tkt.price === 0 ? 'Free' : `₹${tkt.price}`}</p>
                                                                {tkt.price > 0 && <p className="text-slate-400 text-xs mt-0.5">per person</p>}
                                                                {tkt.type === 'group' && tkt.price > 0 && (
                                                                    <p className="text-purple-300 text-xs mt-1 font-medium">
                                                                        ₹{tkt.price * min}–₹{tkt.price * max} for {min}–{max} people
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {available !== null && !isSoldOut && (
                                                                <p className={`text-xs font-medium ${available <= 10 ? 'text-red-400' : 'text-slate-500'}`}>{available} left</p>
                                                            )}
                                                        </div>

                                                        {/* Fields this ticket collects */}
                                                        {(() => {
                                                            const fields = parseRegistrationFields(tkt.registrationFields);
                                                            return fields.length > 0 && (
                                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                                    {fields.map((f, idx) => (
                                                                        <span key={`${f.field}-${idx}`} className={`text-xs px-1.5 py-0.5 rounded-md border ${
                                                                            f.required 
                                                                                ? "bg-cyan-900/20 border-cyan-500/30 text-cyan-300"
                                                                                : "bg-white/5 border-white/10 text-slate-500"
                                                                        }`}>
                                                                            {FIELD_META[f.field]?.label || f.field}
                                                                            {f.required ? " *" : ""}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            );
                                                        })()}

                                                        {isSelected && <div className="mt-3 flex items-center gap-1.5 text-cyan-400 text-sm font-medium"><CheckCircle className="w-4 h-4" /> Selected</div>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button onClick={nextStep} className="px-8 py-3 bg-cyan-600 rounded-xl font-bold hover:bg-cyan-500 transition-colors flex items-center gap-2">
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Details ─────────────────────────────────────────── */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {isTeam ? 'Team Details' : 'Participant Details'}
                                </h2>

                                {/* Team name + leader */}
                                {isTeam && selectedTicket?.requiresTeamDetails && (
                                    <div className="grid md:grid-cols-2 gap-4 p-5 bg-black/20 rounded-xl border border-white/5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-400">Team Name *</label>
                                            <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. Code Ninjas"
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-400">Team Leader Name *</label>
                                            <input type="text" value={teamLeaderName} onChange={e => setTeamLeaderName(e.target.value)} placeholder="Enter leader's name"
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600" />
                                        </div>
                                    </div>
                                )}

                                {/* Group size counter */}
                                {isGroupTicket && (
                                    <div className="flex items-center justify-between px-5 py-3 bg-purple-900/10 border border-purple-500/30 rounded-xl">
                                        <div>
                                            <p className="text-white font-medium text-sm">Team Size</p>
                                            <p className="text-slate-400 text-xs">Allowed: {groupMin}–{groupMax} members</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button type="button" onClick={() => removeParticipant(participants.length - 1)}
                                                disabled={participants.length <= groupMin}
                                                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 disabled:opacity-30 transition">−</button>
                                            <span className="w-8 text-center font-bold text-white text-lg">{participants.length}</span>
                                            <button type="button" onClick={addParticipant}
                                                disabled={participants.length >= groupMax}
                                                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 disabled:opacity-30 transition">+</button>
                                        </div>
                                    </div>
                                )}

                                {/* Participant cards */}
                                <div className="space-y-5">
                                    {participants.map((participant, idx) => (
                                        <div key={idx} className="bg-black/20 rounded-xl p-6 border border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-cyan-900/50 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/30">
                                                        {idx + 1}
                                                    </span>
                                                    {isTeam ? `Member ${idx + 1}` : 'Your Details'}
                                                </h3>
                                                {isTeam && !isGroupTicket && participants.length > 1 && (
                                                    <button type="button" onClick={() => removeParticipant(idx)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                                                )}
                                            </div>
                                            {/* Dynamic fields grid */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {activeFieldsList.map(fieldInfo => (
                                                    <DynamicField
                                                        key={fieldInfo.field}
                                                        fieldKey={fieldInfo.field}
                                                        value={participant[fieldInfo.field] || ''}
                                                        onChange={v => handleParticipantChange(idx, fieldInfo.field, v)}
                                                        required={fieldInfo.required}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add member button (non-group, team type only) */}
                                {isTeam && !isGroupTicket && participants.length < 4 && (
                                    <button type="button" onClick={addParticipant}
                                        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all font-medium flex items-center justify-center gap-2">
                                        + Add Team Member
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

                        {/* ── STEP 3: Payment ─────────────────────────────────────────── */}
                        {currentStep === 3 && (
                            <div className="flex flex-col h-full justify-center max-w-lg mx-auto w-full">
                                <h2 className="text-2xl font-bold text-white mb-8 text-center">Registration Summary</h2>

                                <div className="bg-black/30 rounded-2xl p-8 border border-white/10 mb-8 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Event</span>
                                        <span className="text-white font-medium text-right">{event.title}</span>
                                    </div>
                                    {selectedTicket && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Ticket</span>
                                            <div className="text-right flex items-center gap-2">
                                                <span className="text-white font-medium">{selectedTicket.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${selectedTicket.type === 'group' ? 'bg-purple-900/30 text-purple-300' : 'bg-cyan-900/30 text-cyan-300'}`}>
                                                    {selectedTicket.type === 'group' ? `Group ${groupMin}–${groupMax}` : 'Individual'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Participants</span>
                                        <span className="text-white font-medium">{participants.length}</span>
                                    </div>
                                    {!isFree && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">₹{pricePerPerson} × {participants.length}</span>
                                            <span className="text-slate-300 font-medium">₹{totalAmount}</span>
                                        </div>
                                    )}
                                    {/* Fields collected */}
                                    {activeFieldsList.length > 0 && (
                                        <div className="pt-2 border-t border-white/10">
                                            <p className="text-slate-500 text-xs mb-2">Data collected per participant:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {activeFieldsList.map((f, idx) => (
                                                    <span key={f.field} className={`text-xs px-2 py-0.5 rounded-md border ${
                                                        f.required 
                                                            ? "bg-cyan-900/20 border-cyan-500/30 text-cyan-300"
                                                            : "bg-white/5 border-white/10 text-slate-500"
                                                    }`}>
                                                        {FIELD_META[f.field]?.label || f.field}
                                                        {f.required ? " *" : ""}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-white">Total Amount</span>
                                        <span className="text-cyan-400">{isFree || totalAmount === 0 ? 'Free' : `₹${totalAmount}`}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button onClick={handleSubmit} disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2">
                                        {isSubmitting
                                            ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                            : <>{isFree || totalAmount === 0 ? 'Confirm Registration' : 'Pay Now'} <ArrowRight className="w-5 h-5" /></>
                                        }
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
