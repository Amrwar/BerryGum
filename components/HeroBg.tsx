/**
 * HeroBg — decorative branded background for all hero sections.
 * Uses a diagonal clip so the gradient doesn't cover the full section,
 * leaving a white wedge at the bottom-right that leads into page content.
 */
export default function HeroBg() {
  return (
    <>
      {/* Main gradient panel — diagonal bottom edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #1e0a5e 0%, #6b1890 55%, #c0005a 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 96%)",
        }}
      />

      {/* Dot grid overlay — adds texture without noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 96%)",
          opacity: 0.35,
        }}
      />

      {/* Glow — top-right corner */}
      <div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224,0,122,0.3) 0%, transparent 65%)",
        }}
      />

      {/* Glow — bottom-left, anchors the gradient visually */}
      <div
        className="absolute bottom-0 -left-16 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,10,94,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Subtle horizontal shimmer line near diagonal edge */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          bottom: "8%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.2) 60%, transparent)",
        }}
      />
    </>
  );
}
