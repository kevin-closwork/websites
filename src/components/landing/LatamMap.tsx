type Ping = { x: number; y: number; city: string };

const pings: Ping[] = [
  { x: 22, y: 30, city: "CDMX" },
  { x: 34, y: 62, city: "Bogotá" },
  { x: 46, y: 72, city: "Lima" },
  { x: 56, y: 48, city: "Santiago" },
  { x: 62, y: 24, city: "São Paulo" },
];

const LatamMap = () => {
  return (
    <div className="relative w-full h-64 rounded-xl border border-border bg-[radial-gradient(1200px_circle_at_center,hsl(var(--brand)/0.08),transparent_60%)] overflow-hidden">
      {pings.map((p, i) => (
        <div
          key={`${p.city}-${i}`}
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/90 shadow-glow"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className="absolute inset-0 rounded-full bg-neon/40 animate-[ping_1.5s_ease-out_infinite]" />
          <span className="absolute inset-0 rounded-full bg-neon/20 animate-[ping_2s_ease-out_infinite]" />
        </div>
      ))}
    </div>
  );
};

export default LatamMap;
