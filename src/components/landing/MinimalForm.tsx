import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MinimalForm = () => {
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState<number>(1000);
  const [deals, setDeals] = useState<number>(5);
  const navigate = useNavigate();

  const canSubmit = useMemo(() => email.includes("@") && ticket > 0 && deals > 0, [email, ticket, deals]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const params = new URLSearchParams({ email, ticket: String(ticket), deals: String(deals) });
    navigate(`/solicitud?${params.toString()}`);
  };

  return (
    <section className="w-full max-w-xl mx-auto">
      <Helmet>
        <link rel="canonical" href="/" />
      </Helmet>
      <form onSubmit={onSubmit} className="grid gap-4 bg-card/60 p-6 rounded-xl border border-border backdrop-blur">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm text-muted-foreground">Tu email</label>
          <Input id="email" type="email" placeholder="ceo@tuempresa.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label htmlFor="ticket" className="text-sm text-muted-foreground">Ticket promedio (USD)</label>
          <Input id="ticket" type="number" min={50} step={50} value={ticket} onChange={(e) => setTicket(parseInt(e.target.value || "0", 10))} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>¿Cuántos deals necesitas este mes?</span>
            <span className="text-foreground font-medium">{deals}</span>
          </div>
          <Slider value={[deals]} onValueChange={(v) => setDeals(v[0] ?? 1)} min={1} max={50} step={1} className="py-2" />
        </div>
        <Button type="submit" variant="success" size="xl" className="mt-2" disabled={!canSubmit} aria-label="Enviar solicitud a closers">
          Activar mi botón mágico
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Al continuar aceptas ser contactado por closers verificados en Closwork.
        </p>
      </form>
    </section>
  );
};

export default MinimalForm;
