import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  createCheckoutSession,
  sendEmailVerificationCode,
  verifyEmailCode,
} from "@/lib/legal/checkoutService";
import { toast } from "sonner";

const TAX_REGIMES = [
  { code: "601", label: "601 — General de Ley Personas Morales" },
  { code: "603", label: "603 — Personas Morales con fines no lucrativos" },
  { code: "606", label: "606 — Arrendamiento" },
  { code: "612", label: "612 — Persona Física con Actividades Empresariales" },
  { code: "626", label: "626 — Régimen Simplificado de Confianza" },
];

const RFC_PF = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/i;
const RFC_PM = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/i;

function validateRfc(rfc: string): boolean {
  const v = rfc.trim().toUpperCase();
  return RFC_PF.test(v) || RFC_PM.test(v);
}

export default function Contratar() {
  const framework = getFrameworkDoc();
  const order = getCurrentOrder("concierge");
  const privacy = getPrivacyDoc();
  const pricing = order?.pricing;
  const guarantees = order?.guarantees;

  const [submitting, setSubmitting] = useState(false);

  // Identificación fiscal
  const [legalName, setLegalName] = useState("");
  const [rfc, setRfc] = useState("");
  const [taxRegime, setTaxRegime] = useState("");
  const [fiscalAddress, setFiscalAddress] = useState({
    calle: "",
    numero: "",
    colonia: "",
    municipio: "",
    estado: "",
    cp: "",
  });
  const [signerName, setSignerName] = useState("");
  const [signerRole, setSignerRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailVerifiedAt, setEmailVerifiedAt] = useState<string | null>(null);
  const [sendingCode, setSendingCode] = useState(false);

  // Plan
  const [additionalClosers, setAdditionalClosers] = useState(0);

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

  const docsEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // El final del contrato entra en viewport => el Cliente recorrió el texto completo.
  useEffect(() => {
    const el = docsEndRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setScrolledToEnd(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const breakdown = useMemo(() => {
    if (!pricing) return null;
    return calculateOrderTotal(pricing, additionalClosers);
  }, [pricing, additionalClosers]);

  const totalClosers = pricing
    ? pricing.base_included_closers + (breakdown?.additionalClosers ?? 0)
    : 0;

  const fiscalValid =
    legalName.trim().length >= 3 &&
    validateRfc(rfc) &&
    taxRegime &&
    fiscalAddress.calle &&
    fiscalAddress.numero &&
    fiscalAddress.colonia &&
    fiscalAddress.municipio &&
    fiscalAddress.estado &&
    /^\d{5}$/.test(fiscalAddress.cp) &&
    signerName.trim() &&
    signerRole.trim() &&
    email.includes("@") &&
    emailVerifiedAt &&
    phone.trim().length >= 10;

  const operationalValid =
    vertical.trim() &&
    directCompetitors.filter(Boolean).length >= 1 &&
    closerCommission.trim() &&
    leadVolume.trim() &&
    (tools.length > 0 || toolsOther.trim());

  const acceptanceReady =
    cbTerms &&
    cbRecurring &&
    cbMerchant &&
    scrolledToEnd &&
    tsTerms &&
    tsRecurring &&
    tsMerchant;

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      toast.error("Ingresa un correo válido");
      return;
    }
    setSendingCode(true);
    try {
      await sendEmailVerificationCode(email.trim());
      toast.success("Código enviado a tu correo");
    } catch {
      toast.error("No se pudo enviar el código. Intenta de nuevo.");
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (emailCode.length !== 6) {
      toast.error("El código debe tener 6 dígitos");
      return;
    }
    try {
      const ok = await verifyEmailCode(email.trim(), emailCode);
      if (ok) {
        setEmailVerifiedAt(new Date().toISOString());
        toast.success("Correo verificado");
      } else {
        toast.error("Código incorrecto");
      }
    } catch {
      toast.error("Error al verificar el código");
    }
  };

  const toggleTool = (t: string) => {
    setTools((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async () => {
    if (!framework || !order || !privacy || !pricing || !breakdown) return;
    if (!acceptanceReady || !fiscalValid || !operationalValid) return;

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
      additionalClosers: breakdown.additionalClosers,
      vertical,
      directCompetitors: directCompetitors.filter(Boolean),
      closerCommission,
      leadVolume,
      leadPeriod,
      tools: toolsOther ? [...tools, toolsOther] : tools,
    };

    try {
      const { checkoutUrl } = await createCheckoutSession({
        customer: {
          legalName,
          rfc: rfc.toUpperCase(),
          taxRegime,
          fiscalAddress,
          signerName,
          signerRole,
          email: email.trim(),
          emailVerifiedAt: emailVerifiedAt!,
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
      window.location.href = checkoutUrl;
    } catch (e) {
      console.error(e);
      toast.error("No se pudo iniciar el pago. Contacta a hola@closwork.com");
      setSubmitting(false);
    }
  };

  if (!framework || !order || !pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-muted-foreground">Documentos legales no disponibles.</p>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Contratar Plan Concierge
            </h1>
            <p className="text-muted-foreground">
              Lea el Contrato Marco y la Orden de Servicio {order.orderCode}. Los datos de
              contratación se capturan al final del documento.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link to={legalDocRoute(framework)} className="text-primary hover:underline">
                Contrato Marco v{framework.version}
              </Link>
              <Link to={legalDocRoute(order)} className="text-primary hover:underline">
                Orden de Servicio {order.orderCode}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Ir al formulario ↓
              </Button>
            </div>
          </header>

          {/* 1 — Acuerdo completo, antes de cualquier captura de datos */}
          <section aria-labelledby="acuerdo" className="mb-12">
            <h2 id="acuerdo" className="text-xl font-semibold text-secondary mb-4">
              1. Contrato Marco y Orden de Servicio
            </h2>
            <article
              className="prose prose-sm md:prose-base max-w-none rounded-xl border border-border bg-card p-6
              prose-headings:text-secondary prose-p:text-foreground
              prose-a:text-primary prose-strong:text-secondary
              prose-blockquote:border-l-primary prose-li:marker:text-primary
              prose-table:text-sm"
            >
              <BlogMarkdown markdown={framework.markdown} />
              <hr />
              <BlogMarkdown markdown={order.markdown} />
            </article>
            <div ref={docsEndRef} aria-hidden className="h-px" />
            {!scrolledToEnd ? (
              <p className="mt-3 text-xs text-amber-600">
                Continúe leyendo hasta el final del documento para poder aceptarlo.
              </p>
            ) : (
              <p className="mt-3 text-xs text-primary">
                ✓ Documento revisado en su totalidad.
              </p>
            )}
          </section>

          {/* 2 — Captura de datos, debajo de todo el TyC */}
          <div ref={formRef} className="space-y-12">
            <section aria-labelledby="datos-fiscales" className="space-y-4">
              <h2 id="datos-fiscales" className="text-xl font-semibold text-secondary">
                2. Identificación fiscal
              </h2>
              <div>
                <Label>Razón social / Nombre legal</Label>
                <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} />
              </div>
              <div>
                <Label>RFC</Label>
                <Input value={rfc} onChange={(e) => setRfc(e.target.value.toUpperCase())} />
              </div>
              <div>
                <Label>Régimen fiscal</Label>
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
              </div>
              {(["calle", "numero", "colonia", "municipio", "estado"] as const).map((k) => (
                <div key={k}>
                  <Label className="capitalize">{k}</Label>
                  <Input
                    value={fiscalAddress[k]}
                    onChange={(e) =>
                      setFiscalAddress((a) => ({ ...a, [k]: e.target.value }))
                    }
                  />
                </div>
              ))}
              <div>
                <Label>Código postal</Label>
                <Input
                  maxLength={5}
                  value={fiscalAddress.cp}
                  onChange={(e) =>
                    setFiscalAddress((a) => ({ ...a, cp: e.target.value.replace(/\D/g, "") }))
                  }
                />
              </div>
              <div>
                <Label>Nombre del firmante</Label>
                <Input value={signerName} onChange={(e) => setSignerName(e.target.value)} />
              </div>
              <div>
                <Label>Cargo del firmante</Label>
                <Input value={signerRole} onChange={(e) => setSignerRole(e.target.value)} />
              </div>
              <div>
                <Label>Correo electrónico</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="mt-1 text-xs text-muted-foreground">
                  Este correo es el domicilio convencional para notificaciones (Cláusula 19).
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={sendingCode}
                >
                  Enviar código
                </Button>
                <Input
                  placeholder="6 dígitos"
                  maxLength={6}
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ""))}
                  className="max-w-[120px]"
                />
                <Button type="button" onClick={handleVerifyCode}>
                  Verificar
                </Button>
              </div>
              {emailVerifiedAt ? (
                <p className="text-sm text-primary">✓ Correo verificado</p>
              ) : null}
              <div>
                <Label>Teléfono (MX)</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </section>

            {breakdown ? (
              <section aria-labelledby="plan" className="space-y-4">
                <h2 id="plan" className="text-xl font-semibold text-secondary">
                  3. Plan y precio
                </h2>
                <p className="text-sm text-muted-foreground">
                  Incluye {pricing.base_included_closers} closers · base{" "}
                  {formatUsd(pricing.base_amount)}/mes con I.V.A. incluido.
                </p>
                <div>
                  <Label>Closers adicionales (0–{pricing.max_additional_closers})</Label>
                  <Select
                    value={String(additionalClosers)}
                    onValueChange={(v) => setAdditionalClosers(Number(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: pricing.max_additional_closers + 1 }, (_, i) => (
                        <SelectItem key={i} value={String(i)}>
                          {i} adicional{i !== 1 ? "es" : ""} (+
                          {formatUsd(i * pricing.additional_closer_amount)}/mes)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 space-y-1 text-sm">
                  <p className="font-bold text-lg text-secondary">
                    Total mensual: {formatUsd(breakdown.totalUsd)}
                  </p>
                  <p className="text-muted-foreground">
                    Incluye base gravable de {formatUsd(breakdown.subtotalUsd)} e I.V.A. de{" "}
                    {formatUsd(breakdown.ivaUsd)} ({Math.round(breakdown.taxRate * 100)}%).
                  </p>
                  <p className="text-muted-foreground">
                    Es el importe total que se cargará a su método de pago.
                  </p>
                </div>
                {feesLine ? (
                  <p className="text-sm font-medium text-secondary border-l-4 border-primary pl-3">
                    {feesLine}
                  </p>
                ) : null}
              </section>
            ) : null}

            <section aria-labelledby="operativos" className="space-y-4">
              <h2 id="operativos" className="text-xl font-semibold text-secondary">
                4. Parámetros operativos
              </h2>
              <div>
                <Label>Vertical / industria</Label>
                <Input value={vertical} onChange={(e) => setVertical(e.target.value)} />
              </div>
              <div>
                <Label>Competidores directos (mín. 1, máx. {maxCompetitors})</Label>
                {directCompetitors.map((c, i) => (
                  <Input
                    key={i}
                    className="mt-2"
                    value={c}
                    placeholder={`Competidor ${i + 1}`}
                    onChange={(e) => {
                      const next = [...directCompetitors];
                      next[i] = e.target.value;
                      setDirectCompetitors(next);
                    }}
                  />
                ))}
                {directCompetitors.length < maxCompetitors ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setDirectCompetitors([...directCompetitors, ""])}
                  >
                    + Agregar competidor
                  </Button>
                ) : null}
              </div>
              <div>
                <Label>Comisión del closer (% o monto)</Label>
                <Input
                  value={closerCommission}
                  onChange={(e) => setCloserCommission(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Volumen de leads</Label>
                  <Input value={leadVolume} onChange={(e) => setLeadVolume(e.target.value)} />
                </div>
                <div className="w-32">
                  <Label>Periodo</Label>
                  <Select
                    value={leadPeriod}
                    onValueChange={(v) => setLeadPeriod(v as "semana" | "mes")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semana">Semana</SelectItem>
                      <SelectItem value="mes">Mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Herramientas</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {["CRM", "WhatsApp", "Zoom", "Calendly", "Otro"].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
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
                    className="mt-2"
                    placeholder="Especificar otra herramienta"
                    value={toolsOther}
                    onChange={(e) => setToolsOther(e.target.value)}
                  />
                ) : null}
              </div>
            </section>

            <section aria-labelledby="aceptacion" className="space-y-4">
              <h2 id="aceptacion" className="text-xl font-semibold text-secondary">
                5. Aceptación
              </h2>
              <div className="space-y-3 text-sm">
                <label className="flex gap-3 items-start">
                  <Checkbox
                    checked={cbTerms}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbTerms(on);
                      setTsTerms(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    He leído y acepto el Contrato Marco (v{framework.version}) y la Orden de
                    Servicio {order.orderCode}.{" "}
                    <Link to={legalDocRoute(framework)} className="text-primary underline">
                      Ver documentos
                    </Link>
                  </span>
                </label>
                <label className="flex gap-3 items-start">
                  <Checkbox
                    checked={cbRecurring}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbRecurring(on);
                      setTsRecurring(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    Autorizo a Closwork a realizar cargos automáticos recurrentes mensuales al
                    método de pago que registre, hasta que cancele mi suscripción (Cláusulas 8.3
                    y 12.1).
                  </span>
                </label>
                <label className="flex gap-3 items-start">
                  <Checkbox
                    checked={cbMerchant}
                    onCheckedChange={(v) => {
                      const on = v === true;
                      setCbMerchant(on);
                      setTsMerchant(on ? new Date().toISOString() : null);
                    }}
                  />
                  <span>
                    Declaro que contrato este servicio para los fines de mi actividad empresarial
                    o profesional y no como consumidor final, y que cuento con facultades para
                    obligar a la persona que represento (Cláusula 2.8).
                  </span>
                </label>
              </div>
              <Button
                size="lg"
                disabled={
                  !fiscalValid || !operationalValid || !acceptanceReady || submitting
                }
                onClick={handleSubmit}
              >
                {submitting ? "Procesando…" : "Continuar al pago"}
              </Button>
              {!acceptanceReady ? (
                <p className="text-xs text-muted-foreground">
                  El pago se habilita al leer el documento completo, marcar las tres casillas y
                  completar los datos con el correo verificado.
                </p>
              ) : null}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
