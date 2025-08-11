const ModelComparison = () => (
  <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Cambiamos las cosas para bajar el riesgo</h2>
    <div className="grid lg:grid-cols-2 gap-6">
      <article className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
        <h3 className="text-xl font-semibold">Modelo viejo</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Empresa → Busca → Contrata → Paga → Espera resultados</li>
          <li>Riesgo financiero alto y time-to-first-sale impredecible</li>
          <li>Costos de implementación de $1,000 a $5,000 USD por closer</li>
        </ol>
      </article>
      <article className="rounded-xl border border-primary/30 bg-gradient-success/10 p-6 backdrop-blur shadow-success relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary/5 rounded-xl"></div>
        <h3 className="text-xl font-semibold text-primary relative z-10">Modelo Closwork</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside relative z-10">
          <li>Closers elite → Evalúan tu oportunidad → Se postulan</li>
          <li>Cobran solo por cerrar. Sin salarios. Sin riesgo.</li>
        </ol>
        <p className="mt-4 text-brand font-medium relative z-10">El top 12% de closers en LATAM compitiendo por trabajar contigo.</p>
      </article>
    </div>
  </section>
);

export default ModelComparison;
