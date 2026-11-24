const LAUNCH_DATE = new Date("2026-12-14T00:00:00-06:00");
const PAGE_URL = "https://closwork.com/webinar/";
const GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar%20gratuito%20Closwork&dates=20261214/20261215&ctz=America%2FMexico_City&details=El%2014%20de%20diciembre%20te%20mandamos%20el%20acceso%20por%20correo%20y%20WhatsApp.%0Ahttps%3A%2F%2Fcloswork.com%2Fwebinar%2F&location=https%3A%2F%2Fcloswork.com%2Fwebinar%2F";
const OUTLOOK_CALENDAR_URL = "https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2026-12-14&enddt=2026-12-15&allday=true&subject=Webinar%20gratuito%20Closwork&location=https%3A%2F%2Fcloswork.com%2Fwebinar%2F&body=El%2014%20de%20diciembre%20te%20mandamos%20el%20acceso%20por%20correo%20y%20WhatsApp.%0Ahttps%3A%2F%2Fcloswork.com%2Fwebinar%2F";
const ICS_URL = "https://closwork.com/webinar/webinar.ics";
const LOGO_URL = "https://closwork.com/webinar/assets/logo-email-white.png";
const FROM = "Closwork <notificaciones@support.closwork.com>";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function firstName(nombre) {
  return nombre.trim().split(/\s+/)[0] || "";
}

function confirmationCopy(live) {
  if (live) {
    return {
      subject: "Tu registro al webinar de Closwork",
      preheader: "Te mandamos el link del webinar por correo y WhatsApp.",
      lead: "Tu registro está",
      accent: "listo.",
      body: "Te mandamos el link del webinar a este correo y a tu WhatsApp.",
    };
  }
  return {
    subject: "Tu lugar en el webinar está apartado",
    preheader: "El 14 de diciembre te llega el link por correo y WhatsApp.",
    lead: "Tu lugar está",
    accent: "apartado.",
    body: "El 14 de diciembre te mandamos el link del webinar a este correo y a tu WhatsApp.",
  };
}

function confirmationHtml(nombre, live) {
  const name = escapeHtml(firstName(nombre));
  const copy = confirmationCopy(live);
  const hello = name ? `Hola, ${name}.` : "Hola.";
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(copy.subject)}</title>
<style>
@media only screen and (max-width:600px){
  .card{width:100%!important;max-width:100%!important;}
  .pad{padding-left:22px!important;padding-right:22px!important;}
  .title{font-size:30px!important;}
}
</style>
</head>
<body style="margin:0;padding:0;background:#ECECEC;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(copy.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECECEC;margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" class="card" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;background:#ffffff;border-radius:28px;overflow:hidden;">
        <tr>
          <td class="pad" style="background:#000000;padding:28px 36px;">
            <img src="${LOGO_URL}" width="162" height="28" alt="Closwork" style="display:block;border:0;outline:none;text-decoration:none;width:162px;height:28px;">
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:36px 36px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
            <span style="display:inline-block;border:1.5px solid #000000;border-radius:999px;padding:6px 14px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:0.08em;color:#000000;">WEBINAR GRATUITO</span>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:22px 36px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#000000;">
            <p style="margin:0 0 10px;font-size:16px;line-height:1.4;font-weight:500;">${hello}</p>
            <h1 class="title" style="margin:0;font-size:36px;line-height:1.08;letter-spacing:-0.03em;font-weight:300;">${escapeHtml(copy.lead)} <b style="font-weight:700">${escapeHtml(copy.accent)}</b></h1>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:18px 36px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:1.5;font-weight:400;color:#1A1A1A;">
            ${escapeHtml(copy.body)}
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:28px 36px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="border:1.5px solid #000000;border-radius:16px;">
              <tr>
                <td style="padding:14px 18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.4;color:#000000;">
                  <b>14 de diciembre</b><br>
                  <span style="color:#3A3A3A;">El link llega por correo y WhatsApp</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:22px 36px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#000000;">
            Agregar al calendario<br>
            <a href="${GOOGLE_CALENDAR_URL}" style="color:#000000;font-weight:700;text-decoration:underline;">Google</a>
            &nbsp;&middot;&nbsp;
            <a href="${OUTLOOK_CALENDAR_URL}" style="color:#000000;font-weight:700;text-decoration:underline;">Outlook</a>
            &nbsp;&middot;&nbsp;
            <a href="${ICS_URL}" style="color:#000000;font-weight:700;text-decoration:underline;">Archivo</a>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:22px 36px 8px;">
            <a href="${PAGE_URL}" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;line-height:52px;padding:0 26px;border-radius:999px;">Ver la página del webinar</a>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:8px 36px 32px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#6B6B6B;">
            Closwork · <a href="https://closwork.com" style="color:#6B6B6B;text-decoration:underline;">closwork.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function confirmationText(nombre, live) {
  const name = firstName(nombre);
  const copy = confirmationCopy(live);
  const hello = name ? `Hola, ${name}.` : "Hola.";
  return [
    hello,
    "",
    `${copy.lead} ${copy.accent}`,
    "",
    copy.body,
    "",
    "14 de diciembre",
    "El link llega por correo y WhatsApp",
    "",
    "Agregar al calendario",
    "Google: " + GOOGLE_CALENDAR_URL,
    "Outlook: " + OUTLOOK_CALENDAR_URL,
    "Archivo: " + ICS_URL,
    "",
    PAGE_URL,
    "",
    "Closwork",
  ].join("\n");
}

async function sendEmail(apiKey, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error", res.status, detail);
    return false;
  }
  return true;
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Método no permitido" });
  }

  let lead;
  try {
    lead = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "JSON inválido" });
  }

  const nombre = String(lead.nombre || "").trim();
  const email = String(lead.email || "").trim();
  const telefono = String(lead.telefono || "").trim();

  if (!nombre || nombre.length > 120) return json(400, { error: "Nombre inválido" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return json(400, { error: "Correo inválido" });
  }
  if (!telefono || telefono.length > 40) return json(400, { error: "WhatsApp inválido" });

  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  if (!apiKey) return json(500, { error: "RESEND_API_KEY no configurada" });

  const live = Date.now() >= LAUNCH_DATE.getTime();
  const copy = confirmationCopy(live);
  const when = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  const confirmationOk = await sendEmail(apiKey, {
    from: FROM,
    to: [email],
    reply_to: "kevin@closwork.com",
    subject: copy.subject,
    html: confirmationHtml(nombre, live),
    text: confirmationText(nombre, live),
  });
  if (!confirmationOk) return json(502, { error: "No se pudo enviar la confirmación" });

  const noticeOk = await sendEmail(apiKey, {
    from: FROM,
    to: ["kevin@closwork.com"],
    reply_to: email,
    subject: `Nuevo registro al webinar: ${nombre}`,
    html: `
      <p>Alguien se registró al webinar de Closwork.</p>
      <ul>
        <li><strong>Nombre:</strong> ${escapeHtml(nombre)}</li>
        <li><strong>Correo:</strong> ${escapeHtml(email)}</li>
        <li><strong>WhatsApp:</strong> ${escapeHtml(telefono)}</li>
        <li><strong>Fecha:</strong> ${escapeHtml(when)}</li>
      </ul>
    `,
  });
  if (!noticeOk) return json(502, { error: "No se pudo enviar el aviso" });

  return json(200, { ok: true });
};
