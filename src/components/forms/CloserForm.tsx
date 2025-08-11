import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const yearsOptions = ["<1", "1-2", "3-5", "5-10", ">10"] as const;
const ticketSweet = ["< $5K", "$5-25K", "$25-100K", "> $100K"] as const;
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
const markets = [
  "México",
  "Colombia",
  "Chile",
  "Brasil",
  "Perú",
  "Argentina",
  "Centroamérica",
  "US",
  "Europa",
] as const;

const schema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Email inválido")
      .refine((val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain ? !FREE_EMAIL_DOMAINS.includes(domain) : false;
      }, "Email profesional (no gmail/outlook)"),
    linkedin: z
      .string()
      .url("URL inválida")
      .includes("linkedin.com", { message: "Debe ser LinkedIn" }),
    whatsapp: z.string().min(7, "Número inválido"),
    years: z.enum(yearsOptions),
    biggestDeal: z.coerce.number().positive("Ingresa un monto en USD"),

    expertIndustries: z.array(z.enum(industries)).min(1).max(3),
    ticket: z.enum(ticketSweet),
    soldMarkets: z.array(z.enum(markets)).min(1),
    superpower: z.enum([
      "Hunter",
      "Farmer",
      "Técnico",
      "Relationship",
      "Speedster",
    ] as const),

    dealsLastQ: z.coerce.number().min(0),
    revenueLastYear: z.enum(["< $50K", "$50-200K", "$200-500K", "> $500K"] as const),
    employment: z.enum([
      "Sí full-time",
      "Sí pero busco side-hustle",
      "Freelance",
      "Disponible",
    ] as const),

    epicDeal: z.string().min(20).max(280),
  })
  .refine((data) => data.expertIndustries.length <= 3, {
    path: ["expertIndustries"],
    message: "Máximo 3 industrias",
  });

export type CloserFormValues = z.infer<typeof schema>;

interface Props {
  className?: string;
}

export const CloserForm = ({ className }: Props) => {
  const navigate = useNavigate();
  const form = useForm<CloserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      linkedin: "",
      whatsapp: "",
      years: "3-5",
      biggestDeal: undefined,
      expertIndustries: [],
      ticket: "$5-25K",
      soldMarkets: [],
      superpower: "Hunter",
      dealsLastQ: 0,
      revenueLastYear: "$50-200K",
      employment: "Disponible",
      epicDeal: "",
    },
  });

  const selectedIndustries = form.watch("expertIndustries");

  const onSubmit = (values: CloserFormValues) => {
    const params = new URLSearchParams({ email: String(values.email) });
    navigate(`/gracias-closer?${params.toString()}`);
  };

  const toggleArray = <T,>(arr: T[], value: T) => {
    return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
  };

  const maxSelected = selectedIndustries?.length >= 3;

  return (
    <section className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Validación inicial</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email profesional</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@portfolio.dev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn (obligatorio)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://www.linkedin.com/in/tu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+52 55 1234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Años cerrando B2B</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearsOptions.map((t) => (
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
                name="biggestDeal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal más grande cerrado (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ej: 85000" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Tu expertise</h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="expertIndustries"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Industrias dominadas
                      <span className="text-muted-foreground"> (máx. 3)</span>
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {industries.map((i) => {
                        const checked = selectedIndustries?.includes(i);
                        const disabled = !checked && maxSelected;
                        return (
                          <label key={i} className={cn("flex items-center gap-2 rounded-md border p-2 cursor-pointer", disabled && "opacity-60")}> 
                            <Checkbox
                              checked={checked}
                              disabled={disabled}
                              onCheckedChange={() => {
                                const next = toggleArray(selectedIndustries ?? [], i);
                                form.setValue("expertIndustries", next, { shouldDirty: true, shouldValidate: true });
                              }}
                            />
                            <span className="text-sm">{i}</span>
                          </label>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ticket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket sweet spot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ticketSweet.map((t) => (
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
                  name="superpower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tu superpoder</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Hunter", "Farmer", "Técnico", "Relationship", "Speedster"].map((t) => (
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
              </div>

              <FormField
                control={form.control}
                name="soldMarkets"
                render={() => (
                  <FormItem>
                    <FormLabel>Mercados donde has vendido</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {markets.map((m) => (
                        <label key={m} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                          <Checkbox
                            checked={form.getValues("soldMarkets")?.includes(m)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("soldMarkets") ?? [];
                              const next = checked === true ? Array.from(new Set([...current, m])) : current.filter((x: string) => x !== m);
                              form.setValue("soldMarkets", next, { shouldDirty: true, shouldValidate: true });
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
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Performance</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dealsLastQ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deals cerrados último trimestre</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="revenueLastYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revenue generado último año</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["< $50K", "$50-200K", "$200-500K", "> $500K"].map((t) => (
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
                name="employment"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>¿Actualmente empleado?</FormLabel>
                    <RadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-3" value={field.value} onValueChange={field.onChange}>
                      {["Sí full-time", "Sí pero busco side-hustle", "Freelance", "Disponible"].map((opt) => (
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
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">La pregunta killer</h2>
            <FormField
              control={form.control}
              name="epicDeal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe tu deal más épico (máx. 280 caracteres)</FormLabel>
                  <FormControl>
                    <Textarea maxLength={280} placeholder="Cuenta la historia del cierre que te define como closer" {...field} />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">{String(field.value ?? "").length}/280</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </article>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Tiempo estimado: 2 minutos</p>
            <Button type="submit" variant="hero" size="xl" aria-label="Unirme a la Elite">
              Unirme a la Elite
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
