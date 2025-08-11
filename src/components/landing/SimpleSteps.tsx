const steps = [{
  n: 1,
  t: "Creas tu oportunidad",
  d: "Los mejores closers la ven"
}, {
  n: 2,
  t: "Eliges tu dream team",
  d: "De los que se postulan"
}, {
  n: 3,
  t: "Solo pagas por resultados",
  d: "No hay salarios, no hay riesgo"
}];
const SimpleSteps = () => <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Así de simple es Closwork</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map(s => <article key={s.n} className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
          <div className="text-neon text-3xl font-extrabold">{s.n}</div>
          <h4 className="mt-2 text-lg font-semibold">{s.t}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
        </article>)}
    </div>
    <p className="text-center mt-6 text-brand font-medium">
  </p>
  </section>;
export default SimpleSteps;