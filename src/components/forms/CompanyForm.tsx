import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "aol.com",
];

const ticketOptions = ["< $1K", "$1-5K", "$5-25K", "$25-100K", "> $100K"] as const;
const cycleOptions = ["<1 mes", "1-3 meses", "3-6 meses", ">6 meses"] as const;
const industries = [
  "SaaS",
  "Fintech",
  "Logística",
  "Ecommerce",
  "Salud",
  "Edtech",
  "Marketing/Ads",
  "Recursos Humanos",
  "Proptech",
  "Manufactura",
] as const;
const countries = ["México", "Colombia", "Chile", "Brasil", "Perú", "Otros"] as const;

const schema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Email inválido")
      .refine((val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain ? !FREE_EMAIL_DOMAINS.includes(domain) : false;
      }, "Usa tu email corporativo (no gmail/outlook)"),
    name: z.string().min(2, "Ingresa tu nombre completo"),
    linkedin: z
      .string()
      .url("URL de LinkedIn inválida")
      .includes("linkedin.com", { message: "Debe ser un perfil de LinkedIn" }),
    ticket: z.enum(ticketOptions),
    cycle: z.enum(cycleOptions),
    deals: z.number().min(1).max(50),
    what: z.string().min(5).max(140),
    industry: z.enum(industries),
    markets: z.array(z.enum(countries)).min(1, "Selecciona al menos 1 mercado"),
    sellingType: z.enum(["Inbound caliente", "Outbound frío", "Mixto"] as const),
    hasTeam: z.enum(["no", "armando", "si"] as const),
    teamSize: z.number().optional(),
    frustration: z.string().max(500).optional(),
  })
  .refine((data) => (data.hasTeam === "si" ? typeof data.teamSize === "number" && data.teamSize >= 1 : true), {
    path: ["teamSize"],
    message: "Indica cuántas personas",
  });

export type CompanyFormValues = z.infer<typeof schema>;

interface Props {
  className?: string;
}

export const CompanyForm = ({ className }: Props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const defaults: Partial<CompanyFormValues> = useMemo(() => {
    const email = params.get("email") ?? "";
    const deals = Number(params.get("deals") ?? "");
    const ticketRaw = params.get("ticket");
    // Map numeric ticket to bucket if present
    let ticket: CompanyFormValues["ticket"] | undefined;
    const t = Number(ticketRaw);
    if (!Number.isNaN(t)) {
      if (t < 1000) ticket = "< $1K";
      else if (t < 5000) ticket = "$1-5K";
      else if (t < 25000) ticket = "$5-25K";
      else if (t < 100000) ticket = "$25-100K";
      else ticket = "> $100K";
    }
    return {
      email: email || undefined,
      deals: Number.isFinite(deals) && deals > 0 ? deals : 5,
      ticket,
      cycle: "1-3 meses",
      sellingType: "Mixto",
      hasTeam: "no",
      markets: [],
    } as Partial<CompanyFormValues>;
  }, [params]);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaults.email ?? "",
      name: "",
      linkedin: "",
      ticket: defaults.ticket ?? "$1-5K",
      cycle: defaults.cycle ?? "1-3 meses",
      deals: defaults.deals ?? 5,
      what: "",
      industry: "SaaS",
      markets: defaults.markets ?? [],
      sellingType: defaults.sellingType ?? "Mixto",
      hasTeam: defaults.hasTeam ?? "no",
      teamSize: undefined,
      frustration: "",
    },
  });

  const onSubmit = (values: CompanyFormValues) => {
    // In a real app we would send to backend here
    // For now we redirect to success with share-ready email
    const params = new URLSearchParams({ success: "1", email: String(values.email) });
    navigate(`/solicitud?${params.toString()}`);
  };

  const dealsValue = form.watch("deals");
  const hasTeam = form.watch("hasTeam");
  const selectedMarkets = form.watch("markets");

  return (
    <section className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Datos esenciales</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email corporativo</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="ceo@tuempresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre y Apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Perfil de LinkedIn</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://www.linkedin.com/in/tu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket promedio de venta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ticketOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciclo de venta típico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un ciclo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cycleOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deals"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Meta de deals mensuales</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <FormControl>
                          <Slider
                            min={1}
                            max={50}
                            step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0] ?? 1)}
                          />
                        </FormControl>
                      </div>
                      <div className="w-16 text-right font-medium">
                        {dealsValue >= 50 ? "50+" : dealsValue}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Matchmaking</h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="what"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Qué vendes? (máx. 140 caracteres)</FormLabel>
                    <FormControl>
                      <Textarea maxLength={140} placeholder="Ej: Plataforma SaaS para automatizar cuentas por pagar en pymes" {...field} />
                    </FormControl>
                    <div className="text-xs text-muted-foreground text-right">{String(field.value ?? "").length}/140</div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industria principal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona industria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((i) => (
                            <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de venta</FormLabel>
                      <RadioGroup className="grid grid-cols-3 gap-3" value={field.value} onValueChange={field.onChange}>
                        {["Inbound caliente", "Outbound frío", "Mixto"].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                            <RadioGroupItem value={opt} />
                            <span className="text-sm">{opt}</span>
                          </label>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="markets"
                render={() => (
                  <FormItem>
                    <FormLabel>Mercados objetivo</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {countries.map((m) => (
                        <label key={m} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                          <Checkbox
                            checked={selectedMarkets?.includes(m)}
                            onCheckedChange={(checked) => {
                              const value = checked === true;
                              const current = selectedMarkets ?? [];
                              const next = value ? Array.from(new Set([...current, m])) : current.filter((x) => x !== m);
                              form.setValue("markets", next, { shouldDirty: true, shouldValidate: true });
                            }}
                          />
                          <span className="text-sm">{m}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Tienes equipo de ventas actual?</FormLabel>
                    <RadioGroup className="grid grid-cols-3 gap-3" value={field.value} onValueChange={field.onChange}>
                      <label className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                        <RadioGroupItem value="no" />
                        <span className="text-sm">No</span>
                      </label>
                      <label className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                        <RadioGroupItem value="armando" />
                        <span className="text-sm">Lo estoy armando</span>
                      </label>
                      <label className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                        <RadioGroupItem value="si" />
                        <span className="text-sm">Sí</span>
                      </label>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {hasTeam === "si" && (
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Con cuántas personas?</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="Ej: 4" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">El hook final</h2>
            <FormField
              control={form.control}
              name="frustration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué es lo más frustrante de tu proceso de ventas actual?
                    <span className="text-muted-foreground"> (opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea maxLength={500} placeholder="Cuéntanos en una frase lo que más te duele" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </article>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Tiempo estimado: 2 minutos</p>
            <Button type="submit" variant="hero" size="xl" aria-label="Activar mi Botón Mágico">
              Activar mi Botón Mágico
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
