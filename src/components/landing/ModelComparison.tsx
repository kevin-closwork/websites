const ModelComparison = () => (
  <section className="container py-16">
    <div className="grid lg:grid-cols-2 gap-6">
      <article className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
        <h3 className="text-xl font-semibold">Modelo viejo</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Empresa → Busca → Contrata → Paga → Espera resultados</li>
          <li>Riesgo financiero alto y time-to-first-sale impredecible</li>
          <li>Costos de implementación de $1,000 a $5,000 USD por closer</li>
        </ol>
      </article>
      <article className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
        <h3 className="text-xl font-semibold">Modelo Closwork</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Closers elite → Evalúan tu oportunidad → Se postulan</li>
          <li>Cobran solo por cerrar. Sin salarios. Sin riesgo.</li>
        </ol>
        <p className="mt-4 text-brand font-medium">El top 12% de closers en LATAM compitiendo por trabajar contigo.</p>
      </article>
    </div>
  </section>
);

export default ModelComparison;
