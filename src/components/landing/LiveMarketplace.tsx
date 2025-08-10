import LatamMap from "./LatamMap";

const stat = (label: string, value: string) => (
  <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="mt-1 text-2xl font-extrabold tracking-tight">{value}</div>
  </div>
);

const LiveMarketplace = () => (
  <section className="container py-16">
    <div className="grid md:grid-cols-4 gap-4">
      {stat("Closers activos ahora", "247")}
      {stat("Oportunidades abiertas", "89")}
      {stat("Match rate", "72%")}
      {stat("Tiempo al primer deal", "14 días")}
    </div>
    <div className="mt-6">
      <LatamMap />
    </div>
  </section>
);

export default LiveMarketplace;
