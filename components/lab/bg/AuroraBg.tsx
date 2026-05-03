"use client";

/**
 * AuroraBg
 * --------
 * Soft animated aurora blobs via pure CSS. Zero JS, fully GPU-composited.
 * Drop behind any content: <AuroraBg /> then content over it.
 */
export default function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-[#05050c]">
      <div className="aurora-blob" style={{ left: "10%", top: "10%", background: "#7c5cff" }} />
      <div className="aurora-blob" style={{ left: "60%", top: "30%", background: "#5cffd1", animationDelay: "-6s" }} />
      <div className="aurora-blob" style={{ left: "30%", top: "70%", background: "#ff5c8a", animationDelay: "-12s" }} />
      <style>{`
        .aurora-blob {
          position: absolute;
          width: 40rem;
          height: 40rem;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.45;
          mix-blend-mode: screen;
          animation: aurora-float 18s ease-in-out infinite;
        }
        @keyframes aurora-float {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(8rem,-6rem) scale(1.2); }
          66%     { transform: translate(-6rem,8rem) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
