"use client";

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Left: Blue Aura (reduced animation for performance) */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[120%] h-[100%] bg-blue-600/10 blur-[150px] rounded-full will-change-opacity"
        style={{
          animation: "pulse-subtle 12s ease-in-out infinite",
        }}
      />

      {/* Bottom Right: Warm Orange Tint */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/5 blur-[120px] rounded-full will-change-opacity"
        style={{
          animation: "pulse-subtle 15s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      {/* Center: Extremely faint Purple glow - Static */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/[0.03] blur-[130px] rounded-full" />
    </div>
  );
}
