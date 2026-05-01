"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Users,
  AlertTriangle,
  Timer,
  ShieldAlert,
  Filter,
  Bot,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Activity,
  Clock,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Radio,
  Cpu,
  ArrowDownRight,
  Menu,
  X,
} from "lucide-react";

/* ─── Animated Counter ──────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
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
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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

/* ─── Navbar ────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-emerald-500/10"
          : "bg-transparent"
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
              Kairos{" "}
              <span className="text-emerald-400 text-glow-emerald">AI</span>
            </span>
          </a>

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
            className="sm:hidden p-2 text-gray-400 hover:text-emerald-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="sm:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-emerald-500/10"
        >
          <div className="px-4 py-4">
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

/* ─── Hero Section ──────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
      >
        {/* Badge */}
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-emerald-400 tracking-wide uppercase">
              AI-Powered Real Estate Automation
            </span>
          </div>
        </FadeInSection>

        {/* Headline */}
        <FadeInSection delay={0.15}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
            Every minute your team delays on WhatsApp,{" "}
            <span className="text-emerald-400 text-glow-emerald">
              another agency closes your buyer.
            </span>
          </h1>
        </FadeInSection>

        {/* Sub-headline */}
        <FadeInSection delay={0.3}>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Kairos AI helps Dubai real estate agencies stop lead leakage, qualify
            serious prospects instantly, and route deal-ready clients to agents in
            real-time with 24/7 AI workflows.
          </p>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#audit"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-base hover:bg-emerald-400 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-[0.97] w-full sm:w-auto justify-center"
            >
              Book a Free System Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-emerald-500/20 text-emerald-400 font-medium text-base hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all w-full sm:w-auto justify-center"
            >
              See How It Works
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInSection>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-emerald-500/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-emerald-400/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Problem Section ───────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    {
      icon: Timer,
      title: "Speed Kills",
      description:
        "Most property leads go cold within minutes, but manual WhatsApp follow-ups take hours.",
      accent: "from-red-500/20 to-red-600/5",
      iconColor: "text-red-400",
      borderColor: "border-red-500/20 hover:border-red-500/40",
    },
    {
      icon: Users,
      title: "Admin Trap",
      description:
        "Your best closers are stuck asking repetitive qualification questions instead of selling.",
      accent: "from-amber-500/20 to-amber-600/5",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20 hover:border-amber-500/40",
    },
    {
      icon: Filter,
      title: "Wasted Pipeline",
      description:
        "Unfiltered inquiries flood your CRM and distract your team from real buyers.",
      accent: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/20 hover:border-orange-500/40",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                The Problem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Are You Burning{" "}
              <span className="text-red-400">Commission?</span>
            </h2>
          </div>
        </FadeInSection>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <FadeInSection key={problem.title} delay={i * 0.15}>
              <div
                className={`group relative p-6 sm:p-8 rounded-2xl border bg-gradient-to-br ${problem.accent} ${problem.borderColor} transition-all duration-300 hover:translate-y-[-4px]`}
              >
                <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a]/80" />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl ${problem.iconColor} bg-current/10 flex items-center justify-center mb-5`}
                  >
                    <problem.icon className={`w-6 h-6 ${problem.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solution / How It Works ──────────────────────────────── */
function SolutionSection() {
  const steps = [
    {
      icon: Radio,
      step: "01",
      title: "Instant Capture",
      description:
        "Leads from Meta Ads are engaged within 5 seconds.",
      detail: "Real-time webhook → WhatsApp greeting → Lead profile created",
      color: "emerald",
    },
    {
      icon: Bot,
      step: "02",
      title: "AI Qualification",
      description:
        "Our local LLM agent qualifies budget and intent via WhatsApp autonomously.",
      detail: "Natural conversation → Budget verification → Intent scoring",
      color: "cyan",
    },
    {
      icon: MessageSquare,
      step: "03",
      title: "Seamless Handoff",
      description:
        "Hot leads are instantly routed to your human agents with full context in your CRM.",
      detail: "Priority scoring → Agent assignment → Full conversation log",
      color: "emerald",
    },
  ];

  return (
    <section id="architecture" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 radial-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                The Solution
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Kairos{" "}
              <span className="text-emerald-400 text-glow-emerald">
                Architecture
              </span>
            </h2>
          </div>
        </FadeInSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.2}>
                <div className="group relative">
                  {/* Card */}
                  <div className="relative p-6 sm:p-8 rounded-2xl border border-emerald-500/15 bg-[#0a0a0a]/90 hover:border-emerald-500/30 transition-all duration-300 hover:translate-y-[-4px] glow-emerald">
                    {/* Step number */}
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        STEP {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/15 transition-colors">
                      <step.icon className="w-7 h-7 text-emerald-400" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Detail line */}
                    <div className="flex items-center gap-2 text-sm text-emerald-400/70 font-mono">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{step.detail}</span>
                    </div>
                  </div>

                  {/* Arrow between steps (desktop) */}
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

/* ─── Case Study / Dashboard ────────────────────────────────── */
function CaseStudySection() {
  const metrics = [
    {
      icon: CheckCircle2,
      value: 0,
      suffix: "%",
      label: "Lead Leakage",
      detail: "100% engaged < 5s",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: Clock,
      value: 40,
      suffix: "",
      label: "Hrs/Week Saved",
      detail: "On Data Entry",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: TrendingUp,
      value: 32,
      suffix: "%",
      prefix: "+",
      label: "Increase in",
      detail: "Qualified Meetings",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Proof of Concept
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dubai Premium{" "}
              <span className="text-emerald-400 text-glow-emerald">
                Realty
              </span>
            </h2>
          </div>
        </FadeInSection>

        {/* Dashboard mock */}
        <FadeInSection delay={0.1}>
          <div className="relative rounded-2xl border border-emerald-500/15 bg-[#0a0a0a] overflow-hidden glow-emerald">
            {/* Dashboard header bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-emerald-500/10 bg-[#080808]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500 font-mono">
                  kairos-dashboard.dubai-premium-realty
                </span>
              </div>
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>

            {/* Dashboard body */}
            <div className="p-6 sm:p-8">
              {/* Status bar */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">
                    System Active
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">
                    AI Agent Online
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-white/5">
                  <span className="text-xs font-medium text-gray-500">
                    Last 90 days
                  </span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {metrics.map((metric, i) => (
                  <FadeInSection key={metric.label} delay={0.2 + i * 0.15}>
                    <div
                      className={`relative p-5 sm:p-6 rounded-xl border ${metric.borderColor} bg-[#050505] hover:bg-[#080808] transition-all group`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center mb-4`}
                      >
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </div>

                      {/* Value */}
                      <div
                        className={`text-3xl sm:text-4xl font-bold ${metric.color} mb-1 font-mono`}
                      >
                        <AnimatedCounter
                          target={metric.value}
                          suffix={metric.suffix}
                          prefix={metric.prefix || ""}
                        />
                      </div>

                      {/* Label */}
                      <div className="text-sm text-gray-400 font-medium">
                        {metric.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {metric.detail}
                      </div>

                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    </div>
                  </FadeInSection>
                ))}
              </div>

              {/* Mini chart placeholder */}
              <div className="mt-8 pt-6 border-t border-emerald-500/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Lead Engagement Timeline
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">
                    LIVE
                  </span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const height =
                      20 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.03 }}
                        className={`flex-1 rounded-sm ${
                          i >= 35
                            ? "bg-emerald-400"
                            : i >= 25
                            ? "bg-emerald-500/60"
                            : "bg-emerald-500/30"
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

/* ─── Final CTA & Footer ────────────────────────────────────── */
function FinalCTA() {
  return (
    <section id="audit" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 radial-gradient" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          {/* Decorative line */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mb-10" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Stop losing buyers to{" "}
            <span className="text-emerald-400 text-glow-emerald">
              faster agencies.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your competitors are already automating. Every day you wait is another
            deal lost. Get your free system audit and see exactly where your lead
            pipeline is leaking.
          </p>

          <a
            href="#"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] active:scale-[0.97] animate-pulse-glow"
          >
            Book a Free System Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-6 text-sm text-gray-500">
            No commitment required. 30-minute strategy call.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-emerald-500/10 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              Kairos <span className="text-emerald-400">AI</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2026 Kairos AI Automations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CaseStudySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
