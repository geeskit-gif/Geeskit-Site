import React, { useEffect } from 'react';

const geeskitLogo = '/geeskit-logo.jpg';

const PRODUCTS = [
  {
    code: '01',
    title: 'MW / MEASUREMENT WALLET',
    type: 'MICRO-SAAS',
    desc: 'A focused business application for collecting group sizes, reviewing submissions and exporting clean data.',
    href: 'https://mw.geeskit.com',
    cta: 'OPEN MW →'
  },
  {
    code: '02',
    title: 'DYK',
    type: 'SOFTWARE PRODUCT',
    desc: 'A GEESKIT knowledge product built to turn information into a usable digital experience.',
    href: '#',
    cta: 'DYK / PRODUCT'
  }
];

const CAPABILITIES = [
  'AI / AUTOMATION',
  'MICRO-SAAS',
  'WEB APPS',
  'BUSINESS TOOLS',
  'SOFTWARE PRODUCTS',
  'TECHNICAL SYSTEMS / SERVICES'
];

export default function App() {
  useEffect(() => {
    document.title = 'GEESKIT — Technology business';
    const description = 'GEESKIT is a technology business building AI and automation systems, micro-SaaS, web apps, business tools and software products.';
    let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://geeskit.com/');
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F7] selection:bg-[#E11D33]/30 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: Inter, system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]">
        <div className="absolute left-[12%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[32%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[68%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[88%] top-0 bottom-0 w-px bg-white" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050507]/92 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="h-7 w-7 overflow-hidden border border-white/10 bg-black">
              <img src={geeskitLogo} alt="GEESKIT" className="h-full w-full object-contain" />
            </div>
            <span className="text-[14px] font-semibold tracking-[0.22em]">GEESKIT</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#business" className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">BUSINESS</a>
            <a href="#products" className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">PRODUCTS</a>
            <a href="#future" className="text-[10px] tracking-[0.18em] text-[#A1A1AA] hover:text-white">FUTURE</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section id="business" className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 md:px-8 md:pb-28 md:pt-32">
          <div className="max-w-[980px]">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E11D33]" />
              <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA]">GEESKIT / TECHNOLOGY BUSINESS</span>
            </div>
            <h1 className="text-[48px] font-extrabold leading-[0.9] tracking-[-0.05em] md:text-[92px]">
              <span className="block text-white">TECHNOLOGY</span>
              <span className="block text-[#E11D33]">BUILT TO SHIP.</span>
            </h1>
            <p className="mt-9 max-w-[760px] text-[17px] leading-[1.65] text-[#A1A1AA] md:text-[20px]">
              GEESKIT builds AI and automation systems, micro-SaaS, web apps, business tools and software products — with technical systems and services behind them.
            </p>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#08080C]">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 md:grid-cols-3">
            {CAPABILITIES.map((item, i) => (
              <div key={item} className="border-b border-white/[0.06] px-5 py-6 md:border-b-0 md:border-r md:px-8">
                <span className="mr-3 text-[9px] text-[#E11D33]">0{i + 1}</span>
                <span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#E11D33]" />
              <span className="text-[10px] tracking-[0.25em] text-[#71717A]">CURRENT PRODUCTS</span>
            </div>
            <h2 className="text-[38px] font-bold tracking-[-0.04em] md:text-[58px]">SOFTWARE PRODUCTS.</h2>
            <p className="mt-4 max-w-[680px] text-[14px] leading-[1.7] text-[#A1A1AA]">MW and DYK are current GEESKIT products. Future products extend the same technology business.</p>
          </div>

          <div className="space-y-5">
            {PRODUCTS.map((product) => (
              <a key={product.code} href={product.href} className="group block border border-white/[0.08] bg-[#09090D] p-7 transition-all hover:border-[#E11D33]/45 hover:bg-[#0B0B10] md:p-10" style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }}>
                <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.25em] text-[#E11D33]">{product.code}</span>
                      <span className="h-px w-8 bg-[#E11D33]" />
                      <span className="text-[10px] tracking-[0.2em] text-[#71717A]">{product.type}</span>
                    </div>
                    <h3 className="mt-5 text-[30px] font-bold leading-none tracking-[-0.035em] md:text-[48px]">{product.title}</h3>
                    <p className="mt-5 max-w-[720px] text-[14px] leading-[1.7] text-[#A1A1AA]">{product.desc}</p>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-[#E11D33] group-hover:text-white">{product.cta}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="future" className="border-y border-white/[0.06] bg-[#08080C]">
          <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
            <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#E11D33]" />
                  <span className="text-[10px] tracking-[0.25em] text-[#71717A]">FUTURE TECH PRODUCTS</span>
                </div>
                <h2 className="text-[38px] font-bold leading-[0.95] tracking-[-0.04em] md:text-[58px]">BUILD THE<br />NEXT SYSTEM.</h2>
              </div>
              <p className="text-[15px] leading-[1.8] text-[#A1A1AA]">
                GEESKIT is an expandable technology business. New products can share infrastructure, automation, distribution and technical systems instead of becoming isolated projects.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#050507]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden border border-white/10 bg-black">
                <img src={geeskitLogo} alt="GEESKIT" className="h-full w-full object-contain" />
              </div>
              <span className="text-[13px] font-semibold tracking-[0.2em]">GEESKIT</span>
            </div>
            <p className="mt-4 text-[12px] text-[#71717A]">Technology business · AI / automation · Micro-SaaS · Software products</p>
            <p className="mt-3 text-[10px] tracking-[0.12em] text-[#52525B]">© 2026 Almagremium. All rights reserved.</p>
          </div>
          <div className="text-[10px] tracking-[0.16em] text-[#52525B]">MW · DYK · FUTURE PRODUCTS</div>
        </div>
      </footer>
    </div>
  );
}
