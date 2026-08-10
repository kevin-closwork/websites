import { useCallback, useMemo, useRef, useState } from "react";
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

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Paso 1
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

  // Paso 2
  const [additionalClosers, setAdditionalClosers] = useState(0);

  // Paso 3
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

  const breakdown = useMemo(() => {
    if (!pricing) return null;
    return calculateOrderTotal(pricing, additionalClosers);
  }, [pricing, additionalClosers]);

  const totalClosers = pricing
    ? pricing.base_included_closers + (breakdown?.additionalClosers ?? 0)
    : 0;

  const step1Valid =
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

  const step3Valid =
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

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setScrolledToEnd(true);
    }
  }, []);

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
    if (!acceptanceReady || !step1Valid || !step3Valid) return;

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
        <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-secondary mb-2">Contratar Plan Concierge</h1>
          <p className="text-muted-foreground mb-8">
            Paso {step} de 3 · {order.orderCode}
          </p>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Identificación fiscal</h2>
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
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleSendCode} disabled={sendingCode}>
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
              <Button disabled={!step1Valid} onClick={() => setStep(2)}>
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && pricing && breakdown && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Plan y precio</h2>
              <p className="text-sm text-muted-foreground">
                Incluye {pricing.base_included_closers} closers · base{" "}
                {formatUsd(pricing.base_amount)}/mes + IVA
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
                        {i} adicional{i !== 1 ? "es" : ""} (+{formatUsd(i * pricing.additional_closer_amount)}/mes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1 text-sm">
                <p>Subtotal: {formatUsd(breakdown.subtotalUsd)}</p>
                <p>IVA (16%): {formatUsd(breakdown.ivaUsd)}</p>
                <p className="font-bold text-lg">Total mensual: {formatUsd(breakdown.totalUsd)}</p>
              </div>
              {feesLine ? (
                <p className="text-sm font-medium text-secondary border-l-4 border-primary pl-3">
                  {feesLine}
                </p>
              ) : null}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>
                <Button onClick={() => setStep(3)}>Continuar</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Parámetros operativos</h2>
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
                <Input value={closerCommission} onChange={(e) => setCloserCommission(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Volumen de leads</Label>
                  <Input value={leadVolume} onChange={(e) => setLeadVolume(e.target.value)} />
                </div>
                <div className="w-32">
                  <Label>Periodo</Label>
                  <Select value={leadPeriod} onValueChange={(v) => setLeadPeriod(v as "semana" | "mes")}>
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
                <div className="flex flex-wrap gap-2 mt-2">
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

              <h3 className="text-lg font-semibold pt-4">Aceptación de documentos</h3>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="max-h-[400px] overflow-y-auto border border-border rounded-lg p-4 text-sm prose prose-sm max-w-none"
              >
                <BlogMarkdown markdown={combinedLegal} />
              </div>
              {!scrolledToEnd ? (
                <p className="text-xs text-amber-600">Desplázate hasta el final para continuar.</p>
              ) : null}
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
                    He leído y acepto el Contrato Marco (v{framework.version}) y la Orden de Servicio{" "}
                    {order.orderCode}.{" "}
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
                    Autorizo cargos automáticos recurrentes mensuales hasta cancelar (Cláusulas 8.3 y 12.1).
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
                    Contrato para fines empresariales/profesionales, no como consumidor final, con
                    facultades para obligar a quien represento (Cláusula 2.8).
                  </span>
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Atrás
                </Button>
                <Button
                  disabled={!step3Valid || !acceptanceReady || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? "Procesando…" : "Continuar al pago"}
                </Button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
