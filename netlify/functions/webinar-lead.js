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

  const when = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  const html = `
    <p>Alguien se registró al webinar de Closwork.</p>
    <ul>
      <li><strong>Nombre:</strong> ${escapeHtml(nombre)}</li>
      <li><strong>Correo:</strong> ${escapeHtml(email)}</li>
      <li><strong>WhatsApp:</strong> ${escapeHtml(telefono)}</li>
      <li><strong>Fecha:</strong> ${escapeHtml(when)}</li>
    </ul>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Closwork <notificaciones@support.closwork.com>",
      to: ["kevin@closwork.com"],
      reply_to: email,
      subject: `Nuevo registro al webinar: ${nombre}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error", res.status, detail);
    return json(502, { error: "No se pudo enviar el aviso" });
  }

  return json(200, { ok: true });
};
