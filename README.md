# GEESKIT — WEBHUB FOR MW & NOWYES

Domain: geeskit.com  
Parent: ALMAGREMIUM

> MAKE THE NEXT DECISION EASIER.

GEESKIT is the public web hub and discovery layer for two practical digital products:

- **MW / Measurement Wallet** — group-size collection and management.
- **NOWYES** — practical life and paperwork guidance for migrants in Mexico.

GEESKIT does not replace the products. Each product runs in its own environment.

## Product environments

- MW: https://mw.geeskit.com
- NOWYES: https://nowyes.geeskitgsp.workers.dev/

## Languages

- English
- French
- Portuguese

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Client-side web hub

## Logo

The official GEESKIT logo is in `public/geeskit-logo.jpg` and `src/assets/geeskit-logo.jpg`.

This file is AUTHORITATIVE — do not redesign it.

## Structure

```
src/
  App.tsx        ← GEESKIT web hub
  main.tsx
  index.css
  assets/
    geeskit-logo.jpg
public/
  geeskit-logo.jpg
```

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

META AI → GITHUB → CLOUDFLARE → GEESKIT.COM

- Build command: `npm run build`
- Output: `dist`

## ©

© 2026 Almagremium. All rights reserved.  
Created by Giselle Sierra Pérez
