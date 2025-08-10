import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

const Calculator = () => {
  const [salary, setSalary] = useState<number>(3000);
  const [count, setCount] = useState<number>(4);
  const [months, setMonths] = useState<number>(5);

  const waste = useMemo(() => salary * count * months, [salary, count, months]);

  return (
    <div className="container py-16">
      <Helmet>
        <title>Calculadora de costo oculto | Closwork</title>
        <meta name="description" content="Calcula cuánto dinero quemas con el modelo tradicional de ventas B2B." />
        <link rel="canonical" href="/calculadora" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">¿Cuánto cash estás quemando?</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur grid gap-4">
          <label className="text-sm text-muted-foreground">Salario mensual por vendedor (USD)</label>
          <Input type="number" value={salary} onChange={(e) => setSalary(parseInt(e.target.value || "0", 10))} />
          <label className="text-sm text-muted-foreground">Cantidad de vendedores</label>
          <Input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value || "0", 10))} />
          <label className="text-sm text-muted-foreground">Meses para ver resultados</label>
          <Input type="number" value={months} onChange={(e) => setMonths(parseInt(e.target.value || "0", 10))} />
          <a href="/" className="story-link text-sm">Volver al inicio</a>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
          <p className="text-muted-foreground">Costo total hundido</p>
          <div className="mt-2 text-4xl font-extrabold">${waste.toLocaleString("es-MX")}</div>
          <p className="mt-4 text-sm">Con Closwork pagas solo por cierre. El resto, lo inviertes en crecer.</p>
          <Button className="mt-6" variant="hero" size="lg" asChild>
            <a href="/">Quiero dejar de quemar cash</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
