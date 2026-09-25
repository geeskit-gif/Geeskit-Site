import type { ReactNode } from "react";

type Variant = "mw" | "ny";

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`ui-panel ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {children}
      </svg>
    </div>
  );
}

function Grid({ cols, rows, filled = [] }: { cols: number; rows: number; filled?: number[] }) {
  const cells = [];
  const w = 84 / cols;
  const h = 70 / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      cells.push(
        <rect
          key={i}
          x={8 + c * w + 1}
          y={20 + r * h + 1}
          width={w - 2}
          height={h - 2}
          className={filled.includes(i) ? "ui-fill" : undefined}
        />,
      );
    }
  }
  return <>{cells}</>;
}

function Bars({ values }: { values: number[] }) {
  const w = 80 / values.length;
  return (
    <>
      {values.map((v, i) => (
        <rect key={i} x={10 + i * w + 1.5} y={88 - v} width={w - 3} height={v} className="ui-fill" />
      ))}
      <line x1="8" y1="88" x2="92" y2="88" />
    </>
  );
}

function HeaderBar() {
  return (
    <>
      <line x1="8" y1="11" x2="40" y2="11" />
      <circle cx="88" cy="11" r="2.5" />
    </>
  );
}

function MwArt() {
  return (
    <div className="ui-art ui-art--mw" aria-hidden="true">
      <Panel className="span-2">
        <HeaderBar />
        <rect x="18" y="30" width="64" height="30" rx="4" />
        <line x1="58" y1="45" x2="82" y2="45" />
        <line x1="18" y1="72" x2="70" y2="72" />
        <line x1="18" y1="80" x2="54" y2="80" />
      </Panel>
      <Panel className="span-2 tall">
        <HeaderBar />
        <Grid cols={5} rows={4} filled={[2, 6, 9, 13, 17]} />
      </Panel>
      <Panel>
        <HeaderBar />
        <Bars values={[18, 30, 24, 46, 38, 58]} />
      </Panel>
      <Panel>
        <HeaderBar />
        <Grid cols={4} rows={3} filled={[1, 6, 8, 11]} />
      </Panel>
      <Panel>
        <path d="M22 78 L78 22 M30 86 L86 30 M22 78 L30 86 M78 22 L86 30" />
        <path d="M34 66 l6 6 M44 56 l6 6 M54 46 l6 6 M64 36 l6 6" />
        <path d="M22 22 L78 78" />
      </Panel>
      <Panel>
        <HeaderBar />
        <polyline points="10,78 24,66 36,70 50,50 62,56 76,34 90,24" />
        <Bars values={[10, 16, 12, 20]} />
      </Panel>
      <Panel>
        <HeaderBar />
        <Bars values={[22, 40, 30, 60, 48]} />
      </Panel>
      <Panel className="span-2">
        <rect x="38" y="16" width="24" height="16" rx="2" />
        <path d="M50 32 V46 M26 46 H74 M26 46 V58 M50 46 V58 M74 46 V58" />
        <rect x="16" y="58" width="20" height="16" rx="2" />
        <rect x="40" y="58" width="20" height="16" rx="2" />
        <rect x="64" y="58" width="20" height="16" rx="2" />
      </Panel>
    </div>
  );
}

function NyArt() {
  return (
    <div className="ui-art ui-art--ny" aria-hidden="true">
      <Panel className="span-2">
        <HeaderBar />
        <circle cx="44" cy="46" r="16" />
        <line x1="56" y1="58" x2="72" y2="74" />
        <line x1="18" y1="84" x2="62" y2="84" />
      </Panel>
      <Panel className="span-2 tall">
        <HeaderBar />
        <rect x="12" y="20" width="76" height="26" />
        <polyline points="16,40 30,30 42,36 56,24 70,32 84,26" />
        <line x1="12" y1="56" x2="70" y2="56" />
        <line x1="12" y1="62" x2="56" y2="62" />
        <Bars values={[8, 14, 10, 18, 12, 20, 16]} />
      </Panel>
      <Panel>
        <path d="M20 76 L40 44 L58 60 L80 24" />
        <circle cx="20" cy="76" r="3" />
        <circle cx="40" cy="44" r="3" />
        <circle cx="58" cy="60" r="3" />
        <circle cx="80" cy="24" r="3" />
      </Panel>
      <Panel>
        <path d="M20 24 L50 50 L80 24 M20 76 L50 50 L80 76 M20 24 L20 76 M80 24 L80 76 M20 50 H80 M50 20 V80" />
        <circle cx="50" cy="50" r="4" className="ui-fill" />
      </Panel>
      <Panel>
        <circle cx="44" cy="44" r="18" />
        <line x1="57" y1="57" x2="76" y2="76" />
      </Panel>
      <Panel>
        <HeaderBar />
        <line x1="12" y1="28" x2="82" y2="28" />
        <line x1="12" y1="38" x2="66" y2="38" />
        <line x1="12" y1="48" x2="76" y2="48" />
        <line x1="12" y1="58" x2="52" y2="58" />
        <line x1="12" y1="68" x2="72" y2="68" />
      </Panel>
      <Panel className="span-4 binary">
        <text x="12" y="30">01110011011</text>
        <text x="12" y="48">01000011001</text>
        <text x="12" y="66">01110001101</text>
        <text x="12" y="84">01001100101</text>
      </Panel>
    </div>
  );
}

export function InterfaceArt({ variant }: { variant: Variant }) {
  return variant === "mw" ? <MwArt /> : <NyArt />;
}
