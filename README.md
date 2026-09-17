# GEESKIT — MAKE THE NEXT DECISION EASIER.

Domain: geeskit.com
Parent: ALMAGREMIUM

> Useful tools for figuring things out.

GEESKIT is a free digital utility and discovery environment. Built client-side only, no backend, no tracking.

## Stack
- React 18 + TypeScript + Vite 6
- Tailwind CSS 3
- 100% client-side calculations

## Logo
The official GEESKIT logo is in `public/geeskit-logo.jpg` and `src/assets/geeskit-logo.jpg`.
This file is AUTHORITATIVE — do not redesign it.
Original upload: `public/Metallic_Red_Logo.jpg`

## Structure
```
src/
  App.tsx        ← full app, 3 tools, search, routing
  main.tsx
  index.css
  assets/
    geeskit-logo.jpg
public/
  geeskit-logo.jpg
```

## Tools
- 01 Job Profit Calculator
- 02 Hourly Rate Calculator
- 03 Interruption Cost Calculator
Architecture is extensible: add entries to TOOLS and new view handlers in App.tsx.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy
META AI → GITHUB → CLOUDFLARE PAGES → GEESKIT.COM
- Build command: `npm run build`
- Output: `dist`
- No env vars needed

## Privacy
All inputs stay in browser. No analytics that requires personal data.

© 2026 Almagremium. All rights reserved.
Created by Giselle Sierra Pérez
