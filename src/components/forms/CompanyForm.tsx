import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pixelEvents } from "@/lib/pixelEvents";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addCompanyFormData } from "@/lib/firestoreService";
import { sendCompanyNotification, sendCompanyWelcomeEmail } from "@/lib/emailService";
const ticketOptions = ["< $1K USD", "$1-5K USD", "$5-25K USD", "$25-100K USD", "> $100K USD"] as const;
const cycleOptions = ["<1 mes", "1-3 meses", "3-6 meses", ">6 meses"] as const;
const industries = ["SaaS", "Fintech", "Logística", "Ecommerce", "Salud", "Edtech", "Marketing/Ads", "Recursos Humanos", "Proptech", "Manufactura"] as const;
const countries = ["México", "Colombia", "Chile", "Brasil", "Perú", "Otros"] as const;
const employeeCountOptions = ["1-5", "6-20", "21-50", "51-100", "101-500", "501-1000", "1000+"] as const;
const schema = z.object({
  email: z.string().trim().email("Email inválido"),
  name: z.string().min(2, "Ingresa tu nombre completo"),
  companyName: z.string().min(2, "Ingresa el nombre de tu empresa"),
  employeeCount: z.enum(employeeCountOptions, { required_error: "Selecciona el tamaño de tu empresa" }),
  whatsappPhone: z.string().min(10, "Ingresa un número de WhatsApp válido").refine((val) => {
    // Validar que sea un número de teléfono válido (solo números, espacios, +, -, (, ))
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(val);
  }, "Formato de número inválido"),
  linkedin: z.string().optional().refine((val) => {
    if (!val || val.trim() === "") return true; // Campo vacío es válido
    try {
      const url = new URL(val);
      return url.hostname.includes("linkedin.com");
    } catch {
      return false;
    }
  }, "Debe ser un perfil de LinkedIn válido"),
  ticket: z.enum(ticketOptions),
  cycle: z.enum(cycleOptions),
  deals: z.number().min(1).max(50),
  what: z.string().min(5).max(140),
  industry: z.enum(industries),
  markets: z.array(z.enum(countries)).min(1, "Selecciona al menos 1 mercado"),
  sellingType: z.enum(["Inbound caliente", "Outbound frío", "Mixto"] as const),
  hasTeam: z.enum(["no", "armando", "si"] as const),
  teamSize: z.number().optional(),
  hasLeadsBase: z.enum(["no", "pequena", "mediana", "grande"] as const),
  leadsBaseSize: z.number().optional(),
  frustration: z.string().max(500).optional()
}).refine(data => data.hasTeam === "si" ? typeof data.teamSize === "number" && data.teamSize >= 1 : true, {
  path: ["teamSize"],
  message: "Indica cuántas personas"
});
export type CompanyFormValues = z.infer<typeof schema>;
interface Props {
  className?: string;
}
export const CompanyForm = ({
  className
}: Props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Verificar si viene con plan predefinido (desde EmpresasV2)
  const hasPredefinedPlan = !!params.get("plan");
  
  // Función para mapear ticket numérico a bucket
  const mapTicketToBucket = (ticketRaw: string | null): CompanyFormValues["ticket"] | undefined => {
    if (!ticketRaw) return undefined;
    const t = Number(ticketRaw);
    if (Number.isNaN(t)) return undefined;
    
    if (t < 1000) return "< $1K USD";
    if (t < 5000) return "$1-5K USD";
    if (t < 25000) return "$5-25K USD";
    if (t < 100000) return "$25-100K USD";
    return "> $100K USD";
  };
  
  const defaults: Partial<CompanyFormValues> = useMemo(() => {
    const email = params.get("email") ?? "";
    const deals = Number(params.get("deals") ?? "");
    const ticketRaw = params.get("ticket");
    
    return {
      email: email || undefined,
      deals: Number.isFinite(deals) && deals > 0 ? deals : 5,
      ticket: mapTicketToBucket(ticketRaw),
      cycle: "1-3 meses",
      sellingType: "Mixto",
      hasTeam: "no",
      hasLeadsBase: "no",
      markets: [],
      companyName: "",
      employeeCount: "1-5"
    } as Partial<CompanyFormValues>;
  }, [params]);
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaults.email ?? "",
      name: "",
      companyName: defaults.companyName ?? "",
      employeeCount: defaults.employeeCount ?? "1-5",
      whatsappPhone: "",
      linkedin: "",
      ticket: defaults.ticket ?? "$1-5K USD",
      cycle: defaults.cycle ?? "1-3 meses",
      deals: defaults.deals ?? 5,
      what: "",
      industry: "SaaS",
      markets: defaults.markets ?? [],
      sellingType: defaults.sellingType ?? "Mixto",
      hasTeam: defaults.hasTeam ?? "no",
      teamSize: undefined,
      hasLeadsBase: defaults.hasLeadsBase ?? "no",
      leadsBaseSize: undefined,
      frustration: ""
    }
  });
  const onSubmit = async (values: CompanyFormValues) => {
    try {
      console.log('🚀 Form submission started with values:', values);
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Track form submission start
      pixelEvents.initiateCheckout('Company Registration Form', 0);
      
      const finalPlan = "Plan Básico";
      
      // Enviar datos a Firebase
      console.log('📤 Sending data to Firebase...');
      await addCompanyFormData({
        email: values.email,
        name: values.name,
        companyName: values.companyName,
        employeeCount: values.employeeCount,
        whatsappPhone: values.whatsappPhone,
        linkedin: values.linkedin,
        selectedPlan: finalPlan,
        ticket: values.ticket,
        cycle: values.cycle,
        deals: values.deals,
        what: values.what,
        industry: values.industry,
        markets: values.markets,
        sellingType: values.sellingType,
        hasTeam: values.hasTeam,
        teamSize: values.teamSize,
        hasLeadsBase: values.hasLeadsBase,
        leadsBaseSize: values.leadsBaseSize,
        frustration: values.frustration,
      });
      console.log('✅ Data sent to Firebase successfully');
      
      // Enviar notificación por email (para el equipo de Closwork)
      try {
        await sendCompanyNotification(values);
        console.log('✅ Notificación por email enviada exitosamente');
      } catch (emailError) {
        console.warn('⚠️ Error enviando notificación por email:', emailError);
        // No bloqueamos el flujo si falla el email
      }

      // Enviar email de bienvenida a la empresa
      try {
        await sendCompanyWelcomeEmail(values);
        console.log('✅ Email de bienvenida enviado exitosamente');
      } catch (welcomeEmailError) {
        console.warn('⚠️ Error enviando email de bienvenida:', welcomeEmailError);
        // No bloqueamos el flujo si falla el email de bienvenida
      }
      
      // Track successful registration
      pixelEvents.completeRegistration('Company Registration');
      pixelEvents.lead('Company Registration Complete', 0);
      
      // Redirigir a la página de gracias
      const redirectParams = new URLSearchParams({
        email: String(values.email)
      });
      const redirectUrl = `/gracias-empresa?${redirectParams.toString()}`;
      console.log('🔄 Redirecting to:', redirectUrl);
      navigate(redirectUrl);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };
  const dealsValue = form.watch("deals");
  const hasTeam = form.watch("hasTeam");
  const selectedMarkets = form.watch("markets");
  return <section className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Datos esenciales</h2>
            
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre y Apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="companyName" render={({
              field
            }) => <FormItem>
                    <FormLabel>Nombre de la empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="whatsappPhone" render={({
              field
            }) => <FormItem>
                    <FormLabel>Número de WhatsApp</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+52 55 1234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="employeeCount" render={({
              field
            }) => <FormItem>
                    <FormLabel>Tamaño de la empresa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employeeCountOptions.map(option => <SelectItem key={option} value={option}>
                            {option} empleados
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="linkedin" render={({
              field
            }) => <FormItem className="md:col-span-2">
                    <FormLabel>Perfil de LinkedIn (opcional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://www.linkedin.com/in/tu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="ticket" render={({
              field
            }) => <FormItem>
                    <FormLabel>Ticket promedio de venta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ticketOptions.map(t => <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="cycle" render={({
              field
            }) => <FormItem>
                    <FormLabel>Ciclo de venta típico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un ciclo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cycleOptions.map(t => <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="deals" render={({
              field
            }) => <FormItem className="md:col-span-2">
                    <FormLabel>Meta de deals mensuales</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <FormControl>
                          <Slider min={1} max={50} step={1} value={[field.value]} onValueChange={v => field.onChange(v[0] ?? 1)} />
                        </FormControl>
                      </div>
                      <div className="w-16 text-right font-medium">
                        {dealsValue >= 50 ? "50+" : dealsValue}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>} />
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            
            <div className="grid gap-4">
              <FormField control={form.control} name="what" render={({
              field
            }) => <FormItem>
                    <FormLabel>¿Qué vendes? (máx. 140 caracteres)</FormLabel>
                    <FormControl>
                      <Textarea maxLength={140} placeholder="Ej: Plataforma SaaS para automatizar cuentas por pagar en pymes" {...field} />
                    </FormControl>
                    <div className="text-xs text-muted-foreground text-right">{String(field.value ?? "").length}/140</div>
                    <FormMessage />
                  </FormItem>} />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="industry" render={({
                field
              }) => <FormItem>
                      <FormLabel>Industria principal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona industria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map(i => <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="sellingType" render={({
                field
              }) => <FormItem>
                      <FormLabel>Tipo de venta</FormLabel>
                      <RadioGroup className="grid grid-cols-3 gap-3" value={field.value} onValueChange={field.onChange}>
                        {[
                          { value: "Inbound caliente", label: "Inbound caliente", description: "Leads que llegan solos (web, redes, referidos)" },
                          { value: "Outbound frío", label: "Outbound frío", description: "Prospectos que contactas tú directamente" },
                          { value: "Mixto", label: "Mixto", description: "Combinas ambas estrategias" }
                        ].map(opt => <label key={opt.value} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                            <RadioGroupItem value={opt.value} />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{opt.label}</span>
                              <span className="text-xs text-muted-foreground">{opt.description}</span>
                            </div>
                          </label>)}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <FormField control={form.control} name="markets" render={() => <FormItem>
                    <FormLabel>Mercados objetivo</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {countries.map(m => <label key={m} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                          <Checkbox checked={selectedMarkets?.includes(m)} onCheckedChange={checked => {
                    const value = checked === true;
                    const current = selectedMarkets ?? [];
                    const next = value ? Array.from(new Set([...current, m])) : current.filter(x => x !== m);
                    form.setValue("markets", next, {
                      shouldDirty: true,
                      shouldValidate: true
                    });
                  }} />
                          <span className="text-sm">{m}</span>
                        </label>)}
                    </div>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="hasTeam" render={({
              field
            }) => <FormItem>
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
                  </FormItem>} />

              {hasTeam === "si" && <FormField control={form.control} name="teamSize" render={({
              field
            }) => <FormItem>
                      <FormLabel>¿Con cuántas personas?</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="Ej: 4" value={field.value ?? ""} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />}
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            <h2 className="text-xl font-semibold">Base de Leads</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="hasLeadsBase" render={({
              field
            }) => <FormItem>
                    <FormLabel>¿Cuentas con una base de leads o clientes potenciales?</FormLabel>
                    <RadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-3" value={field.value} onValueChange={field.onChange}>
                      {[
                        { value: "no", label: "No", description: "Empiezo desde cero" },
                        { value: "pequena", label: "Pequeña", description: "Menos de 100 contactos" },
                        { value: "mediana", label: "Mediana", description: "100-1000 contactos" },
                        { value: "grande", label: "Grande", description: "Más de 1000 contactos" }
                      ].map(opt => <label key={opt.value} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                          <RadioGroupItem value={opt.value} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{opt.label}</span>
                            <span className="text-xs text-muted-foreground">{opt.description}</span>
                          </div>
                        </label>)}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>} />

              {form.watch("hasLeadsBase") !== "no" && <FormField control={form.control} name="leadsBaseSize" render={({
              field
            }) => <FormItem>
                      <FormLabel>¿Cuántos contactos tienes aproximadamente?</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="Ej: 250" value={field.value ?? ""} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />}
            </div>
          </article>

          <article className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
            
            <FormField control={form.control} name="frustration" render={({
            field
          }) => <FormItem>
                  <FormLabel>
                    ¿Qué es lo más frustrante de tu proceso de ventas actual?
                    <span className="text-muted-foreground"> (opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea maxLength={500} placeholder="Cuéntanos en una frase lo que más te duele" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </article>

          {submitError && (
            <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {submitError}
            </div>
          )}
          
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Tiempo estimado: 2 minutos</p>
            <Button 
              type="submit" 
              variant="success" 
              size="xl" 
              aria-label="Registrarse"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? "Enviando..." : "Registrarse"}
            </Button>
          </div>
        </form>
      </Form>
    </section>;
};