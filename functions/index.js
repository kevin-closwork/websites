/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {onCall, onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Configuración global para control de costos
setGlobalOptions({ maxInstances: 10 });

// Configuración del transportador de email
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === "true" || false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

// Función que se ejecuta cuando se crea un formulario de closer
exports.onCloserFormSubmitted = onDocumentCreated({
  document: "closer_forms/{docId}",
  region: "us-central1",
}, async (event) => {
  try {
    const docData = event.data.data();
    const docId = event.data.id;
    
    logger.info("Nuevo formulario de closer recibido", { docId, email: docData.email });
    
    // Enviar notificación por email
    await sendNotificationEmail({
      type: "Closer",
      email: docData.email,
      name: docData.linkedin ? `LinkedIn: ${docData.linkedin}` : "No proporcionado",
      data: docData,
      docId
    });
    
    logger.info("Notificación enviada exitosamente para closer", { docId });
    
  } catch (error) {
    logger.error("Error procesando formulario de closer", { error: error.message, docId: event.data.id });
  }
});

// Función que se ejecuta cuando se crea un formulario de empresa
exports.onCompanyFormSubmitted = onDocumentCreated({
  document: "company_forms/{docId}",
  region: "us-central1",
}, async (event) => {
  try {
    const docData = event.data.data();
    const docId = event.data.id;
    
    logger.info("Nuevo formulario de empresa recibido", { docId, email: docData.email });
    
    // Enviar notificación por email
    await sendNotificationEmail({
      type: "Empresa",
      email: docData.email,
      name: docData.name || "No proporcionado",
      data: docData,
      docId
    });
    
    logger.info("Notificación enviada exitosamente para empresa", { docId });
    
  } catch (error) {
    logger.error("Error procesando formulario de empresa", { error: error.message, docId: event.data.id });
  }
});

// Función auxiliar para enviar emails
async function sendNotificationEmail({ type, email, name, data, docId }) {
  const recipientEmails = process.env.RECIPIENT_EMAIL;
  
  if (!recipientEmails) {
    logger.warn("RECIPIENT_EMAIL no configurado, saltando envío de email");
    return;
  }
  
  // Separar múltiples emails por comas y limpiar espacios
  const emailList = recipientEmails.split(',').map(email => email.trim()).filter(email => email);
  
  if (emailList.length === 0) {
    logger.warn("No se encontraron emails válidos en RECIPIENT_EMAIL");
    return;
  }
  
  const subject = `🚀 Nuevo ${type} registrado en Closwork`;
  
  // Crear contenido del email
  const emailContent = `
    <h2>🎉 Nuevo ${type} se ha registrado en Closwork</h2>
    
    <h3>📋 Información del registro:</h3>
    <ul>
      <li><strong>ID del documento:</strong> ${docId}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Nombre/LinkedIn:</strong> ${name}</li>
      <li><strong>Fecha de registro:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}</li>
    </ul>
    
    <h3>📊 Datos completos:</h3>
    <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(data, null, 2)}
    </pre>
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Esta notificación fue enviada automáticamente por Firebase Cloud Functions.
      <br>
      Proyecto: Closwork - Closers On Demand
    </p>
  `;
  
  // Enviar email a cada destinatario
  const emailPromises = emailList.map(async (recipientEmail) => {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: recipientEmail,
      subject: subject,
      html: emailContent,
    };
    
    try {
      await transporter.sendMail(mailOptions);
      logger.info("Email enviado exitosamente", { to: recipientEmail, type, docId });
      return { success: true, email: recipientEmail };
    } catch (error) {
      logger.error("Error enviando email", { error: error.message, to: recipientEmail, type, docId });
      return { success: false, email: recipientEmail, error: error.message };
    }
  });
  
  try {
    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(result => result.status === 'fulfilled' && result.value.success).length;
    const failed = results.length - successful;
    
    logger.info(`Notificación enviada a ${emailList.length} destinatarios`, { 
      successful, 
      failed, 
      type, 
      docId,
      totalDestinatarios: emailList.length
    });
    
    // Si algún email falló, loggear los errores
    if (failed > 0) {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && !result.value.success) {
          logger.warn(`Email falló para ${emailList[index]}`, { 
            error: result.value.error, 
            type, 
            docId 
          });
        }
      });
    }
    
  } catch (error) {
    logger.error("Error general enviando emails", { error: error.message, type, docId });
    throw error;
  }
}

// Función de prueba para verificar que las funciones están funcionando
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase Functions!");
});

exports.createCheckoutSession = onCall({region: "us-central1"}, async (request) => {
  const data = request.data;
  if (!data?.checkboxTerms || !data?.checkboxRecurring || !data?.checkboxMerchant) {
    throw new Error("acceptance-incomplete");
  }
  if (!data?.customer?.email?.includes("@")) {
    throw new Error("invalid-email");
  }

  const acceptanceRef = await db.collection("acceptances").add({
    ...data,
    status: "pending",
    ipAddress: request.rawRequest?.headers?.["x-forwarded-for"] || "unknown",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.SITE_URL || "https://closwork.com";

  if (!stripeKey) {
    logger.warn("STRIPE_SECRET_KEY missing — returning confirmación sin pago");
    return {
      acceptanceId: acceptanceRef.id,
      checkoutUrl: `${siteUrl}/contratar/confirmacion?acceptance=${acceptanceRef.id}`,
    };
  }

  const stripe = require("stripe")(stripeKey);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: data.customer.email,
    line_items: [{
      price_data: {
        currency: (data.currency || "usd").toLowerCase(),
        unit_amount: data.monthlyAmountCents,
        recurring: {interval: "month"},
        product_data: {name: "Closwork Plan Concierge"},
      },
      quantity: 1,
    }],
    metadata: {acceptanceId: acceptanceRef.id},
    success_url: `${siteUrl}/contratar/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pago-cancelado`,
  });

  await acceptanceRef.update({stripeCheckoutSessionId: session.id});

  return {acceptanceId: acceptanceRef.id, checkoutUrl: session.url};
});

exports.stripeWebhook = onRequest({region: "us-central1"}, async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) {
    res.status(503).send("Stripe not configured");
    return;
  }
  const stripe = require("stripe")(stripeKey);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    logger.error("Webhook signature failed", err);
    res.status(400).send("Invalid signature");
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const acceptanceId = session.metadata?.acceptanceId;
    if (acceptanceId) {
      await db.collection("acceptances").doc(acceptanceId).update({
        status: "completed",
        acceptedAt: new Date().toISOString(),
        stripeSubscriptionId: session.subscription,
        summarySentAt: null,
      });
      // TODO: encolar Resumen de Contratación con PDF adjuntos
    }
  }
  res.json({received: true});
});
