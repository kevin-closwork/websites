import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const WA =
  "https://api.whatsapp.com/send/?phone=523113731863&text=Hola%2C+vi+el+mensaje+de+Daniel+en+LinkedIn.+Quiero+sumar+closers+a+mi+equipo.&type=phone_number&app_absent=0";

const font = "'Hanken Grotesk', 'Helvetica Neue', Helvetica, sans-serif";
const serif = "'Instrument Serif', Georgia, serif";

const socialLinks = [
  { label: "Instagram de Closwork", href: "https://www.instagram.com/closwork.app/", Icon: Instagram },
  { label: "Facebook de Closwork", href: "https://www.facebook.com/profile.php?id=61577870785859", Icon: Facebook },
  { label: "LinkedIn de Closwork", href: "https://www.linkedin.com/company/closwork/", Icon: Linkedin },
] as const;

const footerLinks = [
  { label: "Inicio", href: "/", route: true },
  { label: "Blog", href: "/blog", route: true },
  { label: "About Us", href: "/#como-funciona", route: false },
  { label: "Características", href: "/#beneficios", route: false },
  { label: "Solicitud", href: "/solicitud", route: true },
  { label: "Términos y Condiciones", href: "/terminos-condiciones", route: true },
  { label: "Documentos legales", href: "/legal", route: true },
  { label: "Privacidad", href: "/privacidad", route: true },
  { label: "Contacto", href: "mailto:hola@closwork.com", route: false },
] as const;

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

const Index = () => {
  return (
    <div style={{ fontFamily: font, color: "#0A0A0A", background: "#FFFFFF", width: "100%", WebkitFontSmoothing: "antialiased" }}>
      <Helmet>
        <title>Closwork — Closers sin nómina</title>
        <meta name="description" content="Closwork te coloca closers evaluados que trabajan a comisión, sin sumar nómina." />
      </Helmet>
      <style>{`
        .cw-cta{transition:transform .15s ease, background .15s ease}
        .cw-cta:hover{transform:translateY(-1px)}
        .cw-cta-dark:hover{background:#2A2A2A !important;color:#FFFFFF !important}
        .cw-cta-light:hover{background:#E6E6E6 !important;color:#0A0A0A !important}
        .cw-wa-fab{animation:cw-wa-bob 2.4s ease-in-out infinite}
        .cw-wa-fab:hover{background:#1EBE5A !important;transform:scale(1.06)}
        .cw-wa-ring{animation:cw-wa-pulse 2s ease-out infinite}
        .cw-footer a:hover{color:#FFFFFF}
        @keyframes cw-wa-pulse{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.7);opacity:0}}
        @keyframes cw-wa-bob{0%,100%{translate:0 0}50%{translate:0 -4px}}
        @media (prefers-reduced-motion: reduce){.cw-wa-fab,.cw-wa-ring{animation:none}}
      `}</style>

      <header style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em" }}>Closwork.</div>
        <a className="cw-cta cw-cta-dark" href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 10, minHeight: 44, padding: "0 20px", background: "#0A0A0A", color: "#FFFFFF", textDecoration: "none", fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
          Quiero conocer más
        </a>
      </header>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 96px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5A5A5A" }}>Closers a comisión para tu empresa</div>
        <h1 style={{ margin: 0, fontSize: "clamp(44px, 7.2vw, 104px)", lineHeight: 0.98, letterSpacing: "-0.045em", fontWeight: 500, maxWidth: 1100 }}>
          Las ventas que se quedan en la mesa, <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }}>alguien</span> tiene que cerrarlas.
        </h1>
        <p style={{ margin: 0, fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.45, color: "#3A3A3A", maxWidth: 680 }}>
          Closwork te coloca un closer evaluado para tu tipo de venta, sin sumar nómina. Trabaja a comisión, y ese esquema lo negocias tú directamente con él.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 8 }}>
          <a className="cw-cta cw-cta-dark" href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, minHeight: 60, padding: "0 32px", background: "#0A0A0A", color: "#FFFFFF", textDecoration: "none", fontSize: 18, fontWeight: 600, borderRadius: 999 }}>
            Quiero sumar closers
            <Arrow />
          </a>
          <span style={{ fontSize: 15, color: "#5A5A5A" }}>Te respondemos por WhatsApp.</span>
        </div>
      </section>

      <section style={{ background: "#F2F2F2" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 500 }}>
              <span style={{ color: "#6B6B6B" }}>Un vendedor en nómina no solo te cuesta</span> su salario.
            </h2>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "#3A3A3A", maxWidth: 460 }}>
              Te cuesta todo esto, <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 24 }}>venda o no venda.</span>
            </p>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", borderTop: "1px solid #CFCFCF" }}>
            {[
              ["01", "Cuotas IMSS, INFONAVIT y retiro"],
              ["02", "Impuesto sobre nómina"],
              ["03", "Aguinaldo, prima vacacional y PTU"],
              ["04", "Reclutamiento y meses de rampa"],
              ["05", "Indemnización si no funciona"],
            ].map(([n, label]) => (
              <li key={n} style={{ padding: "20px 0", borderBottom: "1px solid #CFCFCF", fontSize: 20, display: "flex", gap: 16, alignItems: "baseline" }}>
                <span style={{ fontSize: 14, color: "#6B6B6B", fontVariantNumeric: "tabular-nums" }}>{n}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: "#0A0A0A", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500, maxWidth: 980 }}>
            Un closer de Closwork gana <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400 }}>cuando tú vendes.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "#C8C8C8", maxWidth: 640 }}>
            Sin nómina, sin cargas patronales, sin indemnizaciones. Tú defines la comisión con tu closer y él se enfoca en una sola cosa: cerrar.
          </p>
        </div>
      </section>

      <section id="beneficios" style={{ maxWidth: 1200, margin: "0 auto", padding: "112px 24px 96px", display: "flex", flexDirection: "column", gap: 56 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 500 }}>Closwork es para ti si:</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
          {[
            ["1", "Generas leads constantemente mediante campañas."],
            ["2", "Tu ticket de venta es alto, individualmente o en volumen."],
            ["3", "Tienes una comisión atractiva definida para tus closers."],
          ].map(([n, text]) => (
            <div key={n} style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: "2px solid #0A0A0A", paddingTop: 24 }}>
              <div style={{ fontFamily: serif, fontSize: 48, lineHeight: 1, color: "#D42A24" }}>{n}</div>
              <p style={{ margin: 0, fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.01em" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 112px", display: "flex", flexDirection: "column", gap: 56 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 500 }}>
          Así funciona <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400 }}>Closwork.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          <div style={{ background: "#F2F2F2", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.16em", color: "#5A5A5A" }}>PASO 01</div>
            <h3 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600 }}>Defines el perfil</h3>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "#3A3A3A" }}>Qué vendes y a quién. La comisión la acuerdas directamente con tu closer.</p>
          </div>
          <div style={{ background: "#F2F2F2", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.16em", color: "#5A5A5A" }}>PASO 02</div>
            <h3 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600 }}>Seleccionamos</h3>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "#3A3A3A" }}>Te presentamos closers evaluados para tu tipo de venta. Tú eliges.</p>
          </div>
          <div style={{ background: "#0A0A0A", color: "#FFFFFF", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.16em", color: "#B5B5B5" }}>PASO 03</div>
            <h3 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600 }}>Trabaja contigo</h3>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "#D0D0D0" }}>Le das el onboarding de tu producto, accesos y herramientas. Y a vender.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "#0A0A0A", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 72px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 32 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1, letterSpacing: "-0.045em", fontWeight: 500, maxWidth: 1000 }}>
            ¿Ya generas leads? Pon a alguien a <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400 }}>cerrarlos.</span>
          </h2>
          <a className="cw-cta cw-cta-light" href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 12, minHeight: 60, padding: "0 32px", background: "#FFFFFF", color: "#0A0A0A", textDecoration: "none", fontSize: 18, fontWeight: 600, borderRadius: 999 }}>
            Quiero conocer más
            <Arrow />
          </a>
          <span style={{ fontSize: 15, color: "#B5B5B5" }}>Escríbenos por WhatsApp y platicamos tu caso.</span>
        </div>

        <footer className="cw-footer" style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px 48px" }}>
          <div style={{ borderTop: "1px solid #2A2A2A", paddingTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em" }}>Closwork.</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#B5B5B5", maxWidth: 320 }}>
                Closers evaluados que trabajan a comisión, sin sumar nómina.
              </p>
              <p style={{ margin: 0, fontSize: 16, color: "#B5B5B5" }}>
                You focus on <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: "#FFFFFF" }}>growth</span>, we <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: "#FFFFFF" }}>handle</span> the rest.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#B5B5B5" }}>Contacto</div>
              <a href="mailto:hola@closwork.com" style={{ display: "flex", alignItems: "center", gap: 10, color: "#B5B5B5", textDecoration: "none", fontSize: 15 }}>
                <Mail size={16} aria-hidden />
                hola@closwork.com
              </a>
              <a href="tel:+523112403145" style={{ display: "flex", alignItems: "center", gap: 10, color: "#B5B5B5", textDecoration: "none", fontSize: 15 }}>
                <Phone size={16} aria-hidden />
                +52 311 240 3145
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#B5B5B5", fontSize: 15 }}>
                <MapPin size={16} aria-hidden />
                Guadalajara, Jal.
              </div>
              <div style={{ display: "flex", gap: 4, paddingTop: 4 }}>
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ display: "inline-flex", padding: 8, color: "#B5B5B5" }}>
                    <Icon size={18} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#B5B5B5" }}>Enlaces</div>
              {footerLinks.map((link) =>
                link.route ? (
                  <Link key={link.href} to={link.href} style={{ color: "#B5B5B5", textDecoration: "none", fontSize: 15 }}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} style={{ color: "#B5B5B5", textDecoration: "none", fontSize: 15 }}>
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginTop: 40, paddingTop: 28, borderTop: "1px solid #2A2A2A" }}>
            <span style={{ fontSize: 14, color: "#B5B5B5" }}>Acelerados en</span>
            <a href="https://www.retozapopan.com.mx/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.85 }}>
              <img src="/logo-86bf1018.svg" alt="Reto Zapopan" style={{ height: 48, width: "auto" }} />
            </a>
            <a href="https://emprelatam.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, color: "#FFFFFF", textDecoration: "none" }}>
              Emprelatam
            </a>
          </div>

          <div style={{ marginTop: 28, paddingTop: 28, borderTop: "1px solid #2A2A2A", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#8A8A8A" }}>© 2026 Closwork. Todos los derechos reservados.</p>
            <p style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontSize: 16, color: "#B5B5B5", maxWidth: 520 }}>
              A veces, las ideas más revolucionarias nacen de la pregunta más simple: ¿Y si existiera un botón?
            </p>
          </div>
        </footer>
      </section>

      <div style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 50, width: 78, height: 78 }}>
        <span className="cw-wa-ring" aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#25D366" }} />
        <a className="cw-wa-fab" href={WA} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 78, height: 78, borderRadius: 999, background: "#25D366", color: "#FFFFFF", textDecoration: "none", boxShadow: "0 10px 28px rgba(37, 211, 102, 0.45), 0 4px 10px rgba(0, 0, 0, 0.18)", transition: "transform .15s ease, background .15s ease" }}>
          <svg width="39" height="39" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6l-4.5.9z" />
            <path d="M9.2 8.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.5.5-2.3.2-2.1-.8-3.9-2.6-4.7-4.7-.3-.8-.2-1.7.2-2.3z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Index;
