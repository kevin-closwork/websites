import { Calendar, DollarSign, Skull } from "lucide-react";

const items = [
  {
    title: "4-6 meses para armar un equipo de ventas",
    desc: "Contratación, ramp-up, playbooks… y el reloj corriendo.",
    Icon: Calendar,
  },
  {
    title: "Hasta $10K USD mensuales sin garantía de resultados",
    desc: "Nómina, comisiones, herramientas, management.",
    Icon: DollarSign,
  },
  {
    title: "68% de startups mueren por no vender",
    desc: "No por producto. Por go-to-market lento y caro.",
    Icon: Skull,
  },
];

const PainPoints = () => (
  <section className="container py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Sabemos lo difícil que es vender
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(({ title, desc, Icon }) => (
        <article key={title} className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
          <Icon className="text-neon" />
          <h3 className="mt-4 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        </article>
      ))}
    </div>
  </section>
);

export default PainPoints;
