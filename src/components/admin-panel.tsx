'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  AlertTriangle,
  Cpu,
  Briefcase,
  BarChart3,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  MousePointerClick,
  DollarSign,
  X,
  Plus,
  Pencil,
  Trash2,
  Save,
  Loader2,
  ChevronDown,
  Star,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────── */
interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
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

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: string;
  createdAt: string;
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

type TabKey =
  | 'dashboard'
  | 'hero'
  | 'problem'
  | 'solution'
  | 'services'
  | 'casestudy'
  | 'testimonials'
  | 'faqs'
  | 'contacts'
  | 'cta'
  | 'pricing';

/* ─── Icon Options for Services ──────────────────────────────── */
const ICON_OPTIONS = [
  'MessageSquare',
  'Radio',
  'Database',
  'Route',
  'BarChart3',
  'Shield',
  'Bot',
  'Cpu',
  'Zap',
  'Globe',
  'Users',
  'Settings',
];

/* ─── Toast Component ────────────────────────────────────────── */
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl border text-sm font-medium shadow-2xl ${
        type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      {message}
    </motion.div>
  );
}

/* ─── Sidebar Navigation Config ──────────────────────────────── */
const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'hero', label: 'Hero Content', icon: Sparkles },
  { key: 'problem', label: 'Problem Section', icon: AlertTriangle },
  { key: 'solution', label: 'Solution Section', icon: Cpu },
  { key: 'services', label: 'Services', icon: Briefcase },
  { key: 'casestudy', label: 'Case Study', icon: BarChart3 },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle },
  { key: 'contacts', label: 'Contacts', icon: Mail },
  { key: 'cta', label: 'CTA & Footer', icon: MousePointerClick },
  { key: 'pricing', label: 'Pricing', icon: DollarSign },
];

/* ─── Main Component ─────────────────────────────────────────── */
export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
    },
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[100] flex bg-[#050505]"
        >
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={onClose}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="h-14 border-b border-emerald-500/10 bg-[#0a0a0a] flex items-center justify-between px-6 shrink-0">
              <h2 className="text-base font-semibold text-white">
                {TABS.find((t) => t.key === activeTab)?.label}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close admin panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'dashboard' && (
                    <DashboardTab showToast={showToast} onTabChange={setActiveTab} />
                  )}
                  {activeTab === 'hero' && <HeroTab showToast={showToast} />}
                  {activeTab === 'problem' && <ProblemTab showToast={showToast} />}
                  {activeTab === 'solution' && <SolutionTab showToast={showToast} />}
                  {activeTab === 'services' && <ServicesTab showToast={showToast} />}
                  {activeTab === 'casestudy' && <CaseStudyTab showToast={showToast} />}
                  {activeTab === 'testimonials' && (
                    <TestimonialsTab showToast={showToast} />
                  )}
                  {activeTab === 'faqs' && <FaqsTab showToast={showToast} />}
                  {activeTab === 'contacts' && <ContactsTab showToast={showToast} />}
                  {activeTab === 'cta' && <CtaTab showToast={showToast} />}
                  {activeTab === 'pricing' && <PricingTab showToast={showToast} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminPanel;

/* ─── Sidebar ────────────────────────────────────────────────── */
function Sidebar({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-60 bg-[#0a0a0a] border-r border-emerald-500/10 shrink-0">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-5 border-b border-emerald-500/10">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-white">
            Kairos <span className="text-emerald-400">AI</span>
          </span>
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ADMIN
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto custom-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                activeTab === tab.key
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Close */}
        <div className="p-3 border-t border-emerald-500/10">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
          >
            <X className="w-4 h-4" />
            Close Panel
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-10 bg-[#0a0a0a] border-b border-emerald-500/10">
        <div className="h-12 flex items-center gap-2 px-3 border-b border-emerald-500/10">
          <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-xs font-bold text-white">
            Kairos <span className="text-emerald-400">AI</span>
          </span>
          <span className="text-[9px] font-medium px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ADMIN
          </span>
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex overflow-x-auto custom-scrollbar px-2 py-2 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Shared UI Components ───────────────────────────────────── */
function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-emerald-500/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
      />
    </div>
  );
}

function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-emerald-500/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
      />
    </div>
  );
}

function SaveButton({
  onSave,
  loading,
  label = 'Save Changes',
}: {
  onSave: () => void;
  loading: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onSave}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      {label}
    </button>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 p-5 rounded-xl border border-emerald-500/10 bg-[#0a0a0a]/80">
      <h3 className="text-sm font-semibold text-emerald-400 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
      aria-label="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
      aria-label="Edit"
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-gray-500 text-sm">{message}</div>
  );
}

/* ─── Content Fetching Hook ──────────────────────────────────── */
function useContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContent();
  }, [fetchContent]);

  return { content, loading, refetch: fetchContent };
}

/* ─── 1. Dashboard Tab ───────────────────────────────────────── */
function DashboardTab({
  showToast,
  onTabChange,
}: {
  showToast: (m: string, t?: 'success' | 'error') => void;
  onTabChange: (tab: TabKey) => void;
}) {
  const [stats, setStats] = useState({
    testimonials: 0,
    faqs: 0,
    services: 0,
    contacts: 0,
    newContacts: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [testRes, faqRes, servRes, contRes] = await Promise.all([
          fetch('/api/testimonials?all=true'),
          fetch('/api/faqs?all=true'),
          fetch('/api/services?all=true'),
          fetch('/api/contacts'),
        ]);
        const [testimonials, faqs, services, contacts]: [
          Testimonial[],
          FAQ[],
          Service[],
          Contact[],
        ] = await Promise.all([testRes.json(), faqRes.json(), servRes.json(), contRes.json()]);

        setStats({
          testimonials: testimonials.length,
          faqs: faqs.length,
          services: services.length,
          contacts: contacts.length,
          newContacts: contacts.filter((c) => c.status === 'new').length,
        });
        setRecentContacts(contacts.slice(0, 5));
      } catch {
        showToast('Failed to load dashboard', 'error');
      }
      setLoading(false);
    }
    fetchDashboard();
  }, [showToast]);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { label: 'Testimonials', value: stats.testimonials, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'FAQs', value: stats.faqs, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { label: 'Services', value: stats.services, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Contacts', value: stats.contacts, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { label: 'New Contacts', value: stats.newContacts, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`p-4 rounded-xl border ${s.border} ${s.bg} bg-[#0a0a0a]`}
          >
            <div className={`text-2xl font-bold ${s.color} font-mono`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <SectionCard title="Quick Actions">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onTabChange('testimonials')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
          <button
            onClick={() => onTabChange('faqs')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/15 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
          <button
            onClick={() => onTabChange('services')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>
      </SectionCard>

      {/* Recent Contacts */}
      <SectionCard title="Recent Contact Submissions">
        {recentContacts.length === 0 ? (
          <EmptyState message="No contact submissions yet" />
        ) : (
          <div className="space-y-2">
            {recentContacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#050505] border border-emerald-500/5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate">
                      {c.name}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                        c.status === 'new'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : c.status === 'read'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{c.email}</div>
                </div>
                <div className="text-xs text-gray-600 ml-3 shrink-0">
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

/* ─── 2. Hero Content Tab ────────────────────────────────────── */
function HeroTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        hero_badge: content.hero_badge || '',
        hero_headline: content.hero_headline || '',
        hero_subheadline: content.hero_subheadline || '',
        hero_cta: content.hero_cta || '',
        hero_cta_secondary: content.hero_cta_secondary || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    if (!form.hero_badge || !form.hero_headline) {
      showToast('Badge and Headline are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Hero content saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Hero Section Content">
        <FormInput
          label="Badge Text"
          value={form.hero_badge || ''}
          onChange={(v) => setForm((f) => ({ ...f, hero_badge: v }))}
          required
        />
        <FormTextarea
          label="Headline"
          value={form.hero_headline || ''}
          onChange={(v) => setForm((f) => ({ ...f, hero_headline: v }))}
          required
          rows={3}
        />
        <FormTextarea
          label="Sub-headline"
          value={form.hero_subheadline || ''}
          onChange={(v) => setForm((f) => ({ ...f, hero_subheadline: v }))}
          rows={3}
        />
        <FormInput
          label="Primary CTA"
          value={form.hero_cta || ''}
          onChange={(v) => setForm((f) => ({ ...f, hero_cta: v }))}
        />
        <FormInput
          label="Secondary CTA"
          value={form.hero_cta_secondary || ''}
          onChange={(v) => setForm((f) => ({ ...f, hero_cta_secondary: v }))}
        />
      </SectionCard>
      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}

/* ─── 3. Problem Section Tab ─────────────────────────────────── */
function ProblemTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        problem_title: content.problem_title || '',
        problem_card_1_title: content.problem_card_1_title || '',
        problem_card_1_desc: content.problem_card_1_desc || '',
        problem_card_2_title: content.problem_card_2_title || '',
        problem_card_2_desc: content.problem_card_2_desc || '',
        problem_card_3_title: content.problem_card_3_title || '',
        problem_card_3_desc: content.problem_card_3_desc || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Problem section saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Section Title">
        <FormInput
          label="Title"
          value={form.problem_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_title: v }))}
        />
      </SectionCard>

      <SectionCard title="Card 1">
        <FormInput
          label="Title"
          value={form.problem_card_1_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_1_title: v }))}
        />
        <FormTextarea
          label="Description"
          value={form.problem_card_1_desc || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_1_desc: v }))}
        />
      </SectionCard>

      <SectionCard title="Card 2">
        <FormInput
          label="Title"
          value={form.problem_card_2_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_2_title: v }))}
        />
        <FormTextarea
          label="Description"
          value={form.problem_card_2_desc || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_2_desc: v }))}
        />
      </SectionCard>

      <SectionCard title="Card 3">
        <FormInput
          label="Title"
          value={form.problem_card_3_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_3_title: v }))}
        />
        <FormTextarea
          label="Description"
          value={form.problem_card_3_desc || ''}
          onChange={(v) => setForm((f) => ({ ...f, problem_card_3_desc: v }))}
        />
      </SectionCard>

      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}

/* ─── 4. Solution Section Tab ────────────────────────────────── */
function SolutionTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        solution_title: content.solution_title || '',
        solution_step_1_title: content.solution_step_1_title || '',
        solution_step_1_desc: content.solution_step_1_desc || '',
        solution_step_1_detail: content.solution_step_1_detail || '',
        solution_step_2_title: content.solution_step_2_title || '',
        solution_step_2_desc: content.solution_step_2_desc || '',
        solution_step_2_detail: content.solution_step_2_detail || '',
        solution_step_3_title: content.solution_step_3_title || '',
        solution_step_3_desc: content.solution_step_3_desc || '',
        solution_step_3_detail: content.solution_step_3_detail || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Solution section saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Section Title">
        <FormInput
          label="Title"
          value={form.solution_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, solution_title: v }))}
        />
      </SectionCard>

      {[1, 2, 3].map((step) => (
        <SectionCard key={step} title={`Step ${step}`}>
          <FormInput
            label="Title"
            value={form[`solution_step_${step}_title`] || ''}
            onChange={(v) => setForm((f) => ({ ...f, [`solution_step_${step}_title`]: v }))}
          />
          <FormTextarea
            label="Description"
            value={form[`solution_step_${step}_desc`] || ''}
            onChange={(v) => setForm((f) => ({ ...f, [`solution_step_${step}_desc`]: v }))}
          />
          <FormInput
            label="Detail"
            value={form[`solution_step_${step}_detail`] || ''}
            onChange={(v) => setForm((f) => ({ ...f, [`solution_step_${step}_detail`]: v }))}
          />
        </SectionCard>
      ))}

      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}

/* ─── 5. Services Manager Tab ────────────────────────────────── */
function ServicesTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'MessageSquare',
    features: '',
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch {
      showToast('Failed to fetch services', 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices();
  }, [fetchServices]);

  const resetForm = () => {
    setForm({ title: '', description: '', icon: 'MessageSquare', features: '', order: 0, active: true });
    setEditing(null);
    setIsCreating(false);
  };

  const startEdit = (service: Service) => {
    setEditing(service);
    setIsCreating(true);
    let featuresArr: string[] = [];
    try {
      featuresArr = JSON.parse(service.features);
    } catch {
      featuresArr = service.features.split(',');
    }
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: featuresArr.join(', '),
      order: service.order,
      active: service.active,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      showToast('Title and description are required', 'error');
      return;
    }
    setSaving(true);
    const featuresJson = JSON.stringify(
      form.features.split(',').map((f) => f.trim()).filter(Boolean)
    );
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      title: form.title,
      description: form.description,
      icon: form.icon,
      features: featuresJson,
      order: form.order,
      active: form.active,
    };

    try {
      const res = await fetch('/api/services', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast(editing ? 'Service updated!' : 'Service created!');
        resetForm();
        fetchServices();
      } else {
        showToast('Failed to save service', 'error');
      }
    } catch {
      showToast('Failed to save service', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Service deleted!');
        fetchServices();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Add button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      )}

      {/* Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <SectionCard title={editing ? 'Edit Service' : 'New Service'}>
              <FormInput
                label="Title"
                value={form.title}
                onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                required
              />
              <FormTextarea
                label="Description"
                value={form.description}
                onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                required
              />
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Icon
                </label>
                <div className="relative">
                  <select
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-emerald-500/10 text-white text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <FormInput
                label="Features (comma-separated)"
                value={form.features}
                onChange={(v) => setForm((f) => ({ ...f, features: v }))}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
              <FormInput
                label="Order"
                value={String(form.order)}
                onChange={(v) => setForm((f) => ({ ...f, order: parseInt(v) || 0 }))}
                type="number"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                  className="flex items-center gap-2"
                >
                  {form.active ? (
                    <ToggleRight className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-300">
                    {form.active ? 'Active' : 'Inactive'}
                  </span>
                </button>
              </div>
            </SectionCard>
            <div className="flex gap-3 mt-4">
              <SaveButton
                onSave={handleSave}
                loading={saving}
                label={editing ? 'Update Service' : 'Create Service'}
              />
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm font-medium hover:text-white hover:border-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="space-y-2">
        {services.length === 0 && <EmptyState message="No services yet" />}
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-emerald-500/5 hover:border-emerald-500/15 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{service.title}</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    service.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}
                >
                  {service.active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">#{service.order}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{service.description}</p>
            </div>
            <div className="flex items-center gap-1 ml-3 shrink-0">
              <EditButton onClick={() => startEdit(service)} />
              <DeleteButton onClick={() => handleDelete(service.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 6. Case Study / Metrics Tab ────────────────────────────── */
function CaseStudyTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        casestudy_title: content.casestudy_title || '',
        casestudy_metric_1_value: content.casestudy_metric_1_value || '',
        casestudy_metric_1_suffix: content.casestudy_metric_1_suffix || '',
        casestudy_metric_1_label: content.casestudy_metric_1_label || '',
        casestudy_metric_1_detail: content.casestudy_metric_1_detail || '',
        casestudy_metric_2_value: content.casestudy_metric_2_value || '',
        casestudy_metric_2_suffix: content.casestudy_metric_2_suffix || '',
        casestudy_metric_2_label: content.casestudy_metric_2_label || '',
        casestudy_metric_2_detail: content.casestudy_metric_2_detail || '',
        casestudy_metric_3_value: content.casestudy_metric_3_value || '',
        casestudy_metric_3_suffix: content.casestudy_metric_3_suffix || '',
        casestudy_metric_3_prefix: content.casestudy_metric_3_prefix || '',
        casestudy_metric_3_label: content.casestudy_metric_3_label || '',
        casestudy_metric_3_detail: content.casestudy_metric_3_detail || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Case study saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Case Study Title">
        <FormInput
          label="Title"
          value={form.casestudy_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, casestudy_title: v }))}
        />
      </SectionCard>

      <SectionCard title="Metric 1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Value" value={form.casestudy_metric_1_value || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_1_value: v }))} />
          <FormInput label="Suffix" value={form.casestudy_metric_1_suffix || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_1_suffix: v }))} />
          <FormInput label="Label" value={form.casestudy_metric_1_label || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_1_label: v }))} />
          <FormInput label="Detail" value={form.casestudy_metric_1_detail || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_1_detail: v }))} />
        </div>
      </SectionCard>

      <SectionCard title="Metric 2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Value" value={form.casestudy_metric_2_value || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_2_value: v }))} />
          <FormInput label="Suffix" value={form.casestudy_metric_2_suffix || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_2_suffix: v }))} />
          <FormInput label="Label" value={form.casestudy_metric_2_label || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_2_label: v }))} />
          <FormInput label="Detail" value={form.casestudy_metric_2_detail || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_2_detail: v }))} />
        </div>
      </SectionCard>

      <SectionCard title="Metric 3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Value" value={form.casestudy_metric_3_value || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_3_value: v }))} />
          <FormInput label="Prefix" value={form.casestudy_metric_3_prefix || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_3_prefix: v }))} />
          <FormInput label="Suffix" value={form.casestudy_metric_3_suffix || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_3_suffix: v }))} />
          <FormInput label="Label" value={form.casestudy_metric_3_label || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_3_label: v }))} />
        </div>
        <FormInput label="Detail" value={form.casestudy_metric_3_detail || ''} onChange={(v) => setForm((f) => ({ ...f, casestudy_metric_3_detail: v }))} />
      </SectionCard>

      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}

/* ─── 7. Testimonials Manager Tab ────────────────────────────── */
function TestimonialsTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/testimonials?all=true');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch {
      showToast('Failed to fetch testimonials', 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTestimonials();
  }, [fetchTestimonials]);

  const resetForm = () => {
    setForm({ name: '', role: '', company: '', content: '', rating: 5, order: 0, active: true });
    setEditing(null);
    setIsCreating(false);
  };

  const startEdit = (t: Testimonial) => {
    setEditing(t);
    setIsCreating(true);
    setForm({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      rating: t.rating,
      order: t.order,
      active: t.active,
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.content) {
      showToast('Name and content are required', 'error');
      return;
    }
    setSaving(true);
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      name: form.name,
      role: form.role,
      company: form.company,
      content: form.content,
      rating: form.rating,
      order: form.order,
      active: form.active,
    };

    try {
      const res = await fetch('/api/testimonials', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast(editing ? 'Testimonial updated!' : 'Testimonial created!');
        resetForm();
        fetchTestimonials();
      } else {
        showToast('Failed to save testimonial', 'error');
      }
    } catch {
      showToast('Failed to save testimonial', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Testimonial deleted!');
        fetchTestimonials();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      )}

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <SectionCard title={editing ? 'Edit Testimonial' : 'New Testimonial'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                <FormInput label="Role" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} />
                <FormInput label="Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setForm((f) => ({ ...f, rating: r }))}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            r <= form.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <FormTextarea label="Content" value={form.content} onChange={(v) => setForm((f) => ({ ...f, content: v }))} required rows={3} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Order" value={String(form.order)} onChange={(v) => setForm((f) => ({ ...f, order: parseInt(v) || 0 }))} type="number" />
                <div className="flex items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                    className="flex items-center gap-2"
                  >
                    {form.active ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-500" />
                    )}
                    <span className="text-sm text-gray-300">{form.active ? 'Active' : 'Inactive'}</span>
                  </button>
                </div>
              </div>
            </SectionCard>
            <div className="flex gap-3 mt-4">
              <SaveButton onSave={handleSave} loading={saving} label={editing ? 'Update Testimonial' : 'Create Testimonial'} />
              <button onClick={resetForm} className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm font-medium hover:text-white hover:border-gray-600 transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {testimonials.length === 0 && <EmptyState message="No testimonials yet" />}
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-emerald-500/5 hover:border-emerald-500/15 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{t.name}</span>
                <span className="text-xs text-gray-500">{t.role} at {t.company}</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    t.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}
                >
                  {t.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{t.content}</p>
            </div>
            <div className="flex items-center gap-1 ml-3 shrink-0">
              <EditButton onClick={() => startEdit(t)} />
              <DeleteButton onClick={() => handleDelete(t.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 8. FAQ Manager Tab ─────────────────────────────────────── */
function FaqsTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch('/api/faqs?all=true');
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch {
      showToast('Failed to fetch FAQs', 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFaqs();
  }, [fetchFaqs]);

  const resetForm = () => {
    setForm({ question: '', answer: '', order: 0, active: true });
    setEditing(null);
    setIsCreating(false);
  };

  const startEdit = (faq: FAQ) => {
    setEditing(faq);
    setIsCreating(true);
    setForm({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      active: faq.active,
    });
  };

  const handleSave = async () => {
    if (!form.question || !form.answer) {
      showToast('Question and answer are required', 'error');
      return;
    }
    setSaving(true);
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      question: form.question,
      answer: form.answer,
      order: form.order,
      active: form.active,
    };

    try {
      const res = await fetch('/api/faqs', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast(editing ? 'FAQ updated!' : 'FAQ created!');
        resetForm();
        fetchFaqs();
      } else {
        showToast('Failed to save FAQ', 'error');
      }
    } catch {
      showToast('Failed to save FAQ', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('FAQ deleted!');
        fetchFaqs();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      )}

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <SectionCard title={editing ? 'Edit FAQ' : 'New FAQ'}>
              <FormInput label="Question" value={form.question} onChange={(v) => setForm((f) => ({ ...f, question: v }))} required />
              <FormTextarea label="Answer" value={form.answer} onChange={(v) => setForm((f) => ({ ...f, answer: v }))} required rows={4} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Order" value={String(form.order)} onChange={(v) => setForm((f) => ({ ...f, order: parseInt(v) || 0 }))} type="number" />
                <div className="flex items-center gap-3 pt-5">
                  <button type="button" onClick={() => setForm((f) => ({ ...f, active: !f.active }))} className="flex items-center gap-2">
                    {form.active ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6 text-gray-500" />}
                    <span className="text-sm text-gray-300">{form.active ? 'Active' : 'Inactive'}</span>
                  </button>
                </div>
              </div>
            </SectionCard>
            <div className="flex gap-3 mt-4">
              <SaveButton onSave={handleSave} loading={saving} label={editing ? 'Update FAQ' : 'Create FAQ'} />
              <button onClick={resetForm} className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm font-medium hover:text-white hover:border-gray-600 transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {faqs.length === 0 && <EmptyState message="No FAQs yet" />}
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="flex items-start justify-between p-4 rounded-xl bg-[#0a0a0a] border border-emerald-500/5 hover:border-emerald-500/15 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{faq.question}</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    faq.active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}
                >
                  {faq.active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">#{faq.order}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-1 ml-3 shrink-0">
              <EditButton onClick={() => startEdit(faq)} />
              <DeleteButton onClick={() => handleDelete(faq.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 9. Contact Submissions Tab ─────────────────────────────── */
function ContactsTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch {
      showToast('Failed to fetch contacts', 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast('Status updated!');
        fetchContacts();
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
    setUpdating(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact submission?')) return;
    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Contact deleted!');
        fetchContacts();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  const statusColors: Record<string, string> = {
    new: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    read: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    contacted: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{contacts.length} submissions</span>
        <button
          onClick={fetchContacts}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {contacts.length === 0 ? (
        <EmptyState message="No contact submissions yet" />
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-500/10">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 hidden sm:table-cell">Phone</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 hidden md:table-cell">Company</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 hidden lg:table-cell">Message</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 hidden sm:table-cell">Date</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-emerald-500/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-2 text-white font-medium whitespace-nowrap">{c.name}</td>
                  <td className="py-3 px-2 text-gray-400 whitespace-nowrap">{c.email}</td>
                  <td className="py-3 px-2 text-gray-400 hidden sm:table-cell">{c.phone || '—'}</td>
                  <td className="py-3 px-2 text-gray-400 hidden md:table-cell">{c.company || '—'}</td>
                  <td className="py-3 px-2 text-gray-500 hidden lg:table-cell max-w-[200px] truncate">{c.message}</td>
                  <td className="py-3 px-2">
                    <div className="relative inline-block">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        disabled={updating === c.id}
                        className={`text-[11px] font-medium px-2 py-1 rounded-full border appearance-none cursor-pointer pr-5 ${
                          statusColors[c.status] || statusColors.new
                        } bg-transparent disabled:opacity-50`}
                      >
                        <option value="new">new</option>
                        <option value="read">read</option>
                        <option value="contacted">contacted</option>
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-500 text-xs whitespace-nowrap hidden sm:table-cell">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2">
                    <DeleteButton onClick={() => handleDelete(c.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── 10. CTA & Footer Tab ───────────────────────────────────── */
function CtaTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        cta_headline: content.cta_headline || '',
        cta_subtext: content.cta_subtext || '',
        cta_button: content.cta_button || '',
        footer_copyright: content.footer_copyright || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('CTA & Footer saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Call to Action">
        <FormInput
          label="CTA Headline"
          value={form.cta_headline || ''}
          onChange={(v) => setForm((f) => ({ ...f, cta_headline: v }))}
        />
        <FormTextarea
          label="CTA Subtext"
          value={form.cta_subtext || ''}
          onChange={(v) => setForm((f) => ({ ...f, cta_subtext: v }))}
          rows={3}
        />
        <FormInput
          label="CTA Button Text"
          value={form.cta_button || ''}
          onChange={(v) => setForm((f) => ({ ...f, cta_button: v }))}
        />
      </SectionCard>

      <SectionCard title="Footer">
        <FormInput
          label="Copyright Text"
          value={form.footer_copyright || ''}
          onChange={(v) => setForm((f) => ({ ...f, footer_copyright: v }))}
        />
      </SectionCard>

      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}

/* ─── 11. Pricing Section Tab ────────────────────────────────── */
function PricingTab({ showToast }: { showToast: (m: string, t?: 'success' | 'error') => void }) {
  const { content, loading, refetch } = useContent();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        pricing_title: content.pricing_title || '',
        pricing_subtitle: content.pricing_subtitle || '',
      });
    }
  }, [content, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Pricing section saved!');
        refetch();
      } else {
        showToast('Failed to save', 'error');
      }
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionCard title="Pricing Section">
        <FormInput
          label="Section Title"
          value={form.pricing_title || ''}
          onChange={(v) => setForm((f) => ({ ...f, pricing_title: v }))}
        />
        <FormTextarea
          label="Section Subtitle"
          value={form.pricing_subtitle || ''}
          onChange={(v) => setForm((f) => ({ ...f, pricing_subtitle: v }))}
          rows={2}
        />
      </SectionCard>

      <SaveButton onSave={handleSave} loading={saving} />
    </div>
  );
}
