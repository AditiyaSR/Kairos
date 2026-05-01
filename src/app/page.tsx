'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Cpu,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Timer,
  Users,
  Filter,
  Radio,
  Bot,
  MessageSquare,
  ArrowDownRight,
  Activity,
  Clock,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Database,
  Route,
  Shield,
  AlertTriangle,
  Star,
  Quote,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Check,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  order: number;
  active: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string;
  order: number;
  active: boolean;
}

/* ─── Default Data ──────────────────────────────────────────── */
const defaultContent: Record<string, string> = {
  hero_badge: 'AI-Powered Real Estate Automation',
  hero_headline: 'Every minute your team delays on WhatsApp, another agency closes your buyer.',
  hero_subheadline:
    'Kairos AI helps Dubai real estate agencies stop lead leakage, qualify serious prospects instantly, and route deal-ready clients to agents in real-time with 24/7 AI workflows.',
  hero_cta: 'Book a Free System Audit',
  hero_cta_secondary: 'See How It Works',
  problem_title: 'Are You Burning Commission?',
  problem_card_1_title: 'Speed Kills',
  problem_card_1_desc: 'Most property leads go cold within minutes, but manual WhatsApp follow-ups take hours.',
  problem_card_2_title: 'Admin Trap',
  problem_card_2_desc: "Your best closers are stuck asking repetitive qualification questions instead of selling.",
  problem_card_3_title: 'Wasted Pipeline',
  problem_card_3_desc: 'Unfiltered inquiries flood your CRM and distract your team from real buyers.',
  solution_title: 'The Kairos Architecture',
  solution_step_1_title: 'Instant Capture',
  solution_step_1_desc: 'Leads from Meta Ads are engaged within 5 seconds.',
  solution_step_1_detail: 'Real-time webhook → WhatsApp greeting → Lead profile created',
  solution_step_2_title: 'AI Qualification',
  solution_step_2_desc: 'Our local LLM agent qualifies budget and intent via WhatsApp autonomously.',
  solution_step_2_detail: 'Natural conversation → Budget verification → Intent scoring',
  solution_step_3_title: 'Seamless Handoff',
  solution_step_3_desc: 'Hot leads are instantly routed to your human agents with full context in your CRM.',
  solution_step_3_detail: 'Priority scoring → Agent assignment → Full conversation log',
  casestudy_title: 'Dubai Premium Realty',
  casestudy_metric_1_value: '0',
  casestudy_metric_1_suffix: '%',
  casestudy_metric_1_label: 'Lead Leakage',
  casestudy_metric_1_detail: '100% engaged < 5s',
  casestudy_metric_2_value: '40',
  casestudy_metric_2_suffix: '',
  casestudy_metric_2_label: 'Hrs/Week Saved',
  casestudy_metric_2_detail: 'On Data Entry',
  casestudy_metric_3_value: '32',
  casestudy_metric_3_suffix: '%',
  casestudy_metric_3_prefix: '+',
  casestudy_metric_3_label: 'Increase in',
  casestudy_metric_3_detail: 'Qualified Meetings',
  cta_headline: 'Stop losing buyers to faster agencies.',
  cta_subtext:
    'Your competitors are already automating. Every day you wait is another deal lost. Get your free system audit and see exactly where your lead pipeline is leaking.',
  cta_button: 'Book a Free System Audit',
  footer_copyright: '© 2026 Kairos AI Automations. All rights reserved.',
  pricing_title: 'Transparent Pricing',
  pricing_subtitle: "Choose the plan that fits your agency's scale. No hidden fees.",
  clients_title: 'Trusted by Leading UAE Agencies',
  services_title: 'End-to-End AI Infrastructure',
  services_subtitle: 'Everything your agency needs to automate lead management, from first touch to closed deal.',
};

const defaultServices: Service[] = [
  { id: '1', title: 'WhatsApp AI Agent', description: '24/7 autonomous lead qualification via WhatsApp. Engages, qualifies, and routes leads without human intervention.', icon: 'MessageSquare', features: '["Natural language processing","Budget verification","Intent scoring","Multi-language support"]', order: 1, active: true },
  { id: '2', title: 'Meta Ads Integration', description: 'Instant capture of leads from Facebook & Instagram ads. Sub-5-second response time from lead to first message.', icon: 'Radio', features: '["Real-time webhooks","Auto-response engine","Lead profile creation","A/B test routing"]', order: 2, active: true },
  { id: '3', title: 'CRM Synchronization', description: 'Seamless two-way sync with your existing CRM. Full conversation context attached to every lead record.', icon: 'Database', features: '["Salesforce integration","HubSpot sync","Custom CRM API","Activity logging"]', order: 3, active: true },
  { id: '4', title: 'Smart Lead Routing', description: 'AI-powered lead scoring and automatic assignment to the right agent based on expertise and availability.', icon: 'Route', features: '["Priority scoring","Agent matching","Round-robin assignment","Escalation rules"]', order: 4, active: true },
  { id: '5', title: 'Analytics Dashboard', description: 'Real-time insights into lead performance, conversion rates, and agent productivity with actionable metrics.', icon: 'BarChart3', features: '["Real-time metrics","Conversion tracking","Agent performance","ROI calculator"]', order: 5, active: true },
  { id: '6', title: 'Compliance & Security', description: 'Enterprise-grade security with UAE data residency. GDPR and local regulation compliance built-in.', icon: 'Shield', features: '["Data encryption","UAE data residency","Audit trails","Access controls"]', order: 6, active: true },
];

const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Ahmed Al-Rashid', role: 'Director of Sales', company: 'Emaar Properties', content: 'Kairos AI transformed our lead response from 4 hours to under 5 seconds. Our conversion rate jumped 35% in the first quarter alone.', rating: 5, order: 1, active: true },
  { id: '2', name: 'Sarah Chen', role: 'Head of Operations', company: 'Damac International', content: 'We eliminated 40 hours of manual data entry per week. Our agents now focus entirely on closing deals instead of qualifying tire-kickers.', rating: 5, order: 2, active: true },
  { id: '3', name: 'Mohammed Khalifa', role: 'CEO', company: 'Dubai Premium Realty', content: 'The ROI was immediate. Within 30 days, we saw a 32% increase in qualified meetings and zero lead leakage for the first time ever.', rating: 5, order: 3, active: true },
];

const defaultFaqs: FAQ[] = [
  { id: '1', question: 'How quickly can Kairos AI be deployed for my agency?', answer: 'Most agencies are fully operational within 5-7 business days. This includes WhatsApp Business API setup, CRM integration, and custom AI agent training on your specific qualification criteria.', order: 1, active: true },
  { id: '2', question: 'Does the AI agent sound robotic on WhatsApp?', answer: 'No. Our LLM is fine-tuned for real estate conversations in both English and Arabic. It uses natural, conversational language and adapts its tone based on the prospect\'s communication style.', order: 2, active: true },
  { id: '3', question: 'What happens when a lead is qualified and ready?', answer: 'Hot leads are instantly routed to your assigned agent via CRM notification, WhatsApp message, or email — with the full conversation context attached. The handoff is seamless and takes under 1 second.', order: 3, active: true },
  { id: '4', question: 'Can I customize the qualification criteria?', answer: 'Absolutely. You define the qualification parameters — budget range, timeline, property type, location preference, and more. The AI agent adapts to your specific criteria in real-time.', order: 4, active: true },
  { id: '5', question: 'Is my data secure and compliant with UAE regulations?', answer: 'Yes. All data is stored in UAE-based data centers with full encryption at rest and in transit. We comply with UAE PDPL and international GDPR standards.', order: 5, active: true },
  { id: '6', question: 'What CRM systems do you integrate with?', answer: 'We integrate natively with Salesforce, HubSpot, Pipedrive, and Property Finder CRM. Custom integrations can be built for any system with an API within 2 weeks.', order: 6, active: true },
];

/* ─── Icon Mapping ──────────────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Radio,
  Database,
  Route,
  BarChart3,
  Shield,
  Bot,
  Cpu,
  Timer,
  Users,
  Filter,
};

/* ─── Animated Counter ──────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ─── Fade-in Section Wrapper ──────────────────────────────── */
function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Star Rating Component ─────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-emerald-400 fill-emerald-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: Navbar
   ═══════════════════════════════════════════════════════════════ */
function Navbar({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#architecture' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-emerald-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Kairos <span className="text-emerald-400 text-glow-emerald">AI</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href="#audit"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.97]"
            >
              Book Audit
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-emerald-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-emerald-500/10"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all"
            >
              Book Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: Hero
   ═══════════════════════════════════════════════════════════════ */
function HeroSection({ content }: { content: Record<string, string> }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Badge */}
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-emerald-400 tracking-wide uppercase">
              {content.hero_badge}
            </span>
          </div>
        </FadeInSection>

        {/* Headline */}
        <FadeInSection delay={0.15}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
            Every minute your team delays on WhatsApp,{' '}
            <span className="text-emerald-400 text-glow-emerald">another agency closes your buyer.</span>
          </h1>
        </FadeInSection>

        {/* Sub-headline */}
        <FadeInSection delay={0.3}>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {content.hero_subheadline}
          </p>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#audit"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-base hover:bg-emerald-400 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              {content.hero_cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-emerald-500/20 text-emerald-400 font-medium text-base hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all w-full sm:w-auto justify-center"
            >
              {content.hero_cta_secondary}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInSection>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-emerald-500/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-emerald-400/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: Trusted By / Client Logos
   ═══════════════════════════════════════════════════════════════ */
function ClientsSection({ content }: { content: Record<string, string> }) {
  const clients = ['Emaar', 'Damac', 'Nakheel', 'Meraas', 'Sobha', 'Azizi'];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-y border-emerald-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-10">
            {content.clients_title}
          </p>
        </FadeInSection>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex-shrink-0 mx-4 sm:mx-8 px-6 sm:px-10 py-4 rounded-xl border border-gray-800/50 bg-[#0a0a0a]/50"
            >
              <span className="text-lg sm:text-xl font-bold text-gray-600/70 tracking-wider whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4: Problem
   ═══════════════════════════════════════════════════════════════ */
function ProblemSection({ content }: { content: Record<string, string> }) {
  const problems = [
    {
      icon: Timer,
      title: content.problem_card_1_title,
      description: content.problem_card_1_desc,
      accent: 'from-red-500/20 to-red-600/5',
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/20 hover:border-red-500/40',
    },
    {
      icon: Users,
      title: content.problem_card_2_title,
      description: content.problem_card_2_desc,
      accent: 'from-amber-500/20 to-amber-600/5',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    },
    {
      icon: Filter,
      title: content.problem_card_3_title,
      description: content.problem_card_3_desc,
      accent: 'from-orange-500/20 to-orange-600/5',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">The Problem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Are You Burning <span className="text-red-400">Commission?</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <FadeInSection key={problem.title} delay={i * 0.15}>
              <div
                className={`group relative p-6 sm:p-8 rounded-2xl border bg-gradient-to-br ${problem.accent} ${problem.borderColor} transition-all duration-300 hover:translate-y-[-4px]`}
              >
                <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a]/80" />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${problem.iconColor} bg-current/10 flex items-center justify-center mb-5`}>
                    <problem.icon className={`w-6 h-6 ${problem.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5: Solution / How It Works
   ═══════════════════════════════════════════════════════════════ */
function SolutionSection({ content }: { content: Record<string, string> }) {
  const steps = [
    {
      icon: Radio,
      step: '01',
      title: content.solution_step_1_title,
      description: content.solution_step_1_desc,
      detail: content.solution_step_1_detail,
    },
    {
      icon: Bot,
      step: '02',
      title: content.solution_step_2_title,
      description: content.solution_step_2_desc,
      detail: content.solution_step_2_detail,
    },
    {
      icon: MessageSquare,
      step: '03',
      title: content.solution_step_3_title,
      description: content.solution_step_3_desc,
      detail: content.solution_step_3_detail,
    },
  ];

  return (
    <section id="architecture" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 radial-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">The Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Kairos <span className="text-emerald-400 text-glow-emerald">Architecture</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.2}>
                <div className="group relative">
                  <div className="relative p-6 sm:p-8 rounded-2xl border border-emerald-500/15 bg-[#0a0a0a]/90 hover:border-emerald-500/30 transition-all duration-300 hover:translate-y-[-4px] glow-emerald">
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        STEP {step.step}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/15 transition-colors">
                      <step.icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{step.description}</p>
                    <div className="flex items-center gap-2 text-sm text-emerald-400/70 font-mono">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{step.detail}</span>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#0a0a0a] border border-emerald-500/30 items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6: Services
   ═══════════════════════════════════════════════════════════════ */
function ServicesSection({
  content,
  services,
}: {
  content: Record<string, string>;
  services: Service[];
}) {
  return (
    <section id="features" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {content.services_title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{content.services_subtitle}</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] || Cpu;
            let features: string[] = [];
            try {
              features = JSON.parse(service.features);
            } catch {
              features = [];
            }

            return (
              <FadeInSection key={service.id} delay={i * 0.1}>
                <div className="group relative p-6 sm:p-8 rounded-2xl border border-emerald-500/15 bg-[#0a0a0a] hover:border-emerald-500/30 transition-all duration-300 hover:translate-y-[-4px] h-full">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/15 transition-colors">
                      <IconComponent className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5 text-sm">{service.description}</p>
                    {features.length > 0 && (
                      <ul className="space-y-2">
                        {features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7: Case Study Dashboard
   ═══════════════════════════════════════════════════════════════ */
function CaseStudySection({ content }: { content: Record<string, string> }) {
  const metrics = [
    {
      icon: CheckCircle2,
      value: parseInt(content.casestudy_metric_1_value) || 0,
      suffix: content.casestudy_metric_1_suffix,
      label: content.casestudy_metric_1_label,
      detail: content.casestudy_metric_1_detail,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      icon: Clock,
      value: parseInt(content.casestudy_metric_2_value) || 0,
      suffix: content.casestudy_metric_2_suffix,
      label: content.casestudy_metric_2_label,
      detail: content.casestudy_metric_2_detail,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      icon: TrendingUp,
      value: parseInt(content.casestudy_metric_3_value) || 0,
      suffix: content.casestudy_metric_3_suffix,
      prefix: content.casestudy_metric_3_prefix,
      label: content.casestudy_metric_3_label,
      detail: content.casestudy_metric_3_detail,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Proof of Concept</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dubai Premium <span className="text-emerald-400 text-glow-emerald">Realty</span>
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="relative rounded-2xl border border-emerald-500/15 bg-[#0a0a0a] overflow-hidden glow-emerald">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-emerald-500/10 bg-[#080808]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500 font-mono">kairos-dashboard.dubai-premium-realty</span>
              </div>
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>

            <div className="p-6 sm:p-8">
              {/* Status bar */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">System Active</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">AI Agent Online</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-white/5">
                  <span className="text-xs font-medium text-gray-500">Last 90 days</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {metrics.map((metric, i) => (
                  <FadeInSection key={metric.label} delay={0.2 + i * 0.15}>
                    <div
                      className={`relative p-5 sm:p-6 rounded-xl border ${metric.borderColor} bg-[#050505] hover:bg-[#080808] transition-all group`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center mb-4`}>
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div className={`text-3xl sm:text-4xl font-bold ${metric.color} mb-1 font-mono`}>
                        <AnimatedCounter target={metric.value} suffix={metric.suffix} prefix={metric.prefix || ''} />
                      </div>
                      <div className="text-sm text-gray-400 font-medium">{metric.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{metric.detail}</div>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    </div>
                  </FadeInSection>
                ))}
              </div>

              {/* Mini chart */}
              <div className="mt-8 pt-6 border-t border-emerald-500/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-400">Lead Engagement Timeline</span>
                  <span className="text-xs text-emerald-400 font-mono">LIVE</span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const height = 20 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.03 }}
                        className={`flex-1 rounded-sm ${
                          i >= 35 ? 'bg-emerald-400' : i >= 25 ? 'bg-emerald-500/60' : 'bg-emerald-500/30'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8: Testimonials
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              What Our Clients <span className="text-emerald-400 text-glow-emerald">Say</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <FadeInSection key={testimonial.id} delay={i * 0.15}>
              <div className="group relative p-6 sm:p-8 rounded-2xl border border-emerald-500/15 bg-[#0a0a0a] hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-emerald-500/20 mb-4" />

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6 flex-1">&ldquo;{testimonial.content}&rdquo;</p>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-emerald-400">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9: Pricing
   ═══════════════════════════════════════════════════════════════ */
function PricingSection({ content }: { content: Record<string, string> }) {
  const plans = [
    {
      name: 'Starter',
      price: '3,500',
      period: '/mo',
      description: 'For boutique agencies',
      features: ['Up to 500 leads/mo', 'WhatsApp AI Agent', 'Basic CRM Sync', 'Email Support', '1 Agent Seat'],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Growth',
      price: '7,500',
      period: '/mo',
      description: 'For scaling agencies',
      features: [
        'Up to 2,000 leads/mo',
        'All Starter features',
        'Meta Ads Integration',
        'Smart Lead Routing',
        'Priority Support',
        '5 Agent Seats',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For enterprise brokerages',
      features: [
        'Unlimited leads',
        'All Growth features',
        'Custom AI Training',
        'Dedicated Account Manager',
        '99.9% SLA',
        'Unlimited Seats',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {content.pricing_title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{content.pricing_subtitle}</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <FadeInSection key={plan.name} delay={i * 0.15}>
              <div
                className={`relative p-6 sm:p-8 rounded-2xl border bg-[#0a0a0a] transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col ${
                  plan.popular
                    ? 'border-emerald-500/40 glow-emerald-strong'
                    : 'border-emerald-500/15 hover:border-emerald-500/30'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-emerald-500 text-black uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== 'Custom' && <span className="text-sm text-gray-500">AED</span>}
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-emerald-400' : 'text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#audit"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] ${
                    plan.popular
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/30'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10: FAQ
   ═══════════════════════════════════════════════════════════════ */
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Frequently Asked <span className="text-emerald-400 text-glow-emerald">Questions</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeInSection key={faq.id} delay={i * 0.08}>
              <div
                className={`rounded-xl border transition-all duration-300 ${
                  openIndex === i
                    ? 'border-emerald-500/30 bg-[#0a0a0a]'
                    : 'border-emerald-500/10 bg-[#0a0a0a]/50 hover:border-emerald-500/20'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm sm:text-base font-medium text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11: Contact
   ═══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email, and message are required.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Get In <span className="text-emerald-400 text-glow-emerald">Touch</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Info */}
          <FadeInSection>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to automate your lead pipeline?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get a free system audit and discover exactly where your lead pipeline is leaking.
                  Our team will map out a custom AI automation strategy for your agency.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-white font-medium">hello@kairosai.ae</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="text-white font-medium">+971 4 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="text-white font-medium">DIFC, Dubai, UAE</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Right side - Form */}
          <FadeInSection delay={0.15}>
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/15 bg-[#0a0a0a]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-emerald-500/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-emerald-500/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
                        placeholder="you@agency.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-emerald-500/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-emerald-500/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
                        placeholder="Your agency"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#050505] border border-emerald-500/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors resize-none"
                      placeholder="Tell us about your agency's needs..."
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 12: Final CTA
   ═══════════════════════════════════════════════════════════════ */
function FinalCTA({ content }: { content: Record<string, string> }) {
  return (
    <section id="audit" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 radial-gradient" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mb-10" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            {content.cta_headline?.replace('faster agencies.', '')}
            <span className="text-emerald-400 text-glow-emerald">faster agencies.</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{content.cta_subtext}</p>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] active:scale-[0.97] animate-pulse-glow"
          >
            {content.cta_button}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-6 text-sm text-gray-500">No commitment required. 30-minute strategy call.</p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 13: Footer
   ═══════════════════════════════════════════════════════════════ */
function Footer({ content }: { content: Record<string, string> }) {
  const quickLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#architecture' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];
  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="relative border-t border-emerald-500/10 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Kairos <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered lead automation for Dubai real estate agencies. Stop leaking leads, start closing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">{content.footer_copyright}</p>
          <p className="text-xs text-gray-700">Built for Dubai&apos;s top agencies.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: LandingPage Component
   ═══════════════════════════════════════════════════════════════ */
function LandingPage({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs);
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contentRes, testimonialsRes, faqsRes, servicesRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/testimonials'),
          fetch('/api/faqs'),
          fetch('/api/services'),
        ]);

        if (contentRes.ok) {
          const data = await contentRes.json();
          if (Object.keys(data).length > 0) setContent((prev) => ({ ...prev, ...data }));
        }
        if (testimonialsRes.ok) {
          const data = await testimonialsRes.json();
          if (Array.isArray(data) && data.length > 0) setTestimonials(data);
        }
        if (faqsRes.ok) {
          const data = await faqsRes.json();
          if (Array.isArray(data) && data.length > 0) setFaqs(data);
        }
        if (servicesRes.ok) {
          const data = await servicesRes.json();
          if (Array.isArray(data) && data.length > 0) setServices(data);
        }
      } catch (err) {
        console.error('Failed to fetch data, using defaults:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Navbar onOpenAdmin={onOpenAdmin} />
      <main className="flex-1">
        <HeroSection content={content} />
        <ClientsSection content={content} />
        <ProblemSection content={content} />
        <SolutionSection content={content} />
        <ServicesSection content={content} services={services} />
        <CaseStudySection content={content} />
        <TestimonialsSection testimonials={testimonials} />
        <PricingSection content={content} />
        <FAQSection faqs={faqs} />
        <ContactSection />
        <FinalCTA content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: Home Component
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return <LandingPage onOpenAdmin={() => {}} />;
}
