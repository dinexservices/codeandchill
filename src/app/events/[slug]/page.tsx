"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Trophy, Users, CheckCircle, ArrowRight, Target, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { AppDispatch, RootState } from '@/store/store';
import { fetchEventBySlug } from '@/store/slices/eventSlice';
import { store } from '@/store/store';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;

    // Fetch data
    try {
        const result = await store.dispatch(fetchEventBySlug(slug));

        if (fetchEventBySlug.rejected.match(result)) {
            return {
                title: 'Event Not Found',
            };
        }

        const event = result.payload as any;

        if (!event) {
            return {
                title: 'Event Not Found',
            };
        }

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: event.title,
            description: event.shortDescription || event.description?.slice(0, 160),
            openGraph: {
                title: event.title,
                description: event.shortDescription || event.description?.slice(0, 160),
                images: [event.coverImage || event.imageUrl || '/og-image.jpg', ...previousImages],
            },
        };
    } catch (error) {
        return {
            title: 'Event Details',
        };
    }
}

export default function EventDetailsPage() {
    const params = useParams();
    const slug = params.slug as string;
    const dispatch = useDispatch<AppDispatch>();
    const { event, loading, error } = useSelector((state: RootState) => state.event);

    useEffect(() => {
        if (slug) {
            dispatch(fetchEventBySlug(slug));
        }
    }, [dispatch, slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-black text-white font-sans">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Event Not Found</h1>
                    <p className="text-slate-400 mb-8">{error || "The event you are looking for does not exist or has been removed."}</p>
                    <Link href="/events" className="px-6 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors font-bold">
                        Browse All Events
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const eventDate = event.startDate || event.eventDate;
    const isValidDate = eventDate && !isNaN(new Date(eventDate).getTime());

    const formattedDate = isValidDate
        ? new Date(eventDate).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })
        : 'Date TBA';

    const formattedTime = isValidDate
        ? new Date(eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : 'Time TBA';

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-transparent overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                {/* Abstract Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-cyan-900/20 border border-cyan-500/30 backdrop-blur-sm text-cyan-300 rounded-full text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        {event.category || 'Event'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        {event.title}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {event.description}
                    </p>

                    <div className="mb-12">
                        <CountdownTimer targetDate={eventDate} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/events/${slug}/register`} className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] w-full sm:w-auto text-center">
                            Register Now
                        </Link>
                        {event.eventStructure && event.eventStructure.length > 0 && (
                            <Link href="#domains" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
                                View Structure
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Event Details */}
            <ScrollAnimatedSection>
                <section className="py-12 border-y border-white/5 bg-white/2 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Event Date</div>
                                    <div className="text-white font-bold text-lg">{formattedDate}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Time</div>
                                    <div className="text-white font-bold text-lg">
                                        {formattedTime}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Location</div>
                                    <div className="text-white font-bold text-lg">{event.venue}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Registration Fee</div>
                                    <div className="text-white font-bold text-lg">
                                        {event.price === '0' || event.price === 'Free' ? 'Free' : `₹${event.price}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollAnimatedSection>

            {/* About & Highlights Section */}
            <ScrollAnimatedSection>
                <section className="py-24 bg-transparent relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Left Column: About */}
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">About The Event</h2>
                                <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-light space-y-6">
                                    {event.longDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: event.longDescription.replace(/\n/g, '<br/>') }} />
                                    ) : (
                                        <p>{event.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Highlights Card */}
                            {event.highlights && event.highlights.length > 0 && (
                                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                                        <Trophy className="w-7 h-7 text-amber-400" />
                                        Event Highlights
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                        {event.highlights.map((highlight: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all group/item">
                                                <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center group-hover/item:scale-110 transition-transform bg-cyan-900/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                                                </div>
                                                <span className="text-slate-300 font-medium text-sm">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </ScrollAnimatedSection>

            {/* Domains Section */}
            {event.domains && event.domains.length > 0 && (
                <ScrollAnimatedSection>
                    <section className="py-20 bg-transparent">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Hackathon Domains</h2>
                                <p className="text-slate-400 text-lg">Select a domain to build your solution.</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {event.domains.map((domain: string, i: number) => {
                                    // Helper object for domain descriptions (to match the UI request)
                                    const domainDescriptions: Record<string, string> = {
                                        "FinTech": "Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility.",
                                        "EdTech": "Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions.",
                                        "AgriTech": "Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools.",
                                        "HealthTech": "Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management.",
                                        "Mobility": "Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations.",
                                        "Sustainability": "Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms."
                                    };

                                    const description = domainDescriptions[domain] || `Innovative solutions for the ${domain} sector, leveraging AI to solve core challenges.`;

                                    return (
                                        <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group">
                                            <div className="w-12 h-12 bg-cyan-900/30 rounded-xl border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                                                <Target className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4">{domain}</h3>
                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </ScrollAnimatedSection>
            )}

            {/* Hackathon Flow Section */}
            {event.hackathonFlow && event.hackathonFlow.length > 0 && (
                <ScrollAnimatedSection>
                    <section className="py-24 bg-transparent relative overflow-hidden">
                        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-20">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Hackathon Flow</h2>
                                <p className="text-slate-400 text-lg">The journey from registration to results.</p>
                            </div>

                            <div className="relative">
                                {/* Center Line */}
                                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 md:-translate-x-1/2"></div>

                                <div className="space-y-12">
                                    {event.hackathonFlow.map((step: any, i: number) => (
                                        <div key={i} className={`relative flex items-center md:justify-between group ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                            {/* Content Side */}
                                            <div className="ml-12 md:ml-0 md:w-[45%]">
                                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all relative overflow-hidden group-hover:bg-white/[0.07]">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl font-black text-cyan-500 select-none">
                                                        {step.stepNumber || i + 1}
                                                    </div>
                                                    <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
                                                        PHASE {step.stepNumber || i + 1}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>

                                            {/* Center Dot */}
                                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-black/50 backdrop-blur-xl rounded-full border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10 group-hover:scale-110 transition-transform">
                                                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                                                </div>
                                            </div>

                                            {/* Empty Side (for balancing flex) */}
                                            <div className="hidden md:block md:w-[45%]"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollAnimatedSection>
            )}

            {/* Prizes Section */}
            {event.prizes && (
                <ScrollAnimatedSection>
                    <section className="py-20  border-y border-white/5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
                                <Trophy className="w-10 h-10 text-amber-400" />
                                Prizes & Recognition
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {event.prizes.firstPlace && (
                                    <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-2 border-amber-500/50 rounded-2xl p-8 text-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                                        <div className="text-6xl mb-4">🥇</div>
                                        <h3 className="text-2xl font-bold text-amber-400 mb-4">First Place</h3>
                                        <p className="text-white font-semibold text-lg">{event.prizes.firstPlace}</p>
                                    </div>
                                )}
                                {event.prizes.secondPlace && (
                                    <div className="bg-gradient-to-br from-slate-700/20 to-slate-800/20 border-2 border-slate-400/50 rounded-2xl p-8 text-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(148,163,184,0.2)]">
                                        <div className="text-6xl mb-4">🥈</div>
                                        <h3 className="text-2xl font-bold text-slate-300 mb-4">Second Place</h3>
                                        <p className="text-white font-semibold text-lg">{event.prizes.secondPlace}</p>
                                    </div>
                                )}
                                {event.prizes.thirdPlace && (
                                    <div className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 border-2 border-orange-500/50 rounded-2xl p-8 text-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                                        <div className="text-6xl mb-4">🥉</div>
                                        <h3 className="text-2xl font-bold text-orange-400 mb-4">Third Place</h3>
                                        <p className="text-white font-semibold text-lg">{event.prizes.thirdPlace}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </ScrollAnimatedSection>
            )}

            {/* Rules and Guidelines Section */}
            {event.rulesAndGuidelines && event.rulesAndGuidelines.length > 0 && (
                <ScrollAnimatedSection>
                    <section className="py-16 bg-transparent">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Rules & Guidelines</h2>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                                <ul className="space-y-4">
                                    {event.rulesAndGuidelines.map((rule: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <span className="text-cyan-400 font-bold mt-1">{i + 1}.</span>
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </ScrollAnimatedSection>
            )}

            {/* Submission Requirements Section */}
            {event.submissionRequirements && event.submissionRequirements.length > 0 && (
                <ScrollAnimatedSection>
                    <section className="py-16 bg-white/2 backdrop-blur-sm border-y border-white/5">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Submission Requirements</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {event.submissionRequirements.map((req: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <span className="text-slate-300 font-medium">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollAnimatedSection>
            )}





            <ScrollAnimatedSection delay={0.5}>
                <div className="mt-20 mb-20 text-center">
                    <Link href={`/events/${slug}/register`} className="inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] text-lg group">
                        Register Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </ScrollAnimatedSection>

            <Footer />
        </div>
    );
}
