import { useEffect, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

const locales = 'es-MX';

const LiveRevenueCounter = () => {
  const [value, setValue] = useState<number>(() => {
    // seed with a realistic number
    const now = new Date();
    const seed = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) * 12;
    return 85000 + (seed % 50000);
  });

  useEffect(() => {
    const i = setInterval(() => {
      // Add a random income chunk
      const bump = Math.floor(200 + Math.random() * 2200);
      setValue((v) => v + bump);
    }, 1800);
    return () => clearInterval(i);
  }, []);

  const formatted = useMemo(() => new Intl.NumberFormat(locales, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value), [value]);

  return (
    <div className="inline-flex items-baseline gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3 backdrop-blur">
      <span className="text-sm text-muted-foreground">Revenue generado hoy</span>
      <div className="flex items-center gap-2">
        <strong className="text-2xl md:text-3xl font-extrabold tracking-tight animate-fade-in text-success-green">
          {formatted}
        </strong>
        <TrendingUp className="text-success-green animate-pulse" size={24} />
      </div>
    </div>
  );
};

export default LiveRevenueCounter;
