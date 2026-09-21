import React, { useState, useMemo, useEffect } from "react";
import SEOContent from "./pages/SEOContent";
const geeskitLogo = "/geeskit-logo.jpg";

// Types
type View = "home" | "tool-job-profit" | "tool-hourly-rate" | "tool-interruption" | "about" | "answers";

interface ToolDef {
  id: View;
  number: string;
  name: string;
  short: string;
  desc: string;
  category: string;
  longDesc: string;
}

const ROUTES: Record<View, string> = {
  home: "/",
  "tool-job-profit": "/tools/job-profit",
  "tool-hourly-rate": "/tools/hourly-rate",
  "tool-interruption": "/tools/interruption-cost",
  about: "/about",
  answers: "/answers",
};

const ROUTE_VIEWS: Record<string, View> = Object.fromEntries(
  Object.entries(ROUTES).map(([key, value]) => [value, key as View]),
);

function getViewFromPath(pathname: string): View {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
  return ROUTE_VIEWS[normalized] || "home";
}

function getPathForView(view: View) {
  return ROUTES[view] || "/";
}

const METADATA: Record<View, { title: string; description: string; canonical: string }> = {
  home: {
    title: "GEESKIT — Tools, Wisdom & Experiments",
    description: "Tools, practical knowledge, experiments and systems for making the next decision easier.",
    canonical: "https://geeskit.com/",
  },
  "tool-job-profit": {
    title: "Job Profit Calculator — Calculate Your Real Job Profit | GEESKIT",
    description:
      "GEESKIT's Job Profit Calculator helps you calculate real job profit by considering revenue, labor, materials, expenses, and pricing.",
    canonical: "https://geeskit.com/tools/job-profit",
  },
  "tool-hourly-rate": {
    title: "Hourly Rate Calculator — Know What to Charge | GEESKIT",
    description:
      "GEESKIT's Hourly Rate Calculator helps you estimate a sustainable rate based on income goals, expenses, taxes, and billable hours.",
    canonical: "https://geeskit.com/tools/hourly-rate",
  },
  "tool-interruption": {
    title: "Employee Interruption Cost Calculator | GEESKIT",
    description:
      "GEESKIT's Employee Interruption Cost Calculator helps you quantify time lost and annual employee interruption costs.",
    canonical: "https://geeskit.com/tools/interruption-cost",
  },
  answers: {
    title: "Answers — GEESKIT",
    description: "Practical answers to money, work, and business questions from GEESKIT.",
    canonical: "https://geeskit.com/answers",
  },
  about: {
    title: "About GEESKIT — Make the Next Decision Easier",
    description: "Learn about GEESKIT and how it helps people make practical business and work decisions with useful tools.",
    canonical: "https://geeskit.com/about",
  },
};

const TOOLS: ToolDef[] = [
  {
    id: "tool-job-profit",
    number: "01",
    name: "JOB PROFIT CALCULATOR",
    short: "Job profit",
    desc: "Know if a job actually made money. Clear profit, margin, and effective hourly.",
    category: "MONEY & BUSINESS",
    longDesc: "Calculate real profit after materials, labor, overhead and taxes.",
  },
  {
    id: "tool-hourly-rate",
    number: "02",
    name: "HOURLY RATE CALCULATOR",
    short: "Hourly rate",
    desc: "Price your time to cover salary, expenses, profit and taxes with real billable hours.",
    category: "MONEY & BUSINESS",
    longDesc: "Build a sustainable rate from desired income and actual capacity.",
  },
  {
    id: "tool-interruption",
    number: "03",
    name: "INTERRUPTION COST CALCULATOR",
    short: "Interruption cost",
    desc: "Translate small daily interruptions into annual cost, hours lost and FTE.",
    category: "WORK & PRODUCTIVITY",
    longDesc: "Make invisible productivity loss visible and actionable.",
  },
];

const CATEGORIES = [
  { id: "MONEY & BUSINESS", icon: "◫", desc: "Pricing, profit, cashflow" },
  { id: "WORK & PRODUCTIVITY", icon: "⬔", desc: "Time, focus, capacity" },
  { id: "FILES & TEXT", icon: "⬙", desc: "Coming soon", soon: true },
  { id: "PLANNING & DECISIONS", icon: "⬗", desc: "Coming soon", soon: true },
  { id: "EVERYDAY UTILITIES", icon: "⬖", desc: "Coming soon", soon: true },
];

const clipStyle: React.CSSProperties = {
  clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
};
const clipSmall: React.CSSProperties = {
  clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
};

function formatCurrency(n: number) {
  if (!isFinite(n)) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatPercent(n: number) {
  if (!isFinite(n)) return "0.0%";
  return `${n.toFixed(1)}%`;
}
function formatHours(n: number) {
  if (!isFinite(n)) return "0h";
  if (n < 1) return `${Math.round(n * 60)}m`;
  return `${n.toFixed(1)}h`;
}

// Header
function Header({ view, setView, onSearchFocus, onAction }: { view: View; setView: (v: View) => void; onSearchFocus: () => void; onAction?: (msg: string)=>void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 h-[64px] flex items-center justify-between">
        <button onClick={() => { setView("home"); onAction?.("GEESKIT — HOME"); window.scrollTo({top:0,behavior:"smooth"}); }} className="flex items-center gap-3 group">
          <div className="h-7 w-7 overflow-hidden bg-black border border-white/10 flex items-center justify-center" style={clipSmall}>
            <img src={geeskitLogo} alt="GEESKIT" className="h-full w-full object-contain" />
          </div>
          <span className="text-[14px] tracking-[0.22em] font-semibold text-[#F5F5F7] group-hover:text-white">GEESKIT</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "TOOLS", target: "tools-section" },
            { label: "WISDOM", target: "wisdom-section" },
            { label: "EXPERIMENTS", target: "experiments-section" },
            { label: "PRODUCTS", target: "products-section" },
          ].map((item) => (
            <button key={item.label} onClick={() => { setView("home"); setTimeout(() => document.getElementById(item.target)?.scrollIntoView({behavior:"smooth"}), 20); onAction?.(`OPEN ${item.label}`); }} className="relative text-[11px] tracking-[0.18em] font-medium py-2 text-[#A1A1AA] hover:text-white transition-colors">
              {item.label}
            </button>
          ))
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={onSearchFocus} className="hidden md:flex h-8 px-3 items-center gap-2 border border-white/[0.08] bg-white/[0.03] text-[10px] tracking-[0.15em] text-[#A1A1AA] hover:text-white transition-colors" style={clipSmall}>
            <span className="w-3 h-3 border border-current rounded-[1px] inline-block" /> SEARCH
          </button>
          <div className="hidden md:block text-[10px] tracking-[0.15em] text-[#71717A] border border-white/10 px-2 py-1">EN</div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] border border-white/10 bg-white/[0.02]">
            <span className={`w-4 h-[2px] bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-4 h-[2px] bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#08080C]">
          <div className="px-5 py-6 space-y-4">
            {[
              { label: "TOOLS", target: "tools-section" },
              { label: "WISDOM", target: "wisdom-section" },
              { label: "EXPERIMENTS", target: "experiments-section" },
              { label: "PRODUCTS", target: "products-section" },
            ].map((l) => (
              <button key={l.label} onClick={() => { setView("home"); setMobileOpen(false); setTimeout(() => document.getElementById(l.target)?.scrollIntoView({behavior:"smooth"}), 20); onAction?.(`OPEN ${l.label}`); }} className="block text-left text-[13px] tracking-[0.18em] text-[#F5F5F7] py-2 hover:text-white">
                {l.label}
              </button>
            ))
            <div className="pt-4 text-[10px] tracking-[0.2em] text-[#71717A]">MAKE THE NEXT DECISION EASIER — GEESKIT.COM</div>
          </div>
        </div>
      )}
    </header>
  );
}

function ValueStrip() {
  const items = ["100% FREE", "PRACTICAL", "INSTANT ANSWERS", "BUILT FOR REAL USE"];
  return (
    <div className="border-y border-white/[0.06] bg-[#08080C]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((it) => (
            <div key={it} className="flex items-center gap-3 py-4 border-r last:border-r-0 border-white/[0.06] px-1">
              <span className="w-6 h-[2px] bg-[#E11D33]" />
              <span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">{it}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Input component
function Field({ label, value, onChange, error, type = "number", min, max, step = "any", placeholder, suffix }: any) {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-[10px] tracking-[0.18em] text-[#A1A1AA] uppercase">
        <span>{label}</span>
        {suffix && <span className="text-[#71717A]">{suffix}</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`w-full h-[46px] bg-[#0E0E13] border px-4 text-[14px] text-[#F5F5F7] placeholder:text-[#52525B] focus:outline-none focus:border-[#E11D33]/60 focus:bg-[#12121A] transition-all ${error ? "border-[#E11D33]/60" : "border-white/[0.08]"}`}
          style={clipSmall}
        />
        {error && <div className="absolute -bottom-1 right-2 text-[9px] tracking-[0.1em] bg-[#E11D33] text-white px-1.5 py-0.5">!</div>}
      </div>
      {error && <div className="text-[11px] text-[#E11D33]">{error}</div>}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="h-7 px-2.5 text-[10px] tracking-[0.14em] border border-white/10 bg-white/[0.04] text-[#A1A1AA] hover:text-white hover:border-white/20 transition-colors"
      style={clipSmall}
    >
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}

export default function App() {
  const [view, setView] = useState<View>(() => getViewFromPath(window.location.pathname));
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const setPathView = (nextView: View) => {
    const nextPath = getPathForView(nextView);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setView(nextView);
  };

  useEffect(() => {
    const onPopState = () => {
      setView(getViewFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const metadata = METADATA[view];
    if (!metadata) return;

    document.title = metadata.title;

    let descriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", metadata.description);

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", metadata.canonical);
  }, [view]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(()=>setToast(null), 1800); };
  const navigate = (v: View) => {
    setPathView(v);
    showToast(v === "home" ? "GEESKIT — HOME" : `OPEN ${v.toUpperCase()}`);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  // Tool 1 state
  const [job, setJob] = useState({ revenue: "5000", materials: "1200", laborHours: "24", laborRate: "45", overhead: "400", taxPercent: "25", targetMargin: "30" });
  // Tool 2
  const [hourly, setHourly] = useState({ salary: "75000", expenses: "12000", profitBuffer: "15000", billable: "25", weeks: "46", nonBillable: "25", tax: "28" });
  // Tool 3
  const [interrupt, setInterrupt] = useState({ employees: "12", wage: "38", perDay: "4", minutes: "12" });

  const filteredTools = useMemo(() => {
    const q = search.toLowerCase().trim();
    return TOOLS.filter((t) => {
      const matchesSearch = !q || `${t.name} ${t.desc} ${t.category} ${t.short}`.toLowerCase().includes(q);
      const matchesCat = !categoryFilter || t.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [search, categoryFilter]);

  const scrollToTools = () => {
    setPathView("home");
    setTimeout(() => document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // Calculations Tool 1
  const jobCalc = useMemo(() => {
    const rev = parseFloat(job.revenue) || 0;
    const mat = parseFloat(job.materials) || 0;
    const hrs = parseFloat(job.laborHours) || 0;
    const rate = parseFloat(job.laborRate) || 0;
    const over = parseFloat(job.overhead) || 0;
    const taxP = parseFloat(job.taxPercent) || 0;
    const target = parseFloat(job.targetMargin) || 0;
    const laborCost = hrs * rate;
    const totalCost = mat + laborCost + over;
    const gross = rev - totalCost;
    const taxAmt = gross > 0 ? gross * (taxP / 100) : 0;
    const net = gross - taxAmt;
    const margin = rev > 0 ? (net / rev) * 100 : 0;
    const effHourly = hrs > 0 ? net / hrs : 0;

    let required = 0;
    if (target >= 0 && target < 100 && taxP >= 0 && taxP < 100) {
      const taxRate = taxP / 100;
      const denominator = 1 - (target / 100) / (1 - taxRate);
      if (denominator > 0) {
        required = totalCost / denominator;
      }
    }

    const errors: any = {};
    if (rev < 0) errors.revenue = "Must be >= 0";
    if (mat < 0) errors.materials = "Must be >= 0";
    if (hrs < 0) errors.laborHours = "Must be >= 0";
    if (rate < 0) errors.laborRate = "Must be >= 0";
    if (over < 0) errors.overhead = "Must be >= 0";
    if (taxP < 0 || taxP > 100) errors.taxPercent = "0-100";
    if (target < 0 || target > 100) errors.targetMargin = "0-100";
    return { rev, mat, hrs, rate, over, taxP, target, laborCost, totalCost, gross, taxAmt, net, margin, effHourly, required, errors };
  }, [job]);

  const hourlyCalc = useMemo(() => {
    const salary = parseFloat(hourly.salary) || 0;
    const expenses = parseFloat(hourly.expenses) || 0;
    const buffer = parseFloat(hourly.profitBuffer) || 0;
    const billable = parseFloat(hourly.billable) || 0;
    const weeks = parseFloat(hourly.weeks) || 0;
    const nonBill = parseFloat(hourly.nonBillable) || 0;
    const taxP = parseFloat(hourly.tax) || 0;
    const realPerWeek = billable * (1 - nonBill / 100);
    const annualBillable = realPerWeek * weeks;
    const preTax = salary + expenses + buffer;
    const totalNeeded = taxP < 100 && taxP >= 0 ? preTax / (1 - taxP / 100) : preTax;
    const hourlyRate = annualBillable > 0 ? totalNeeded / annualBillable : 0;
    const daily = hourlyRate * (realPerWeek / 5);
    const weekly = hourlyRate * realPerWeek;
    const monthly = totalNeeded / 12;
    const errors: any = {};
    if (salary < 0) errors.salary = ">=0";
    if (expenses < 0) errors.expenses = ">=0";
    if (buffer < 0) errors.profitBuffer = ">=0";
    if (billable <= 0) errors.billable = ">0 required";
    if (weeks < 1 || weeks > 52) errors.weeks = "1-52";
    if (nonBill < 0 || nonBill > 90) errors.nonBillable = "0-90";
    if (taxP < 0 || taxP > 80) errors.tax = "0-80";
    return { salary, expenses, buffer, billable, weeks, nonBill, taxP, realPerWeek, annualBillable, preTax, totalNeeded, hourlyRate, daily, weekly, monthly, errors };
  }, [hourly]);

  const interruptCalc = useMemo(() => {
    const employees = parseInt(interrupt.employees) || 0;
    const wage = parseFloat(interrupt.wage) || 0;
    const perDay = parseFloat(interrupt.perDay) || 0;
    const minutes = parseFloat(interrupt.minutes) || 0;
    const hrsPerInt = minutes / 60;
    const dailyPerEmp = perDay * hrsPerInt;
    const dailyTotal = dailyPerEmp * employees;
    const dailyCost = dailyTotal * wage;
    const annualDays = 260;
    const annualCost = dailyCost * annualDays;
    const annualHours = dailyTotal * annualDays;
    const fte = annualHours / 2080;
    const weeklyCost = dailyCost * 5;
    const errors: any = {};
    if (employees < 1) errors.employees = "Min 1";
    if (wage < 0) errors.wage = ">=0";
    if (perDay < 0) errors.perDay = ">=0";
    if (minutes < 0) errors.minutes = ">=0";
    return { employees, wage, perDay, minutes, hrsPerInt, dailyPerEmp, dailyTotal, dailyCost, annualCost, annualHours, fte, weeklyCost, errors };
  }, [interrupt]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F7] selection:bg-[#E11D33]/30 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: Inter, system-ui, sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .clip { clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px); }
        .clip-sm { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
      `}</style>

      {/* Background architectural lines */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[70%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-[18%] left-0 right-0 h-px bg-white" />
      </div>

      <Header view={view} setView={navigate} onSearchFocus={scrollToTools} onAction={showToast} />
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <div className="bg-[#E11D33] text-white text-[11px] tracking-[0.18em] px-5 py-2.5 border border-white/20 shadow-2xl" style={clipSmall}>
            {toast}
          </div>
        </div>
      )}

      {/* Main */}
      <main className="relative z-10">
        {view === "home" && (
          <>
            {/* GEESKIT TERRITORY */}
            <section className="mx-auto max-w-[1280px] px-5 md:px-8 pt-14 md:pt-24 pb-12 md:pb-20">
              <div className="max-w-[1040px]">
                <div className="flex items-center gap-3 mb-7">
                  <span className="w-10 h-px bg-[#E11D33]" />
                  <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA]">GEESKIT / DIGITAL TERRITORY</span>
                </div>
                <h1 className="text-[42px] md:text-[78px] leading-[0.88] tracking-[-0.04em] font-bold">
                  <span className="block text-white">USEFUL THINGS.</span>
                  <span className="block text-[#E11D33]">STRANGE THINGS.</span>
                  <span className="block text-white">SMART THINGS.</span>
                </h1>
                <p className="mt-8 max-w-[650px] text-[16px] md:text-[19px] leading-[1.55] text-[#A1A1AA]">
                  Tools, practical knowledge, experiments and systems for making the next decision easier.
                </p>
              </div>

              <div className="mt-12 border-y border-white/[0.07] bg-[#08080C]">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {[
                    ["TOOLS","USE SOMETHING"],
                    ["WISDOM","LEARN SOMETHING"],
                    ["EXPERIMENTS","EXPLORE SOMETHING"],
                    ["PRODUCTS","BUILD WITH SOMETHING"],
                  ].map(([label,sub], i) => (
                    <button
                      key={label}
                      onClick={() => {
                        const id = label === "TOOLS" ? "tools-section" : label === "PRODUCTS" ? "products-section" : label === "WISDOM" ? "wisdom-section" : "experiments-section";
                        document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
                      }}
                      className="text-left p-5 md:p-6 border-r border-b md:border-b-0 border-white/[0.07] hover:bg-white/[0.025] transition-colors"
                    >
                      <div className="text-[11px] tracking-[0.22em] text-[#E11D33]">{String(i+1).padStart(2,"0")}</div>
                      <div className="mt-3 text-[15px] tracking-[0.12em] font-semibold text-white">{label}</div>
                      <div className="mt-1 text-[10px] tracking-[0.16em] text-[#71717A]">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <ValueStrip />

            {/* TOOLS */}
            <section id="tools-section" className="mx-auto max-w-[1280px] px-5 md:px-8 pt-16 md:pt-24 scroll-mt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3"><span className="w-7 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.25em] text-[#71717A]">01 / TOOLS</span></div>
                  <h2 className="text-[30px] md:text-[44px] font-bold tracking-[-0.03em] text-white">USEFUL, NOW.</h2>
                  <p className="mt-3 text-[14px] text-[#A1A1AA] max-w-[560px]">Small tools that turn messy questions into clear numbers, decisions or next actions.</p>
                </div>
                <div className="w-full md:w-[360px]">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tools..."
                    className="w-full h-[46px] bg-[#0E0E13] border border-white/[0.08] px-4 text-[13px] text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#E11D33]/50"
                    style={clipSmall}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-7">
                <button onClick={() => setCategoryFilter(null)} className={`h-8 px-3 text-[10px] tracking-[0.14em] border ${!categoryFilter ? "border-[#E11D33]/50 text-white bg-[#E11D33]/10" : "border-white/10 text-[#71717A]"}`}>ALL</button>
                {CATEGORIES.filter(c => !c.soon || TOOLS.some(t => t.category === c.id)).map(c => (
                  <button key={c.id} onClick={() => setCategoryFilter(c.id)} className={`h-8 px-3 text-[10px] tracking-[0.14em] border ${categoryFilter === c.id ? "border-[#E11D33]/50 text-white bg-[#E11D33]/10" : "border-white/10 text-[#71717A]"}`}>{c.id}</button>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-8">
                {filteredTools.map((tool) => (
                  <button key={tool.id} onClick={() => navigate(tool.id)} className="group text-left border border-white/[0.07] bg-[#0A0A0E] p-6 hover:border-[#E11D33]/35 hover:bg-[#0D0D12] transition-all" style={clipStyle}>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] tracking-[0.2em] text-[#E11D33] mono">{tool.number}</span>
                      <span className="text-[9px] tracking-[0.15em] text-[#52525B]">{tool.category}</span>
                    </div>
                    <h3 className="mt-12 text-[17px] font-semibold tracking-[0.03em] text-white">{tool.name}</h3>
                    <p className="mt-3 text-[13px] leading-[1.55] text-[#A1A1AA]">{tool.desc}</p>
                    <div className="mt-7 text-[10px] tracking-[0.2em] text-[#E11D33]">OPEN TOOL →</div>
                  </button>
                ))}
              </div>
            </section>

            {/* PRODUCTS */}
            <section id="products-section" className="mx-auto max-w-[1280px] px-5 md:px-8 pt-24 scroll-mt-20">
              <div className="flex items-center gap-2 mb-3"><span className="w-7 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.25em] text-[#71717A]">02 / PRODUCTS</span></div>
              <div className="grid md:grid-cols-[0.72fr_1.28fr] gap-8 items-end">
                <div>
                  <h2 className="text-[30px] md:text-[44px] font-bold tracking-[-0.03em] text-white">SYSTEMS THAT<br/><span className="text-[#E11D33]">DO MORE.</span></h2>
                </div>
                <p className="text-[14px] leading-[1.6] text-[#A1A1AA] max-w-[620px]">When a useful idea grows beyond a simple tool, it becomes a product. GEESKIT is the discovery layer; the product runs in its own environment.</p>
              </div>

              <a href="https://mw.geeskit.com" className="mt-8 block border border-[#E11D33]/25 bg-[#0B0B10] p-7 md:p-9 hover:border-[#E11D33]/55 transition-colors" style={clipStyle}>
                <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] text-[#E11D33]">MW / MEASUREMENT WALLET</div>
                    <h3 className="mt-4 text-[28px] md:text-[38px] font-bold tracking-[-0.025em] text-white">COLLECT GROUP SIZES<br/>WITH CONFIDENCE.</h3>
                    <p className="mt-4 text-[14px] leading-[1.55] text-[#A1A1AA] max-w-[600px]">Create a group, share one link, collect submissions, review everything and export a clean CSV.</p>
                  </div>
                  <div className="md:text-right">
                    <div className="text-[10px] tracking-[0.2em] text-[#71717A]">FREE TO START</div>
                    <div className="mt-2 text-[12px] tracking-[0.14em] text-white">PRO / $9 MONTH</div>
                    <div className="mt-5 text-[10px] tracking-[0.2em] text-[#E11D33]">OPEN MW →</div>
                  </div>
                </div>
              </a>
            </section>

            {/* WISDOM */}
            <section id="wisdom-section" className="mx-auto max-w-[1280px] px-5 md:px-8 pt-24 scroll-mt-20">
              <div className="flex items-center gap-2 mb-3"><span className="w-7 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.25em] text-[#71717A]">03 / WISDOM</span></div>
              <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10">
                <h2 className="text-[30px] md:text-[44px] font-bold tracking-[-0.03em] text-white">KNOWLEDGE<br/><span className="text-[#E11D33]">YOU CAN USE.</span></h2>
                <div className="grid gap-3">
                  {[
                    ["PRICE YOUR TIME","Your hourly rate is a business number, not a guess.","TOOLS →"],
                    ["SEE THE HIDDEN COST","Small interruptions compound into real annual losses.","TOOLS →"],
                    ["TURN OLD KNOWLEDGE INTO SOMETHING USEFUL","Historical knowledge, forgotten methods and practical intelligence — reconstructed for today.","COMING →"],
                  ].map(([title,desc,cta]) => (
                    <div key={title} className="border border-white/[0.07] bg-[#08080C] p-5 md:p-6">
                      <div className="text-[13px] tracking-[0.08em] text-white">{title}</div>
                      <div className="mt-2 text-[12px] leading-[1.5] text-[#A1A1AA]">{desc}</div>
                      <div className="mt-4 text-[9px] tracking-[0.18em] text-[#71717A]">{cta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* EXPERIMENTS */}
            <section id="experiments-section" className="mx-auto max-w-[1280px] px-5 md:px-8 pt-24 pb-20 scroll-mt-20">
              <div className="flex items-center gap-2 mb-3"><span className="w-7 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.25em] text-[#71717A]">04 / EXPERIMENTS</span></div>
              <div className="border border-white/[0.07] bg-[#08080C] p-7 md:p-10" style={clipStyle}>
                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
                  <div>
                    <h2 className="text-[30px] md:text-[48px] leading-[0.95] font-bold tracking-[-0.035em] text-white">SOME THINGS<br/>ARE BUILT JUST<br/><span className="text-[#E11D33]">TO SEE WHAT HAPPENS.</span></h2>
                    <p className="mt-6 text-[14px] leading-[1.6] text-[#A1A1AA] max-w-[580px]">AI experiments, unusual interfaces, historical reconstruction, generators and ideas that don't belong in a conventional SaaS box.</p>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-[#52525B] md:text-right">EXPERIMENTS / EMERGING</div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === "tool-job-profit" && (
          <ToolLayout
            number="01"
            name="JOB PROFIT CALCULATOR"
            desc="Know if a job actually made money. Profit, margin, and true hourly."
            onBack={() => setPathView("home")}
            search={search}
          >
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6">
              {/* Inputs */}
              <div className="border border-white/[0.07] bg-[#0E0E13] p-6 md:p-7" style={clipStyle}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-6 h-px bg-[#E11D33]" />
                  <span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">INPUTS</span>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <Field label="Revenue ($)" value={job.revenue} onChange={(v: string) => setJob({ ...job, revenue: v })} error={jobCalc.errors.revenue} placeholder="5000" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Materials ($)" value={job.materials} onChange={(v: string) => setJob({ ...job, materials: v })} error={jobCalc.errors.materials} />
                    <Field label="Overhead / Other ($)" value={job.overhead} onChange={(v: string) => setJob({ ...job, overhead: v })} error={jobCalc.errors.overhead} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Labor Hours" value={job.laborHours} onChange={(v: string) => setJob({ ...job, laborHours: v })} error={jobCalc.errors.laborHours} suffix="hrs" />
                    <Field label="Labor Rate ($/hr)" value={job.laborRate} onChange={(v: string) => setJob({ ...job, laborRate: v })} error={jobCalc.errors.laborRate} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Tax %" value={job.taxPercent} onChange={(v: string) => setJob({ ...job, taxPercent: v })} error={jobCalc.errors.taxPercent} min="0" max="100" />
                    <Field label="Target Margin %" value={job.targetMargin} onChange={(v: string) => setJob({ ...job, targetMargin: v })} error={jobCalc.errors.targetMargin} />
                  </div>
                </div>
                <div className="mt-6 text-[11px] leading-[1.5] text-[#71717A] border-t border-white/[0.06] pt-4">
                  Labor cost = hours × rate. Total cost includes materials + labor + overhead. Net = gross minus taxes on positive profit.
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="border border-[#E11D33]/20 bg-[#12121A] p-6 md:p-7 relative overflow-hidden" style={clipStyle}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#E11D33]/40" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">RESULTS — LIVE</span>
                    <CopyButton text={`Net Profit: ${formatCurrency(jobCalc.net)}\nMargin: ${formatPercent(jobCalc.margin)}\nEffective Hourly: ${formatCurrency(jobCalc.effHourly)}/hr\nTotal Cost: ${formatCurrency(jobCalc.totalCost)}`} />
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] tracking-[0.15em] text-[#71717A]">TOTAL COST</div>
                        <div className="mt-1 flex items-center gap-2"><span className="text-[20px] font-semibold text-white mono">{formatCurrency(jobCalc.totalCost)}</span><CopyButton text={formatCurrency(jobCalc.totalCost)} /></div>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.15em] text-[#71717A]">LABOR COST</div>
                        <div className="mt-1 text-[18px] text-[#A1A1AA] mono">{formatCurrency(jobCalc.laborCost)}</div>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.06] pt-5">
                      <div className="text-[10px] tracking-[0.15em] text-[#71717A]">NET PROFIT</div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className={`text-[36px] font-bold leading-none mono ${jobCalc.net < 0 ? "text-[#E11D33]" : "text-white"}`}>{formatCurrency(jobCalc.net)}</span>
                        <span className={`text-[14px] px-2 py-1 border mono ${jobCalc.margin < 0 ? "border-[#E11D33]/30 bg-[#E11D33]/10 text-[#E11D33]" : jobCalc.margin < 10 ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}>{formatPercent(jobCalc.margin)} margin</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-white/[0.06] bg-black/30 p-4" style={clipSmall}>
                        <div className="text-[10px] tracking-[0.15em] text-[#71717A]">EFFECTIVE HOURLY</div>
                        <div className="text-[18px] text-white mono mt-1">{formatCurrency(jobCalc.effHourly)}/h</div>
                      </div>
                      <div className="border border-white/[0.06] bg-black/30 p-4" style={clipSmall}>
                        <div className="text-[10px] tracking-[0.15em] text-[#71717A]">TAX EST.</div>
                        <div className="text-[18px] text-[#A1A1AA] mono mt-1">{formatCurrency(jobCalc.taxAmt)}</div>
                      </div>
                    </div>

                    {jobCalc.target > 0 && jobCalc.target < 100 && (
                      <div className="border border-[#E11D33]/20 bg-[#E11D33]/[0.06] p-4" style={clipSmall}>
                        <div className="text-[10px] tracking-[0.15em] text-[#E11D33]">TO REACH {jobCalc.target}% MARGIN</div>
                        <div className="text-[16px] text-white mono mt-1">Need {formatCurrency(jobCalc.required)} revenue</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-white/[0.06] bg-[#0A0A0E] p-5" style={clipSmall}>
                  <div className="text-[10px] tracking-[0.2em] text-[#71717A] mb-2">INTERPRETATION</div>
                  <p className="text-[13px] leading-[1.6] text-[#A1A1AA]">
                    {jobCalc.margin < 0
                      ? `Losing ${formatCurrency(Math.abs(jobCalc.net))} on this job. Revenue ${formatCurrency(jobCalc.rev)} doesn't cover ${formatCurrency(jobCalc.totalCost)} cost. Raise price to at least ${formatCurrency(jobCalc.required)} to hit a ${formatPercent(jobCalc.target)} target margin.`
                      : jobCalc.margin < 10
                      ? `Thin margin at ${formatPercent(jobCalc.margin)}. Net ${formatCurrency(jobCalc.net)} on ${formatCurrency(jobCalc.rev)} revenue. Effective ${formatCurrency(jobCalc.effHourly)}/h after labor, materials, overhead, and taxes.`
                      : jobCalc.margin < 25
                      ? `Moderate at ${formatPercent(jobCalc.margin)}. Net ${formatCurrency(jobCalc.net)} is healthy but has room. At ${formatHours(jobCalc.hrs)} labor, you earn ${formatCurrency(jobCalc.effHourly)}/h before tax.`
                      : `Strong — ${formatPercent(jobCalc.margin)} margin, ${formatCurrency(jobCalc.net)} net. Effective ${formatCurrency(jobCalc.effHourly)}/hr over ${formatHours(jobCalc.hrs)}. Good job profit with a solid buffer.`}
                  </p>
                </div>

                <div className="border border-white/[0.06] bg-[#0A0A0E] p-5" style={clipSmall}>
                  <div className="text-[10px] tracking-[0.2em] text-[#71717A] mb-3">JOB PROFIT EXPLAINED</div>
                  <p className="text-[13px] leading-[1.7] text-[#A1A1AA]">
                    Job profit is the money left after revenue is reduced by materials, labor, overhead, and taxes. The revenue figure sets the top line, while materials, labor, and overhead explain the real cost of doing the work. Your profit margin shows how much of the revenue becomes net profit, and the effective hourly rate tells you what the job is really earning per hour once all costs are counted.
                  </p>
                </div>
              </div>
            </div>
          </ToolLayout>
        )}

        {view === "tool-hourly-rate" && (
          <ToolLayout number="02" name="HOURLY RATE CALCULATOR" desc="Price your time to cover income, expenses, profit and taxes." onBack={() => setPathView("home")} search={search}>
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6">
              <div className="border border-white/[0.07] bg-[#0E0E13] p-6 md:p-7" style={clipStyle}>
                <div className="flex items-center gap-2 mb-6"><span className="w-6 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">INPUTS</span></div>
                <div className="space-y-5">
                  <Field label="Desired Salary / Income ($)" value={hourly.salary} onChange={(v: string) => setHourly({ ...hourly, salary: v })} error={hourlyCalc.errors.salary} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Business Expenses ($)" value={hourly.expenses} onChange={(v: string) => setHourly({ ...hourly, expenses: v })} error={hourlyCalc.errors.expenses} />
                    <Field label="Profit Buffer ($)" value={hourly.profitBuffer} onChange={(v: string) => setHourly({ ...hourly, profitBuffer: v })} error={hourlyCalc.errors.profitBuffer} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Billable Hours / Week" value={hourly.billable} onChange={(v: string) => setHourly({ ...hourly, billable: v })} error={hourlyCalc.errors.billable} />
                    <Field label="Working Weeks / Year" value={hourly.weeks} onChange={(v: string) => setHourly({ ...hourly, weeks: v })} error={hourlyCalc.errors.weeks} min="1" max="52" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Non-Billable %" value={hourly.nonBillable} onChange={(v: string) => setHourly({ ...hourly, nonBillable: v })} error={hourlyCalc.errors.nonBillable} />
                    <Field label="Tax %" value={hourly.tax} onChange={(v: string) => setHourly({ ...hourly, tax: v })} error={hourlyCalc.errors.tax} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-[#E11D33]/20 bg-[#12121A] p-6 md:p-7" style={clipStyle}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#E11D33]/40" />
                  <div className="flex items-center justify-between mb-6"><span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">YOUR SUSTAINABLE RATE</span><CopyButton text={`${formatCurrency(hourlyCalc.hourlyRate)} /hr`} /></div>
                  <div className="text-[42px] font-bold leading-none mono text-white">{formatCurrency(hourlyCalc.hourlyRate)}<span className="text-[18px] text-[#71717A] font-normal"> /hr</span></div>
                  <div className="mt-3 text-[12px] text-[#A1A1AA]">Based on {hourlyCalc.annualBillable.toFixed(0)} real billable hours / year ({hourlyCalc.realPerWeek.toFixed(1)}h/week after {hourlyCalc.nonBill.toFixed(0)}% non-billable).</div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="border border-white/10 bg-black/30 p-3" style={clipSmall}><div className="text-[10px] text-[#71717A]">DAILY</div><div className="mono text-white mt-1">{formatCurrency(hourlyCalc.daily)}</div></div>
                    <div className="border border-white/10 bg-black/30 p-3" style={clipSmall}><div className="text-[10px] text-[#71717A]">WEEKLY</div><div className="mono text-white mt-1">{formatCurrency(hourlyCalc.weekly)}</div></div>
                    <div className="border border-white/10 bg-black/30 p-3" style={clipSmall}><div className="text-[10px] text-[#71717A]">MONTHLY NEED</div><div className="mono text-white mt-1">{formatCurrency(hourlyCalc.monthly)}</div></div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-[11px] mono text-[#71717A]">
                    <div className="flex justify-between"><span>Total needed pre-tax</span><span className="text-[#A1A1AA]">{formatCurrency(hourlyCalc.preTax)}</span></div>
                    <div className="flex justify-between"><span>Total needed with {hourlyCalc.taxP}% tax</span><span className="text-white">{formatCurrency(hourlyCalc.totalNeeded)}</span></div>
                    <div className="flex justify-between"><span>Real billable hrs/year</span><span className="text-white">{hourlyCalc.annualBillable.toFixed(0)}h</span></div>
                  </div>
                </div>
                <div className="border border-white/10 bg-[#0A0A0E] p-5" style={clipSmall}>
                  <div className="text-[10px] tracking-[0.2em] text-[#71717A] mb-2">HOW IT BREAKS DOWN</div>
                  <p className="text-[13px] leading-[1.6] text-[#A1A1AA]">
                    To earn {formatCurrency(hourlyCalc.salary)} after {formatCurrency(hourlyCalc.expenses)} expenses and {formatCurrency(hourlyCalc.buffer)} buffer, you need {formatCurrency(hourlyCalc.totalNeeded)} across {hourlyCalc.annualBillable.toFixed(0)} real billable hours / year. That creates a sustainable hourly rate that covers income, taxes, non-billable time, and business costs.
                  </p>
                </div>
              </div>
            </div>
          </ToolLayout>
        )}

        {view === "tool-interruption" && (
          <ToolLayout number="03" name="INTERRUPTION COST CALCULATOR" desc="See the real cost of small daily interruptions." onBack={() => setPathView("home")} search={search}>
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6">
              <div className="border border-white/[0.07] bg-[#0E0E13] p-6 md:p-7" style={clipStyle}>
                <div className="flex items-center gap-2 mb-6"><span className="w-6 h-px bg-[#E11D33]" /><span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">INPUTS</span></div>
                <div className="grid gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Number of Employees" value={interrupt.employees} onChange={(v: string) => setInterrupt({ ...interrupt, employees: v })} error={interruptCalc.errors.employees} step="1" />
                    <Field label="Avg Hourly Wage ($)" value={interrupt.wage} onChange={(v: string) => setInterrupt({ ...interrupt, wage: v })} error={interruptCalc.errors.wage} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Interruptions / Day / Person" value={interrupt.perDay} onChange={(v: string) => setInterrupt({ ...interrupt, perDay: v })} error={interruptCalc.errors.perDay} />
                    <Field label="Minutes Lost Per Interruption" value={interrupt.minutes} onChange={(v: string) => setInterrupt({ ...interrupt, minutes: v })} error={interruptCalc.errors.minutes} />
                  </div>
                </div>
                <div className="mt-6 text-[11px] text-[#71717A] border-t border-white/10 pt-4">Hours lost = interruptions × minutes. Annual assumes 260 workdays. FTE = annual hours ÷ 2080.</div>
              </div>

              <div className="space-y-4">
                <div className="border border-[#E11D33]/20 bg-[#12121A] p-6 md:p-7" style={clipStyle}>
                  <div className="flex items-center justify-between mb-6"><span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">COST — LIVE</span><CopyButton text={`Daily cost: ${formatCurrency(interruptCalc.dailyCost)}\nAnnual cost: ${formatCurrency(interruptCalc.annualCost)}`} /></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div><div className="text-[10px] text-[#71717A]">DAILY COST</div><div className="text-[24px] font-bold mono text-white mt-1">{formatCurrency(interruptCalc.dailyCost)}</div></div>
                    <div><div className="text-[10px] text-[#71717A]">WEEKLY COST</div><div className="text-[18px] mono text-[#A1A1AA] mt-1">{formatCurrency(interruptCalc.weeklyCost)}</div></div>
                  </div>

                  <div className="mt-6 border border-white/10 bg-black/40 p-4" style={clipSmall}>
                    <div className="text-[10px] tracking-[0.15em] text-[#E11D33]">ANNUAL IMPACT</div>
                    <div className="mt-2 text-[28px] font-bold mono text-white">{formatCurrency(interruptCalc.annualCost)}</div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] mono">
                      <div className="text-[#71717A]">Hours lost / year <span className="text-white ml-2">{interruptCalc.annualHours.toFixed(0)}h</span></div>
                      <div className="text-[#71717A]">FTE equivalent <span className="text-white ml-2">{interruptCalc.fte.toFixed(2)} FTE</span></div>
                      <div className="text-[#71717A]">Daily hours lost <span className="text-white ml-2">{interruptCalc.dailyTotal.toFixed(1)}h</span></div>
                      <div className="text-[#71717A]">Per person / day <span className="text-white ml-2">{formatHours(interruptCalc.dailyPerEmp)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 bg-[#0A0A0E] p-5" style={clipSmall}>
                  <div className="text-[10px] tracking-[0.2em] text-[#71717A] mb-2">INTERPRETATION</div>
                  <p className="text-[13px] leading-[1.6] text-[#A1A1AA]">
                    {interruptCalc.employees} people × {interruptCalc.perDay} interruptions × {interruptCalc.minutes} minutes = {interruptCalc.dailyTotal.toFixed(1)}h lost daily.
                    That’s {formatCurrency(interruptCalc.dailyCost)}/day, {formatCurrency(interruptCalc.annualCost)}/year — roughly {interruptCalc.fte.toFixed(2)} full-time people equivalent in lost time.
                    {interruptCalc.fte > 1 ? " Even a 30% reduction saves significant capacity." : " Small process changes (quiet hours, batch communication) can recover most of this."}
                  </p>
                </div>
              </div>
            </div>
          </ToolLayout>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#050507] mt-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-10">
          <div className="grid md:grid-cols-[1.2fr_0.8fr_0.6fr] gap-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden border border-white/10 bg-black" style={clipSmall}>
                  <img src={geeskitLogo} alt="GEESKIT" className="h-10 w-10 object-cover scale-[2.2] object-[left_center] -ml-[2px]" />
                </div>
                <span className="text-[13px] tracking-[0.2em] font-semibold text-white">GEESKIT</span>
              </div>
              <div className="mt-4 text-[12px] leading-[1.6] text-[#A1A1AA] max-w-[320px]">Make the next decision easier.<br />By ALMAGREMIUM</div>
              <div className="mt-6 text-[10px] tracking-[0.12em] text-[#52525B]">© 2026 Almagremium. All rights reserved.<br />Created by Giselle Sierra Pérez</div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-[10px] tracking-[0.22em] text-[#71717A] mb-4">COMPANY</div>
                <div className="space-y-2.5 text-[12px] text-[#A1A1AA]">
                  <button onClick={() => setPathView("about")} className="block hover:text-white">About</button>
                  <span className="block">Contact — hello@geeskit.com</span>
                  <span className="block">Privacy — Private by design</span>
                  <span className="block">Terms — Free tools, no account</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.22em] text-[#71717A] mb-4">RESOURCES</div>
                <div className="space-y-2.5 text-[12px] text-[#A1A1AA]">
                  <span className="block">How it works — Client-side only</span>
                  <span className="block">Tool Guidelines — Real math</span>
                  <span className="block">Request a Tool — Coming soon</span>
                  <span className="block">Blog — Coming soon</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.22em] text-[#71717A] mb-4">GEESKIT.COM</div>
              <div className="text-[11px] leading-[1.6] text-[#52525B]">100% free. No tracking. Calculations stay in your browser. Built as an environment for useful digital experiences — calculators, tools, and practical answers.</div>
              <div className="mt-4 flex gap-2">
                <span className="h-7 w-7 border border-white/10 bg-white/[0.03] flex items-center justify-center text-[10px] text-[#71717A]">X</span>
                <span className="h-7 w-7 border border-white/10 bg-white/[0.03] flex items-center justify-center text-[10px] text-[#71717A]">IG</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ToolLayout({ number, name, desc, children, onBack, search }: { number: string; name: string; desc: string; children: React.ReactNode; onBack: () => void; search: string }) {
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-8 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 h-9 px-4 border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] text-[#A1A1AA] hover:text-white hover:border-white/20 transition-colors" style={clipSmall}>
          ← BACK TO TOOLS
        </button>
        {search && <div className="text-[11px] tracking-[0.15em] text-[#52525B]">SEARCH: “{search}”</div>}
      </div>

      <div className="border border-white/[0.06] bg-[#08080C] p-6 md:p-8 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4" style={clipStyle}>
        <div className="flex items-start gap-4">
          <span className="text-[11px] tracking-[0.2em] text-[#E11D33] mono border border-[#E11D33]/20 bg-[#E11D33]/10 px-2.5 py-1.5">{number}</span>
          <div>
            <h1 className="text-[18px] md:text-[22px] font-bold tracking-[0.02em] text-white">{name}</h1>
            <p className="mt-1 text-[13px] text-[#A1A1AA]">{desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.18em] text-[#71717A]">LIVE — CLIENT SIDE — PRIVATE</span>
        </div>
      </div>

      {children}
    </div>
  );
}
