"use client";

/**
 * GridPulseBg
 * -----------
 * A crisp grid that pulses with a radial mask. Good for dashboards,
 * SaaS hero backgrounds, and anywhere you want "quiet structure".
 */
export default function GridPulseBg() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#05050c] overflow-hidden">
      <div className="grid-lines" />
      <div className="grid-pulse" />
      <style>{`
        .grid-lines {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(124,92,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124,92,255,0.18) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 80%);
        }
        .grid-pulse {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(124,92,255,0.35), transparent 60%);
          animation: grid-pulse 6s ease-in-out infinite;
        }
        @keyframes grid-pulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
