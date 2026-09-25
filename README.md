# GEESKIT — Homepage

Official homepage for **GEESKIT**, a technology business / SaaS storefront by **Almagremium**, presenting its software products.

🔗 Live site: [https://geeskit.com/](https://geeskit.com/)

## Products

| Product | Description | URL |
|---|---|---|
| **MW — Measurement Wallet** | Collect group sizes with confidence. | https://mw.geeskit.com/ |
| **NY — NOWYES** | A practical migrant life and paperwork tool for people building a new life in Mexico. | https://nowyes.geeskitgsp.workers.dev/ |

## Tech Stack

- **React** + **TypeScript**
- **Vite** (build tool)
- **Cloudflare Workers/Pages** (deployment, via `wrangler.jsonc`)

## Project Structure

```
geeskit-site/
├── public/              # Static assets (favicon, logos, sitemap.xml, robots.txt)
├── src/                 # Application source (components, pages, styles)
├── dist/                # Production build output (generated)
├── package.json
├── package-lock.json
├── wrangler.jsonc       # Cloudflare Workers deployment config
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run locally (development)

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

This outputs the production-ready static site to `./dist`.

### Preview the production build locally

```bash
npm run preview
```

## Deployment

This project deploys to Cloudflare Workers using Wrangler.

```bash
npx wrangler deploy
```

Configuration (`wrangler.jsonc`):

```jsonc
{
  "name": "geeskit-site",
  "compatibility_date": "2026-09-25",
  "assets": {
    "directory": "./dist"
  }
}
```

## Design Notes

- Premium dark-mode, architectural/technological visual identity — built to match the official GEESKIT brand reference (logo, layout, colors, proportions, materials, lighting).
- Desktop: the two product cards (MW and NY) are displayed **side-by-side**, each a fully clickable link to its product.
- Tablet: spacing and dimensions adapt while preserving the visual hierarchy.
- Mobile: product cards stack only when screen width requires it; no horizontal scrolling at any breakpoint.
- Logos (GEESKIT, MW, NY) are used exactly as provided — no recoloring, resizing, or reinterpretation.

## Accessibility

- Semantic HTML throughout.
- Product cards are real, keyboard-accessible `<a>` links (not JS-only click handlers).
- All logos and images include descriptive `alt` text.
- Contrast maintained for readability in dark mode.

## SEO

Included in this project:

- Page title & meta description
- Canonical URL (`https://geeskit.com/`)
- Open Graph metadata
- Twitter card metadata
- Favicon
- `Organization` and `WebSite` structured data (JSON-LD)
- `robots.txt`
- `sitemap.xml` (real URLs only)

## Sections

1. **Top Navigation** — Products (left) · About (right)
2. **Hero** — GEESKIT logo, name, "Technology Business / SaaS," "by ALMAGREMIUM ©"
3. **Our Products** — MW and NY cards, each linking out to its live product
4. **About** — brief description of GEESKIT as a technology business / SaaS storefront
5. **Contact / Footer** — Contact · Legal · © 2026 GEESKIT

## License

© 2026 GEESKIT — by Almagremium. All rights reserved.
