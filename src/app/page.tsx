"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TechBackground from '@/components/TechBackground';
import {
  Code2,
  Brain,
  Cpu,
  Globe,
  Users,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Download,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Zap,
  Target,
  Award,
  Lightbulb,
  Rocket
} from 'lucide-react';

// Types
interface Domain {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Phase {
  number: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Data
const domains: Domain[] = [
  {
    id: 'fintech',
    title: 'FinTech',
    description: 'Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility.',
    icon: <Code2 className="w-8 h-8" />,
    color: 'from-emerald-400 to-cyan-400'
  },
  {
    id: 'edtech',
    title: 'EdTech',
    description: 'Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions.',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-violet-400 to-purple-400'
  },
  {
    id: 'agritech',
    title: 'AgriTech',
    description: 'Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools.',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'healthtech',
    title: 'HealthTech',
    description: 'Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-rose-400 to-pink-400'
  },
  {
    id: 'mobility',
    title: 'Mobility',
    description: 'Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations.',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-400'
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-teal-400 to-cyan-400'
  }
];

const phases: Phase[] = [
  { number: '01', title: 'Registration', description: 'Participants register individually or as teams through the website.' },
  { number: '02', title: 'Team Formation & Ideation', description: 'Finalize teams and brainstorm innovative solutions based on selected domains.' },
  { number: '03', title: 'Development Stage', description: 'Teams develop working prototypes with mentor guidance and technical support.' },
  { number: '04', title: 'Project Submission', description: 'Teams submit their project source code, prototype, and presentation.' },
  { number: '05', title: 'Evaluation & Results', description: 'Projects are evaluated by industry experts and winners are announced.' }
];

const faqs: FAQ[] = [
  { question: 'Who can participate?', answer: 'Students from Engineering, Management, IT, and related fields are welcome to participate.' },
  { question: 'Can beginners participate?', answer: 'Yes, beginners are absolutely welcome. We encourage learning and growth during the hackathon.' },
  { question: 'Can students participate individually?', answer: 'Yes, participants can register individually or as a team of up to 4 members.' },
  { question: 'What is the maximum team size?', answer: 'Maximum 4 members per team.' },
  { question: 'Is AI knowledge mandatory?', answer: 'No, basic programming knowledge is recommended but not mandatory.' }
];

const highlights = [
  { icon: <Clock className="w-6 h-6" />, text: '24 Hour Continuous Hackathon' },
  { icon: <Users className="w-6 h-6" />, text: 'Industry Mentorship' },
  { icon: <Target className="w-6 h-6" />, text: 'Real Problem Statements' },
  { icon: <Trophy className="w-6 h-6" />, text: 'Prize Pool Recognition' },
  { icon: <Award className="w-6 h-6" />, text: 'Participation Certificates' },
  { icon: <Zap className="w-6 h-6" />, text: 'Networking Opportunities' },
  { icon: <Code2 className="w-6 h-6" />, text: 'Industry Skill Exposure' }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [teamSize, setTeamSize] = useState('Individual');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set target date to 30 days from now for demo
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'domains', label: 'Domains' },
    { id: 'structure', label: 'Structure' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      <Head>
        <title>Code & Chill | 24-Hour AI Hackathon</title>
        <meta name="description" content="Build. Innovate. Solve Real Bharat Challenges." />
      </Head>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <Code2 className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">Code & Chill</span>
                <span className="text-xs text-slate-400 tracking-wider">Innovate with Intelligence</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === item.id ? 'text-cyan-400' : 'text-slate-300'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('register')}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
              >
                Register Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('register')}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white"
              >
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <TechBackground />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-slate-300">24-Hour AI Innovation Marathon</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Code & Chill
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-3xl mx-auto font-light">
            Build. Innovate. Solve Real Bharat Challenges.
          </p>

          <p className="text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the ultimate 24-hour innovation-driven hackathon focused on building Artificial Intelligence solutions for real-world challenges across India's key sectors.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{unit}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('register')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Register Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('domains')}
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-full text-lg font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              Explore Domains
            </button>
            <button className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-full text-lg font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Brochure
            </button>
          </div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                About The <span className="text-cyan-400">Event</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  Code & Chill is a 24-hour AI innovation hackathon designed to encourage students to develop real-world solutions using Artificial Intelligence and emerging technologies.
                </p>
                <p>
                  Built around the theme <span className="text-cyan-400 font-semibold">"AI for Bharat"</span>, we encourage participants to design scalable and inclusive solutions that address real challenges in India across finance, education, agriculture, healthcare, sustainability, and mobility.
                </p>
                <p>
                  Participants can join individually or as a team of up to four members, collaborating to develop working prototypes and present their solutions before industry experts and mentors.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">24H</div>
                  <div className="text-sm text-slate-500">Non-stop Coding</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400 mb-1">6</div>
                  <div className="text-sm text-slate-500">Challenge Domains</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">4</div>
                  <div className="text-sm text-slate-500">Max Team Size</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-amber-400 mb-1">₹50K</div>
                  <div className="text-sm text-slate-500">Prize Pool</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-white">Event Highlights</h3>
                <div className="space-y-4">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors group">
                      <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-slate-300 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Cards */}
          <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar className="w-6 h-6" />, label: 'Date', value: 'To Be Announced', color: 'cyan' },
              { icon: <Clock className="w-6 h-6" />, label: 'Duration', value: '24 Hours', color: 'purple' },
              { icon: <MapPin className="w-6 h-6" />, label: 'Mode', value: 'Offline', color: 'emerald' },
              { icon: <Users className="w-6 h-6" />, label: 'Team Size', value: 'Up to 4 Members', color: 'amber' }
            ].map((detail, index) => (
              <div key={index} className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors group">
                <div className={`inline-flex p-3 rounded-xl bg-${detail.color}-500/10 text-${detail.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                  {detail.icon}
                </div>
                <div className="text-sm text-slate-500 mb-1">{detail.label}</div>
                <div className="text-lg font-semibold text-white">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Domains</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose your challenge area and build innovative AI solutions for real-world problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 hover:transform hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${domain.color} bg-opacity-10 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {domain.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all">
                  {domain.title}
                </h3>

                <p className="text-slate-400 leading-relaxed mb-6">
                  {domain.description}
                </p>

                <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Explore Domain <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Structure */}
      <section id="structure" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Hackathon <span className="text-cyan-400">Flow</span>
            </h2>
            <p className="text-slate-400 text-lg">Your journey from registration to victory</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 hidden md:block" />

            <div className="space-y-12 relative">
              {phases.map((phase, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-colors">
                      <div className="text-cyan-400 font-mono text-sm mb-2">Phase {phase.number}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                      <p className="text-slate-400">{phase.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 font-bold shadow-lg shadow-cyan-500/20">
                      {phase.number}
                    </div>
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Prize <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Pool</span>
            </h2>
            <p className="text-3xl font-bold text-white mb-2">₹30,000 – ₹50,000</p>
            <p className="text-slate-400">Incredible rewards for innovative solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Winner */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-900/80 border border-amber-500/30 rounded-3xl p-8 text-center hover:border-amber-500/60 transition-all transform hover:-translate-y-2">
                <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-400 mb-6">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Winner</h3>
                <p className="text-amber-400 text-lg font-semibold mb-4">Grand Prize</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>Cash Prize + Goodies</li>
                  <li>Internship Opportunities</li>
                  <li>Certificate of Excellence</li>
                </ul>
              </div>
            </div>

            {/* Runner Up */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-400/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-900/80 border border-slate-500/30 rounded-3xl p-8 text-center hover:border-slate-500/60 transition-all transform hover:-translate-y-2">
                <div className="inline-flex p-4 rounded-full bg-slate-500/10 text-slate-400 mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Runner-Up</h3>
                <p className="text-slate-400 text-lg font-semibold mb-4">Second Place</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>Cash Prize + Goodies</li>
                  <li>Networking Opportunities</li>
                  <li>Certificate of Merit</li>
                </ul>
              </div>
            </div>

            {/* Innovation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 text-center hover:border-purple-500/60 transition-all transform hover:-translate-y-2">
                <div className="inline-flex p-4 rounded-full bg-purple-500/10 text-purple-400 mb-6">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Best Innovation</h3>
                <p className="text-purple-400 text-lg font-semibold mb-4">Special Category</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>Special Recognition</li>
                  <li>Domain Excellence</li>
                  <li>Certificate + Goodies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 inline-flex items-center gap-2 bg-slate-900/50 px-6 py-3 rounded-full border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              All participants will receive participation certificates
            </p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Register <span className="text-cyan-400">Now</span>
            </h2>
            <p className="text-slate-400 text-lg">Secure your spot for ₹199 per participant</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">College Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Your institution"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Year of Study</label>
                  <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all">
                    <option>Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Domain Preference</label>
                  <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all">
                    <option>Select Domain</option>
                    {domains.map(d => <option key={d.id}>{d.title}</option>)}
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Team Details (Optional)</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Team Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        placeholder="Your team name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Team Size</label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      >
                        <option value="Individual">Individual</option>
                        <option value="2 Members">2 Members</option>
                        <option value="3 Members">3 Members</option>
                        <option value="4 Members">4 Members</option>
                      </select>
                    </div>
                  </div>

                  {teamSize !== 'Individual' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                      {Array.from({ length: parseInt(teamSize) - 1 }).map((_, index) => (
                        <div key={index} className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 space-y-4">
                          <h4 className="text-md font-medium text-cyan-400 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Member {index + 2}
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-300">Full Name</label>
                              <input
                                type="text"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                placeholder="Member name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-300">Email Address</label>
                              <input
                                type="email"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                placeholder="Member email"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-300">Phone Number</label>
                              <input
                                type="tel"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                placeholder="Member phone"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400">Registration Fee</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      ₹{teamSize === 'Individual' ? 199 : 199 * parseInt(teamSize)}
                    </span>
                    <p className="text-xs text-slate-500">
                      (₹199 × {teamSize === 'Individual' ? 1 : teamSize})
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant confirmation email</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-lg font-bold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-400 pl-8">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="group flex items-center gap-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300">
                  <div className="p-4 bg-slate-900 rounded-xl text-cyan-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Email Us</div>
                    <a href="mailto:contact@codeandchill.tech" className="text-white font-medium text-lg hover:text-cyan-400 transition-colors">
                      contact@codeandchill.tech
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300">
                  <div className="p-4 bg-slate-900 rounded-xl text-cyan-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Call Us</div>
                    <a href="tel:+919876543210" className="text-white font-medium text-lg hover:text-cyan-400 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wider">Follow Us</div>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github].map((Icon, index) => (
                    <button key={index} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/25">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Visual/Form (Placeholder for now, keeping grid balance) */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="relative p-8 bg-slate-900/30 border border-slate-800/50 backdrop-blur-xl rounded-3xl max-w-sm w-full text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20 rotate-3">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Us</h3>
                  <p className="text-slate-400 text-sm">We are here to help you with any queries.</p>
                </div>
                <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-medium transition-colors">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">Code & Chill</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                A 24-hour AI innovation hackathon focused on building solutions for real-world challenges across Bharat's key sectors.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('domains')} className="hover:text-cyan-400 transition-colors">Domains</button></li>
                <li><button onClick={() => scrollToSection('register')} className="hover:text-cyan-400 transition-colors">Register</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-cyan-400 transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Code of Conduct</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 Code & Chill. All rights reserved.</p>
            <p className="text-slate-600 text-sm">Developed by <a href="https://dinestx.com" className="hover:text-cyan-400 transition-colors">Dinex Services</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}