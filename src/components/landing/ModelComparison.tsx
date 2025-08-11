const ModelComparison = () => <section className="container py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Cambiamos la forma de hacer las cosas</h2>
    <div className="grid lg:grid-cols-2 gap-6">
      <article className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
        <h3 className="text-xl font-semibold">Modelo viejo</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Empresa → Busca → Contrata → Paga → Espera resultados</li>
          <li>Riesgo financiero alto y time-to-first-sale impredecible</li>
        </ol>
      </article>
      <article className="rounded-xl border border-brand/30 bg-brand/5 p-8 backdrop-blur transform scale-105 animate-bounce-subtle">
        <h3 className="text-xl font-semibold">Modelo Closwork</h3>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Empresa →  Matchmaking → Closers elite → Cierran ventas</li>
          <li>Cobran solo por cerrar. Sin salarios. Sin riesgo.</li>
        </ol>
        <p className="mt-4 text-brand font-medium">Empresa →  Matchmaking → Closers elite → Cierran ventas</p>
      </article>
    </div>
  </section>;
export default ModelComparison;