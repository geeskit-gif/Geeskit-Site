import React, { useEffect, useState } from "react";

const geeskitLogo = "/geeskit-logo.jpg";

type Language = "en" | "fr" | "pt";

const COPY: Record<Language, {
  nav: [string, string, string];
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  hubLabel: string;
  mwTitle: string;
  mwDesc: string;
  mwMeta: string;
  mwCta: string;
  nowyesTitle: string;
  nowyesDesc: string;
  nowyesMeta: string;
  nowyesCta: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutText: string;
  footer: string;
}> = {
  en: {
    nav: ["MW", "NOWYES", "ABOUT"],
    eyebrow: "GEESKIT / WEBHUB",
    title1: "ONE ENVIRONMENT.",
    title2: "TWO PRODUCTS.",
    intro: "GEESKIT is the web hub for practical digital products built by ALMAGREMIUM. Discover the product you need, then enter its own environment.",
    hubLabel: "PRODUCT ENVIRONMENTS",
    mwTitle: "MW / MEASUREMENT WALLET",
    mwDesc: "Collect group sizes with confidence. Create a campaign, share one link, collect submissions, review everything and export clean data.",
    mwMeta: "PRODUCT ENVIRONMENT",
    mwCta: "OPEN MW →",
    nowyesTitle: "NOWYES",
    nowyesDesc: "Practical life and paperwork guidance for migrants in Mexico. Know what to do, where to go and what comes next.",
    nowyesMeta: "PRODUCT ENVIRONMENT",
    nowyesCta: "OPEN NOWYES →",
    aboutLabel: "THE HUB",
    aboutTitle: "GEESKIT IS THE DOOR.",
    aboutText: "GEESKIT brings the products together without replacing them. MW and NOWYES remain their own product environments, with GEESKIT serving as the public web hub and discovery layer.",
    footer: "Make the next decision easier. By ALMAGREMIUM"
  },
  fr: {
    nav: ["MW", "NOWYES", "À PROPOS"],
    eyebrow: "GEESKIT / WEBHUB",
    title1: "UN ENVIRONNEMENT.",
    title2: "DEUX PRODUITS.",
    intro: "GEESKIT est le hub web des produits numériques pratiques créés par ALMAGREMIUM. Trouvez le produit dont vous avez besoin, puis entrez dans son propre environnement.",
    hubLabel: "ENVIRONNEMENTS PRODUITS",
    mwTitle: "MW / MEASUREMENT WALLET",
    mwDesc: "Collectez les tailles de groupe en toute confiance. Créez une campagne, partagez un lien, recueillez les réponses et exportez des données propres.",
    mwMeta: "ENVIRONNEMENT PRODUIT",
    mwCta: "OUVRIR MW →",
    nowyesTitle: "NOWYES",
    nowyesDesc: "Conseils pratiques pour la vie et les démarches des migrants au Mexique. Sachez quoi faire, où aller et quelle est la prochaine étape.",
    nowyesMeta: "ENVIRONNEMENT PRODUIT",
    nowyesCta: "OUVRIR NOWYES →",
    aboutLabel: "LE HUB",
    aboutTitle: "GEESKIT EST LA PORTE.",
    aboutText: "GEESKIT réunit les produits sans les remplacer. MW et NOWYES restent leurs propres environnements, tandis que GEESKIT sert de hub web public et de couche de découverte.",
    footer: "Rendre la prochaine décision plus facile. Par ALMAGREMIUM"
  },
  pt: {
    nav: ["MW", "NOWYES", "SOBRE"],
    eyebrow: "GEESKIT / WEBHUB",
    title1: "UM AMBIENTE.",
    title2: "DOIS PRODUTOS.",
    intro: "GEESKIT é o hub web de produtos digitais práticos criados pela ALMAGREMIUM. Encontre o produto de que precisa e entre no ambiente próprio dele.",
    hubLabel: "AMBIENTES DE PRODUTOS",
    mwTitle: "MW / MEASUREMENT WALLET",
    mwDesc: "Colete tamanhos de grupos com confiança. Crie uma campanha, compartilhe um link, receba os envios, revise tudo e exporte dados limpos.",
    mwMeta: "AMBIENTE DO PRODUTO",
    mwCta: "ABRIR MW →",
    nowyesTitle: "NOWYES",
    nowyesDesc: "Orientação prática sobre vida e documentação para migrantes no México. Saiba o que fazer, onde ir e qual é o próximo passo.",
    nowyesMeta: "AMBIENTE DO PRODUTO",
    nowyesCta: "ABRIR NOWYES →",
    aboutLabel: "O HUB",
    aboutTitle: "GEESKIT É A PORTA.",
    aboutText: "GEESKIT reúne os produtos sem substituí-los. MW e NOWYES continuam sendo seus próprios ambientes de produto, enquanto GEESKIT funciona como hub web público e camada de descoberta.",
    footer: "Torne a próxima decisão mais fácil. Por ALMAGREMIUM"
  }
};

const LINKS = {
  mw: "https://mw.geeskit.com",
  nowyes: "https://nowyes.geeskitgsp.workers.dev/"
};

function Header({ language, setLanguage }: { language: Language; setLanguage: (l: Language) => void }) {
  const copy = COPY[language];

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 h-[64px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
          <div className="h-7 w-7 overflow-hidden bg-black border border-white/10 flex items-center justify-center">
            <img src={geeskitLogo} alt="GEESKIT" className="h-full w-full object-contain" />
          </div>
          <span className="text-[14px] tracking-[0.22em] font-semibold text-[#F5F5F7]">GEESKIT</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          <button onClick={() => jump("mw-section")} className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">{copy.nav[0]}</button>
          <button onClick={() => jump("nowyes-section")} className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">{copy.nav[1]}</button>
          <button onClick={() => jump("about-section")} className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">{copy.nav[2]}</button>
          <div className="flex items-center gap-1 border border-white/10 px-1 py-1 ml-2">
            {(["en", "fr", "pt"] as Language[]).map((code) => (
              <button key={code} type="button" onClick={() => setLanguage(code)} className={`px-2 py-0.5 text-[9px] tracking-[0.12em] ${language === code ? "text-[#E11D33] bg-white/[0.06]" : "text-[#71717A] hover:text-white"}`}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-1 border border-white/10 px-1 py-1">
          {(["en", "fr", "pt"] as Language[]).map((code) => (
            <button key={code} type="button" onClick={() => setLanguage(code)} className={`px-2 py-0.5 text-[9px] tracking-[0.12em] ${language === code ? "text-[#E11D33] bg-white/[0.06]" : "text-[#71717A]"}`}>
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function ProductCard({ id, label, title, desc, meta, cta, href }: {
  id: string; label: string; title: string; desc: string; meta: string; cta: string; href: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <a href={href} className="group block border border-white/[0.08] bg-[#09090D] p-7 md:p-10 hover:border-[#E11D33]/45 hover:bg-[#0B0B10] transition-all" style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#E11D33]" />
              <span className="text-[10px] tracking-[0.25em] text-[#E11D33]">{label}</span>
            </div>
            <h2 className="mt-5 text-[30px] md:text-[46px] leading-[0.95] font-bold tracking-[-0.035em] text-white">{title}</h2>
            <p className="mt-5 max-w-[680px] text-[14px] md:text-[15px] leading-[1.65] text-[#A1A1AA]">{desc}</p>
          </div>
          <div className="md:text-right">
            <div className="text-[9px] tracking-[0.2em] text-[#52525B]">{meta}</div>
            <div className="mt-5 text-[10px] tracking-[0.2em] text-[#E11D33] group-hover:text-white transition-colors">{cta}</div>
          </div>
        </div>
      </a>
    </section>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("geeskit-language");
    return stored === "fr" || stored === "pt" ? stored : "en";
  });

  const copy = COPY[language];

  useEffect(() => {
    localStorage.setItem("geeskit-language", language);
    document.documentElement.lang = language;
    document.title = "GEESKIT — Webhub for MW & NOWYES";
    const description = "GEESKIT is the web hub for MW Measurement Wallet and NOWYES.";
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://geeskit.com/");
  }, [language]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F7] selection:bg-[#E11D33]/30 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: Inter, system-ui, sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]">
        <div className="absolute left-[12%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[32%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[68%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[88%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-[18%] left-0 right-0 h-px bg-white" />
      </div>

      <Header language={language} setLanguage={setLanguage} />

      <main className="relative z-10">
        <section className="mx-auto max-w-[1180px] px-5 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-[920px]">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-px bg-[#E11D33]" />
              <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA]">{copy.eyebrow}</span>
            </div>
            <h1 className="text-[46px] md:text-[82px] leading-[0.88] tracking-[-0.045em] font-bold">
              <span className="block text-white">{copy.title1}</span>
              <span className="block text-[#E11D33]">{copy.title2}</span>
            </h1>
            <p className="mt-8 max-w-[720px] text-[16px] md:text-[19px] leading-[1.6] text-[#A1A1AA]">{copy.intro}</p>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#08080C]">
          <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-4">
            <div className="text-[10px] tracking-[0.25em] text-[#71717A]">{copy.hubLabel}</div>
          </div>
        </section>

        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-12 md:py-16 space-y-5">
          <ProductCard id="mw-section" label="MW / MEASUREMENT WALLET" title={copy.mwTitle} desc={copy.mwDesc} meta={copy.mwMeta} cta={copy.mwCta} href={LINKS.mw} />
          <ProductCard id="nowyes-section" label="NOWYES" title={copy.nowyesTitle} desc={copy.nowyesDesc} meta={copy.nowyesMeta} cta={copy.nowyesCta} href={LINKS.nowyes} />

          <section id="about-section" className="scroll-mt-24 pt-14 md:pt-20 pb-8">
            <div className="border border-white/[0.07] bg-[#08080C] p-7 md:p-10" style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-px bg-[#E11D33]" />
                <span className="text-[10px] tracking-[0.25em] text-[#71717A]">{copy.aboutLabel}</span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold tracking-[-0.03em] text-white">{copy.aboutTitle}</h2>
              <p className="mt-5 max-w-[780px] text-[14px] md:text-[15px] leading-[1.7] text-[#A1A1AA]">{copy.aboutText}</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#050507]">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden border border-white/10 bg-black">
                  <img src={geeskitLogo} alt="GEESKIT" className="h-full w-full object-contain" />
                </div>
                <span className="text-[13px] tracking-[0.2em] font-semibold text-white">GEESKIT</span>
              </div>
              <div className="mt-4 text-[12px] leading-[1.6] text-[#A1A1AA]">{copy.footer}</div>
              <div className="mt-5 text-[10px] tracking-[0.12em] text-[#52525B]">© 2026 Almagremium. All rights reserved.<br />Created by Giselle Sierra Pérez</div>
            </div>
            <div className="text-[10px] tracking-[0.16em] text-[#52525B]">MW · NOWYES · GEESKIT</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
