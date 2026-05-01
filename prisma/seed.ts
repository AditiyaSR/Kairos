import { db } from "@/lib/db";

async function seed() {
  console.log("🌱 Seeding database...");

  // Site Settings - Hero
  const settings = [
    { key: "hero_badge", value: "AI-Powered Real Estate Automation" },
    { key: "hero_headline", value: "Every minute your team delays on WhatsApp, another agency closes your buyer." },
    { key: "hero_subheadline", value: "Kairos AI helps Dubai real estate agencies stop lead leakage, qualify serious prospects instantly, and route deal-ready clients to agents in real-time with 24/7 AI workflows." },
    { key: "hero_cta", value: "Book a Free System Audit" },
    { key: "hero_cta_secondary", value: "See How It Works" },
    // Problem section
    { key: "problem_title", value: "Are You Burning Commission?" },
    { key: "problem_card_1_title", value: "Speed Kills" },
    { key: "problem_card_1_desc", value: "Most property leads go cold within minutes, but manual WhatsApp follow-ups take hours." },
    { key: "problem_card_2_title", value: "Admin Trap" },
    { key: "problem_card_2_desc", value: "Your best closers are stuck asking repetitive qualification questions instead of selling." },
    { key: "problem_card_3_title", value: "Wasted Pipeline" },
    { key: "problem_card_3_desc", value: "Unfiltered inquiries flood your CRM and distract your team from real buyers." },
    // Solution section
    { key: "solution_title", value: "The Kairos Architecture" },
    { key: "solution_step_1_title", value: "Instant Capture" },
    { key: "solution_step_1_desc", value: "Leads from Meta Ads are engaged within 5 seconds." },
    { key: "solution_step_1_detail", value: "Real-time webhook → WhatsApp greeting → Lead profile created" },
    { key: "solution_step_2_title", value: "AI Qualification" },
    { key: "solution_step_2_desc", value: "Our local LLM agent qualifies budget and intent via WhatsApp autonomously." },
    { key: "solution_step_2_detail", value: "Natural conversation → Budget verification → Intent scoring" },
    { key: "solution_step_3_title", value: "Seamless Handoff" },
    { key: "solution_step_3_desc", value: "Hot leads are instantly routed to your human agents with full context in your CRM." },
    { key: "solution_step_3_detail", value: "Priority scoring → Agent assignment → Full conversation log" },
    // Case study
    { key: "casestudy_title", value: "Dubai Premium Realty" },
    { key: "casestudy_metric_1_value", value: "0" },
    { key: "casestudy_metric_1_suffix", value: "%" },
    { key: "casestudy_metric_1_label", value: "Lead Leakage" },
    { key: "casestudy_metric_1_detail", value: "100% engaged < 5s" },
    { key: "casestudy_metric_2_value", value: "40" },
    { key: "casestudy_metric_2_suffix", value: "" },
    { key: "casestudy_metric_2_label", value: "Hrs/Week Saved" },
    { key: "casestudy_metric_2_detail", value: "On Data Entry" },
    { key: "casestudy_metric_3_value", value: "32" },
    { key: "casestudy_metric_3_suffix", value: "%" },
    { key: "casestudy_metric_3_prefix", value: "+" },
    { key: "casestudy_metric_3_label", value: "Increase in" },
    { key: "casestudy_metric_3_detail", value: "Qualified Meetings" },
    // CTA section
    { key: "cta_headline", value: "Stop losing buyers to faster agencies." },
    { key: "cta_subtext", value: "Your competitors are already automating. Every day you wait is another deal lost. Get your free system audit and see exactly where your lead pipeline is leaking." },
    { key: "cta_button", value: "Book a Free System Audit" },
    // Footer
    { key: "footer_copyright", value: "© 2026 Kairos AI Automations. All rights reserved." },
    // Pricing
    { key: "pricing_title", value: "Transparent Pricing" },
    { key: "pricing_subtitle", value: "Choose the plan that fits your agency's scale. No hidden fees." },
    // Client logos section
    { key: "clients_title", value: "Trusted by Leading UAE Agencies" },
    // Services section
    { key: "services_title", value: "End-to-End AI Infrastructure" },
    { key: "services_subtitle", value: "Everything your agency needs to automate lead management, from first touch to closed deal." },
  ];

  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // Services
  const services = [
    {
      title: "WhatsApp AI Agent",
      description: "24/7 autonomous lead qualification via WhatsApp. Engages, qualifies, and routes leads without human intervention.",
      icon: "MessageSquare",
      features: JSON.stringify(["Natural language processing", "Budget verification", "Intent scoring", "Multi-language support"]),
      order: 1,
    },
    {
      title: "Meta Ads Integration",
      description: "Instant capture of leads from Facebook & Instagram ads. Sub-5-second response time from lead to first message.",
      icon: "Radio",
      features: JSON.stringify(["Real-time webhooks", "Auto-response engine", "Lead profile creation", "A/B test routing"]),
      order: 2,
    },
    {
      title: "CRM Synchronization",
      description: "Seamless two-way sync with your existing CRM. Full conversation context attached to every lead record.",
      icon: "Database",
      features: JSON.stringify(["Salesforce integration", "HubSpot sync", "Custom CRM API", "Activity logging"]),
      order: 3,
    },
    {
      title: "Smart Lead Routing",
      description: "AI-powered lead scoring and automatic assignment to the right agent based on expertise and availability.",
      icon: "Route",
      features: JSON.stringify(["Priority scoring", "Agent matching", "Round-robin assignment", "Escalation rules"]),
      order: 4,
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights into lead performance, conversion rates, and agent productivity with actionable metrics.",
      icon: "BarChart3",
      features: JSON.stringify(["Real-time metrics", "Conversion tracking", "Agent performance", "ROI calculator"]),
      order: 5,
    },
    {
      title: "Compliance & Security",
      description: "Enterprise-grade security with UAE data residency. GDPR and local regulation compliance built-in.",
      icon: "Shield",
      features: JSON.stringify(["Data encryption", "UAE data residency", "Audit trails", "Access controls"]),
      order: 6,
    },
  ];

  for (const s of services) {
    await db.service.upsert({
      where: { id: s.title.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: s.title.toLowerCase().replace(/\s+/g, "-"),
        title: s.title,
        description: s.description,
        icon: s.icon,
        features: s.features,
        order: s.order,
      },
    });
  }

  // Testimonials
  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      role: "Director of Sales",
      company: "Emaar Properties",
      content: "Kairos AI transformed our lead response from 4 hours to under 5 seconds. Our conversion rate jumped 35% in the first quarter alone.",
      rating: 5,
      order: 1,
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      company: "Damac International",
      content: "We eliminated 40 hours of manual data entry per week. Our agents now focus entirely on closing deals instead of qualifying tire-kickers.",
      rating: 5,
      order: 2,
    },
    {
      name: "Mohammed Khalifa",
      role: "CEO",
      company: "Dubai Premium Realty",
      content: "The ROI was immediate. Within 30 days, we saw a 32% increase in qualified meetings and zero lead leakage for the first time ever.",
      rating: 5,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    await db.testimonial.create({
      data: t,
    });
  }

  // FAQs
  const faqs = [
    {
      question: "How quickly can Kairos AI be deployed for my agency?",
      answer: "Most agencies are fully operational within 5-7 business days. This includes WhatsApp Business API setup, CRM integration, and custom AI agent training on your specific qualification criteria.",
      order: 1,
    },
    {
      question: "Does the AI agent sound robotic on WhatsApp?",
      answer: "No. Our LLM is fine-tuned for real estate conversations in both English and Arabic. It uses natural, conversational language and adapts its tone based on the prospect's communication style.",
      order: 2,
    },
    {
      question: "What happens when a lead is qualified and ready?",
      answer: "Hot leads are instantly routed to your assigned agent via CRM notification, WhatsApp message, or email — with the full conversation context attached. The handoff is seamless and takes under 1 second.",
      order: 3,
    },
    {
      question: "Can I customize the qualification criteria?",
      answer: "Absolutely. You define the qualification parameters — budget range, timeline, property type, location preference, and more. The AI agent adapts to your specific criteria in real-time.",
      order: 4,
    },
    {
      question: "Is my data secure and compliant with UAE regulations?",
      answer: "Yes. All data is stored in UAE-based data centers with full encryption at rest and in transit. We comply with UAE PDPL and international GDPR standards.",
      order: 5,
    },
    {
      question: "What CRM systems do you integrate with?",
      answer: "We integrate natively with Salesforce, HubSpot, Pipedrive, and Property Finder CRM. Custom integrations can be built for any system with an API within 2 weeks.",
      order: 6,
    },
  ];

  for (const f of faqs) {
    await db.fAQ.create({
      data: f,
    });
  }

  console.log("✅ Seeding complete!");
  console.log(`  - ${settings.length} site settings`);
  console.log(`  - ${services.length} services`);
  console.log(`  - ${testimonials.length} testimonials`);
  console.log(`  - ${faqs.length} FAQs`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
