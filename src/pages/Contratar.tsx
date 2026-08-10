import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import {
  getCurrentOrder,
  getFrameworkDoc,
  getPrivacyDoc,
  legalDocRoute,
} from "@/lib/legal/registry";
import {
  calculateOrderTotal,
  formatUsd,
  noExtraFeesLine,
} from "@/lib/legal/pricing";
import { createAcceptance } from "@/lib/legal/acceptanceService";
import { getStripeCheckoutUrl } from "@/lib/stripeConfig";
import { toast } from "sonner";

const TAX_REGIMES = [
  { code: "601", label: "601 — General de Ley Personas Morales" },
  { code: "603", label: "603 — Personas Morales con fines no lucrativos" },
  { code: "606", label: "606 — Arrendamiento" },
  { code: "612", label: "612 — Persona Física con Actividades Empresariales" },
  { code: "626", label: "626 — Régimen Simplificado de Confianza" },
];

const ESTADOS = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango",
  "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

const RFC_PF = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/i;
const RFC_PM = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_LABELS: Record<string, string> = {
  legalName: "razón social",
  rfc: "RFC",
  taxRegime: "régimen fiscal",
  calle: "calle",
  numero: "número exterior",
  colonia: "colonia",
  municipio: "municipio",
  estado: "estado",
  cp: "código postal",
  signerName: "nombre del firmante",
  signerRole: "cargo del firmante",
  email: "correo electrónico",
  phone: "teléfono",
  vertical: "vertical",
  closerCommission: "comisión del closer",
  leadVolume: "volumen de leads",
  competitors: "competidores directos",
  tools: "herramientas",
};

function validateRfc(rfc: string): boolean {
  const v = rfc.trim().toUpperCase();
  return RFC_PF.test(v) || RFC_PM.test(v);
}

function Section({
  id,
  step,
  title,
  hint,
  children,
}: {
  id: string;
  step: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 id={id} className="text-lg font-semibold text-secondary">
          <span className="text-primary">{step}.</span> {title}
        </h2>
        {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className} data-invalid={error ? "true" : undefined}>
      <Label className="text-sm">{label}</Label>
      <div className={`mt-1.5 ${error ? "[&_input]:border-destructive [&>button]:border-destructive" : ""}`}>
        {children}
      </div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export default function Contratar() {
  const framework = getFrameworkDoc();
  const order = getCurrentOrder("concierge");
  const privacy = getPrivacyDoc();
  const pricing = order?.pricing;
  const guarantees = order?.guarantees;

  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Identificación fiscal
  const [legalName, setLegalName] = useState("");
  const [rfc, setRfc] = useState("");
  const [taxRegime, setTaxRegime] = useState("");
  const [fiscalAddress, setFiscalAddress] = useState({
    calle: "",
    numero: "",
    numeroInt: "",
    colonia: "",
    municipio: "",
    estado: "",
    cp: "",
  });
  const [signerName, setSignerName] = useState("");
  const [signerRole, setSignerRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Parámetros operativos
  const [vertical, setVertical] = useState("");
  const [directCompetitors, setDirectCompetitors] = useState<string[]>([""]);
  const [closerCommission, setCloserCommission] = useState("");
  const [leadVolume, setLeadVolume] = useState("");
  const [leadPeriod, setLeadPeriod] = useState<"semana" | "mes">("mes");
  const [tools, setTools] = useState<string[]>([]);
  const [toolsOther, setToolsOther] = useState("");

  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [cbTerms, setCbTerms] = useState(false);
  const [cbRecurring, setCbRecurring] = useState(false);
  const [cbMerchant, setCbMerchant] = useState(false);
  const [tsTerms, setTsTerms] = useState<string | null>(null);
  const [tsRecurring, setTsRecurring] = useState<string | null>(null);
  const [tsMerchant, setTsMerchant] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setScrolledToEnd(true);
    }
  }, []);

  // Documento más corto que la caja: no hay scroll posible, ya está leído.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollHeight <= el.clientHeight + 24) setScrolledToEnd(true);
  }, []);

  // El paquete base es lo único contratable en línea; los closers adicionales
  // se agregan después mediante Convenio Modificatorio.
  const breakdown = useMemo(() => {
    if (!pricing) return null;
    return calculateOrderTotal(pricing, 0);
  }, [pricing]);

  const totalClosers = pricing?.base_included_closers ?? 0;

  const errors: Record<string, string> = {};
  if (legalName.trim().length < 3) {
    errors.legalName = "Escriba la razón social o nombre legal completo.";
  }
  if (!validateRfc(rfc)) {
    errors.rfc = "RFC inválido: 12 caracteres (persona moral) o 13 (persona física).";
  }
  if (!taxRegime) errors.taxRegime = "Seleccione un régimen fiscal.";
  if (!fiscalAddress.calle.trim()) errors.calle = "Requerido.";
  if (!fiscalAddress.numero.trim()) errors.numero = "Requerido. Escriba S/N si no aplica.";
  if (!fiscalAddress.colonia.trim()) errors.colonia = "Requerido.";
  if (!fiscalAddress.municipio.trim()) errors.municipio = "Requerido.";
  if (!fiscalAddress.estado) errors.estado = "Seleccione un estado.";
  if (!/^\d{5}$/.test(fiscalAddress.cp)) errors.cp = "Deben ser 5 dígitos.";
  if (!signerName.trim()) errors.signerName = "Requerido.";
  if (!signerRole.trim()) errors.signerRole = "Requerido.";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Escriba un correo válido.";
  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Escriba al menos 10 dígitos.";
  }
  if (!vertical.trim()) errors.vertical = "Requerido.";
  if (!closerCommission.trim()) errors.closerCommission = "Requerido.";
  if (!leadVolume.trim()) errors.leadVolume = "Requerido.";
  if (directCompetitors.filter((c) => c.trim()).length < 1) {
    errors.competitors = "Indique al menos un competidor directo.";
  }
  if (tools.filter((t) => t !== "Otro").length === 0 && !toolsOther.trim()) {
    errors.tools = "Seleccione al menos una herramienta.";
  }

  const FISCAL_KEYS = [
    "legalName", "rfc", "taxRegime", "calle", "numero", "colonia",
    "municipio", "estado", "cp", "signerName", "signerRole", "email", "phone",
  ];
  const fiscalValid = FISCAL_KEYS.every((k) => !errors[k]);
  const operationalValid = ["vertical", "closerCommission", "leadVolume", "competitors", "tools"]
    .every((k) => !errors[k]);
  const pendingFields = Object.keys(errors).map((k) => FIELD_LABELS[k] ?? k);

  /** Muestra el error solo si el campo ya fue tocado o si se intentó pagar. */
  const errFor = (key: string, touched: unknown) =>
    showErrors || String(touched ?? "").trim() ? errors[key] : undefined;

  const acceptanceReady =
    cbTerms &&
    cbRecurring &&
    cbMerchant &&
    scrolledToEnd &&
    tsTerms &&
    tsRecurring &&
    tsMerchant;

  const toggleTool = (t: string) => {
    setTools((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async () => {
    if (!framework || !order || !privacy || !pricing || !breakdown) return;
    if (!acceptanceReady) return;
    if (!fiscalValid || !operationalValid) {
      setShowErrors(true);
      toast.error("Revise los campos marcados en rojo.");
      document
        .querySelector("[data-invalid='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const formPayload = {
      legalName,
      rfc: rfc.toUpperCase(),
      taxRegime,
      fiscalAddress,
      signerName,
      signerRole,
      email,
      phone,
      vertical,
      directCompetitors: directCompetitors.filter((c) => c.trim()),
      closerCommission,
      leadVolume,
      leadPeriod,
      tools: toolsOther ? [...tools.filter((t) => t !== "Otro"), toolsOther] : tools,
    };

    let acceptanceId = "";
    try {
      acceptanceId = await createAcceptance({
        customer: {
          legalName,
          rfc: rfc.toUpperCase(),
          taxRegime,
          fiscalAddress,
          signerName,
          signerRole,
          email: email.trim(),
          phone,
        },
        frameworkDocId: framework.docId,
        frameworkVersion: framework.version,
        frameworkHash: framework.hash,
        orderDocId: order.docId,
        orderVersion: order.version,
        orderHash: order.hash,
        privacyVersion: privacy.version,
        privacyHash: privacy.hash,
        method: "WEB_CLICKWRAP",
        ipAddress: "client",
        userAgent: navigator.userAgent,
        scrolledToEnd,
        checkboxTerms: tsTerms!,
        checkboxRecurring: tsRecurring!,
        checkboxMerchant: tsMerchant!,
        formPayload,
        totalClosers,
        monthlyAmountCents: Math.round(breakdown.totalUsd * 100),
        currency: breakdown.currency,
      });
    } catch (e) {
      // El registro de la aceptación no debe impedir el cobro; se reconstruye
      // desde Stripe con el correo si llegara a fallar.
      console.error("No se pudo guardar la aceptación", e);
    }

    const url = new URL(getStripeCheckoutUrl("planConcierge"));
    url.searchParams.set("prefilled_email", email.trim());
    if (acceptanceId) url.searchParams.set("client_reference_id", acceptanceId);
    window.location.href = url.toString();
  };

  if (!framework || !order || !pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-muted-foreground">Documentos legales no disponibles.</p>
      </div>
    );
  }

  const combinedLegal = `${framework.markdown}\n\n---\n\n${order.markdown}`;
  const feesLine = noExtraFeesLine(pricing);
  const maxCompetitors = guarantees?.max_direct_competitors ?? 5;

  return (
    <>
      <Helmet>
        <title>Contratar Plan Concierge — Closwork</title>
        <meta
          name="description"
          content="Contratación en línea del Plan Concierge con aceptación electrónica conforme al Código de Comercio."
        />
      </Helmet>
      <div className="min-h-screen landing-page flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-secondary">Contratar Plan Concierge</h1>
            <p className="mt-2 text-muted-foreground">
              Lea el contrato en el recuadro y capture sus datos más abajo. El pago se
              habilita al completar la lectura y las tres aceptaciones.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link to={legalDocRoute(framework)} className="text-primary hover:underline">
                Contrato Marco v{framework.version}
              </Link>
              <Link to={legalDocRoute(order)} className="text-primary hover:underline">
                Orden de Servicio {order.orderCode}
              </Link>
              <button
                type="button"
                className="text-muted-foreground hover:text-secondary"
                onClick={() =>
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Ir al formulario ↓
              </button>
            </div>
          </header>

          {/* 1 — El acuerdo, antes de cualquier captura de datos */}
          <section aria-labelledby="acuerdo" className="mb-10">
            <div className="mb-3 flex items-end justify-between gap-4">
              <h2 id="acuerdo" className="text-lg font-semibold text-secondary">
                <span className="text-primary">1.</span> Contrato Marco y Orden de Servicio
              </h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  scrolledToEnd
                    ? "bg-primary/10 text-primary"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {scrolledToEnd ? "✓ Documento leído" : "Desplácese hasta el final"}
              </span>
            </div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              tabIndex={0}
              className="h-[60vh] min-h-[380px] overflow-y-auto rounded-xl border border-border bg-card p-6
              prose prose-sm max-w-none
              prose-headings:text-secondary prose-p:text-foreground
              prose-a:text-primary prose-strong:text-secondary
              prose-blockquote:border-l-primary prose-li:marker:text-primary
              prose-table:text-xs"
            >
              <BlogMarkdown markdown={combinedLegal} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Contrato Marco v{framework.version} · Orden de Servicio {order.orderCode} ·
              SHA-256 {framework.hash.slice(0, 12)}… / {order.hash.slice(0, 12)}…
            </p>
          </section>

          {/* 2 — Captura de datos, debajo del contrato */}
          <div ref={formRef} className="space-y-6">
            <Section
              id="datos-fiscales"
              step="2"
              title="Datos fiscales"
              hint="Tal como aparecen en su Constancia de Situación Fiscal. Con ellos se emite el CFDI."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                <Field
                  label="Razón social o nombre legal"
                  className="md:col-span-6"
                  error={errFor("legalName", legalName)}
                >
                  <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} />
                </Field>
                <Field
                  label="RFC"
                  className="md:col-span-2"
                  error={errFor("rfc", rfc)}
                >
                  <Input
                    value={rfc}
                    maxLength={13}
                    placeholder="XAXX010101000"
                    onChange={(e) =>
                      setRfc(e.target.value.toUpperCase().replace(/[^A-ZÑ&0-9]/g, ""))
                    }
                  />
                </Field>
                <Field
                  label="Régimen fiscal"
                  className="md:col-span-4"
                  error={errFor("taxRegime", taxRegime)}
                >
                  <Select value={taxRegime} onValueChange={setTaxRegime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona régimen" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAX_REGIMES.map((r) => (
                        <SelectItem key={r.code} value={r.code}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Domicilio fiscal
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                <Field
                  label="Calle"
                  className="md:col-span-4"
                  error={errFor("calle", fiscalAddress.calle)}
                >
                  <Input
                    value={fiscalAddress.calle}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, calle: e.target.value }))
                    }
                  />
                </Field>
                <Field
                  label="Núm. exterior"
                  className="md:col-span-1"
                  error={errFor("numero", fiscalAddress.numero)}
                >
                  <Input
                    value={fiscalAddress.numero}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, numero: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Núm. interior" className="md:col-span-1">
                  <Input
                    value={fiscalAddress.numeroInt}
                    placeholder="Opcional"
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, numeroInt: e.target.value }))
                    }
                  />
                </Field>
                <Field
                  label="Colonia"
                  className="md:col-span-3"
                  error={errFor("colonia", fiscalAddress.colonia)}
                >
                  <Input
                    value={fiscalAddress.colonia}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, colonia: e.target.value }))
                    }
                  />
                </Field>
                <Field
                  label="Municipio o alcaldía"
                  className="md:col-span-3"
                  error={errFor("municipio", fiscalAddress.municipio)}
                >
                  <Input
                    value={fiscalAddress.municipio}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, municipio: e.target.value }))
                    }
                  />
                </Field>
                <Field
                  label="Estado"
                  className="md:col-span-4"
                  error={errFor("estado", fiscalAddress.estado)}
                >
                  <Select
                    value={fiscalAddress.estado}
                    onValueChange={(v) => setFiscalAddress((a) => ({ ...a, estado: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS.map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Código postal"
                  className="md:col-span-2"
                  error={errFor("cp", fiscalAddress.cp)}
                >
                  <Input
                    inputMode="numeric"
                    maxLength={5}
                    value={fiscalAddress.cp}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({
                        ...a,
                        cp: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </Field>
              </div>
            </Section>

            <Section
              id="firmante"
              step="3"
              title="Firmante y contacto"
              hint="Quien acepta el contrato debe contar con facultades para obligar a la empresa."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Nombre completo del firmante"
                  error={errFor("signerName", signerName)}
                >
                  <Input value={signerName} onChange={(e) => setSignerName(e.target.value)} />
                </Field>
                <Field label="Cargo" error={errFor("signerRole", signerRole)}>
                  <Input
                    value={signerRole}
                    placeholder="Administrador único, Director General…"
                    onChange={(e) => setSignerRole(e.target.value)}
                  />
                </Field>
                <Field
                  label="Correo electrónico"
                  error={errFor("email", email)}
                  hint="Aquí llegan el Resumen de Contratación, el CFDI y las notificaciones (Cláusula 19)."
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field
                  label="Teléfono (10 dígitos)"
                  error={errFor("phone", phone)}
                >
                  <Input
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            {breakdown ? (
              <Section
                id="plan"
                step="4"
                title="Plan y precio"
                hint={`Incluye ${pricing.base_included_closers} closers certificados. Los closers adicionales se agregan después con su ejecutivo.`}
              >
                <div className="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      Plan Concierge · {totalClosers} closers certificados
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Base {formatUsd(breakdown.subtotalUsd)} + I.V.A.{" "}
                      {formatUsd(breakdown.ivaUsd)}, ya incluido en el total.
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-secondary">
                    {formatUsd(breakdown.totalUsd)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">/mes</span>
                  </p>
                </div>
                {feesLine ? (
                  <p className="mt-4 border-l-4 border-primary pl-3 text-sm font-medium text-secondary">
                    {feesLine}
                  </p>
                ) : null}
              </Section>
            ) : null}

            <Section
              id="operativos"
              step="5"
              title="Parámetros operativos"
              hint="Definen el alcance de las garantías de las Cláusulas 6, 7 y 13."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Vertical o industria" error={errFor("vertical", vertical)}>
                  <Input
                    value={vertical}
                    placeholder="SaaS B2B, seguros, inmobiliaria…"
                    onChange={(e) => setVertical(e.target.value)}
                  />
                </Field>
                <Field
                  label="Comisión que pagará al closer"
                  error={errFor("closerCommission", closerCommission)}
                  hint="Closwork no la retiene ni percibe parte de ella (Cláusula 9)."
                >
                  <Input
                    value={closerCommission}
                    placeholder="10% del ticket o $2,000 MXN por venta"
                    onChange={(e) => setCloserCommission(e.target.value)}
                  />
                </Field>
                <Field
                  label="Volumen de leads comprometido"
                  error={errFor("leadVolume", leadVolume)}
                >
                  <Input
                    inputMode="numeric"
                    value={leadVolume}
                    placeholder="120"
                    onChange={(e) => setLeadVolume(e.target.value)}
                  />
                </Field>
                <Field label="Periodo">
                  <Select
                    value={leadPeriod}
                    onValueChange={(v) => setLeadPeriod(v as "semana" | "mes")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semana">Por semana</SelectItem>
                      <SelectItem value="mes">Por mes</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="mt-6">
                <Label className="text-sm">Competidores directos</Label>
                <p className="mb-2 mt-1 text-xs text-muted-foreground">
                  Empresas a las que Closwork no asignará a sus closers. Mínimo 1, máximo{" "}
                  {maxCompetitors}.
                </p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {directCompetitors.map((c, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={c}
                        placeholder={`Competidor ${i + 1}`}
                        onChange={(e) => {
                          const next = [...directCompetitors];
                          next[i] = e.target.value;
                          setDirectCompetitors(next);
                        }}
                      />
                      {directCompetitors.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Quitar competidor ${i + 1}`}
                          onClick={() =>
                            setDirectCompetitors(
                              directCompetitors.filter((_, idx) => idx !== i)
                            )
                          }
                        >
                          ×
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </div>
                {errFor("competitors", directCompetitors.join("")) ? (
                  <p className="mt-2 text-xs font-medium text-destructive">
                    {errors.competitors}
                  </p>
                ) : null}
                {directCompetitors.length < maxCompetitors ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-0 text-primary hover:bg-transparent"
                    onClick={() => setDirectCompetitors([...directCompetitors, ""])}
                  >
                    + Agregar competidor
                  </Button>
                ) : null}
              </div>

              <div className="mt-6">
                <Label className="text-sm">Herramientas y accesos que aporta</Label>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
                  {["CRM", "WhatsApp", "Zoom", "Calendly", "Otro"].map((t) => (
                    <label key={t} className="flex cursor-pointer items-center gap-2 text-sm">
                      <Checkbox
                        checked={tools.includes(t)}
                        onCheckedChange={() => toggleTool(t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
                {tools.includes("Otro") ? (
                  <Input
                    className="mt-3 md:max-w-sm"
                    placeholder="¿Cuál?"
                    value={toolsOther}
                    onChange={(e) => setToolsOther(e.target.value)}
                  />
                ) : null}
                {errFor("tools", tools.join("")) ? (
                  <p className="mt-2 text-xs font-medium text-destructive">{errors.tools}</p>
                ) : null}
              </div>
            </Section>

            <Section
              id="aceptacion"
              step="6"
              title="Aceptación y pago"
              hint="Marque cada casilla solo si está de acuerdo. Se registra la fecha y hora de cada una."
            >
              <div className="space-y-4 text-sm">
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    className="mt-0.5"
                    checked={cbTerms}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbTerms(on);
                      setTsTerms(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    He leído y acepto el Contrato Marco (v{framework.version}) y la Orden de
                    Servicio {order.orderCode}.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    className="mt-0.5"
                    checked={cbRecurring}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbRecurring(on);
                      setTsRecurring(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    Autorizo a Closwork a realizar cargos automáticos recurrentes mensuales por{" "}
                    {breakdown ? formatUsd(breakdown.totalUsd) : ""} al método de pago que
                    registre, hasta que cancele mi suscripción (Cláusulas 8.3 y 12.1).
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    className="mt-0.5"
                    checked={cbMerchant}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbMerchant(on);
                      setTsMerchant(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    Declaro que contrato para los fines de mi actividad empresarial o
                    profesional y no como consumidor final, y que cuento con facultades para
                    obligar a la persona que represento (Cláusula 2.8).
                  </span>
                </label>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <Button
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={!acceptanceReady || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? "Procesando…" : "Continuar al pago"}
                </Button>
                {!acceptanceReady ? (
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <li>{scrolledToEnd ? "✓" : "○"} Contrato leído hasta el final</li>
                    <li>
                      {cbTerms && cbRecurring && cbMerchant ? "✓" : "○"} Tres aceptaciones
                      marcadas
                    </li>
                  </ul>
                ) : pendingFields.length ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Falta completar: {pendingFields.join(", ")}.
                  </p>
                ) : null}
              </div>
            </Section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
