/**
 * HeroBg — professional aurora-style hero background.
 * Soft overlapping glow orbs on a deep-dark base, fading smoothly
 * to white at the bottom so it blends into page content naturally.
 */
export default function HeroBg() {
  return (
    <>
      {/* Deep dark base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, #0e0025 0%, #180038 55%, #0a0018 100%)",
        }}
      />

      {/* Center bloom — purple/violet, the hero's focal glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          width: "75vw",
          height: "420px",
          background:
            "radial-gradient(ellipse, rgba(130,30,180,0.38) 0%, rgba(90,15,140,0.18) 45%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Top-right orb — hot pink accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8%",
          right: "-4%",
          width: "42vw",
          height: "55%",
          background:
            "radial-gradient(ellipse, rgba(210,0,110,0.25) 0%, rgba(180,0,80,0.1) 50%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      {/* Bottom-left orb — deep indigo, grounds the composition */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          left: "-6%",
          width: "38vw",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(30,10,94,0.5) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Smooth white fade at the bottom — blends hero into page content */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "35%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 50%, white 100%)",
        }}
      />
    </>
  );
}
