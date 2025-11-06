import emailjs from '@emailjs/browser';

// Configuración de EmailJS para NOTIFICACIONES (servicio existente)
const EMAILJS_SERVICE_ID = 'service_sjdrq5s';
const EMAILJS_PUBLIC_KEY = 'ci4oObyqV0KPIjMjy';

// Configuración de EmailJS para EMAILS DE BIENVENIDA (nuevo servicio)
const WELCOME_EMAILJS_SERVICE_ID = 'service_ryia90u';
const WELCOME_EMAILJS_PUBLIC_KEY = 'uguMoYSMu2jKPB4oE';

// Template IDs para EmailJS - NOTIFICACIONES
const TEMPLATES = {
  CLOSER_FORM: 'template_57lhlg8', // Template para formulario de closer
  COMPANY_FORM: 'template_k4gcopu', // Template para formulario de empresa
};

// Template IDs para EmailJS - EMAILS DE BIENVENIDA
const WELCOME_TEMPLATES = {
  CLOSER_WELCOME: 'template_w5w6o3j', // Template de bienvenida para closer
  COMPANY_WELCOME: 'template_9591x3s', // Template de bienvenida para empresa
};

// Destinatarios de las notificaciones
const RECIPIENT_EMAILS = [
  'kevin@closwork.com',
  'hola@closwork.com', 
  'jonathan@closwork.com'
];

/**
 * Envía notificación por email cuando se registra un closer
 */
export const sendCloserNotification = async (closerData: any) => {
  try {
    const templateParams = {
      subject: `Nuevo Registro 🚀 - Closer`,
      form_type: 'Closer',
      nombre: closerData.nombre || 'No proporcionado',
      apellido: closerData.apellido || 'No proporcionado',
      email: closerData.email,
      linkedin: closerData.linkedin || 'No proporcionado',
      whatsapp: closerData.whatsapp || 'No proporcionado',
      years: closerData.years || 'No especificado',
      biggest_deal: closerData.biggestDeal ? `$${closerData.biggestDeal.toLocaleString()}` : 'No especificado',
      industries: closerData.expertIndustries?.join(', ') || 'No especificado',
      ticket: closerData.ticket || 'No especificado',
      markets: closerData.soldMarkets?.join(', ') || 'No especificado',
      superpower: closerData.superpower || 'No especificado',
      deals_q: closerData.dealsLastQ || 0,
      revenue: closerData.revenueLastYear || 'No especificado',
      employment: closerData.employment || 'No especificado',
      epic_deal: closerData.epicDeal || 'No proporcionado',
      registration_date: new Date().toLocaleString('es-ES', { 
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.CLOSER_FORM,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Notificación de closer enviada exitosamente:', response);
    return { success: true, messageId: response.text };
    
  } catch (error) {
    console.error('❌ Error enviando notificación de closer:', error);
    throw error;
  }
};

/**
 * Envía notificación por email cuando se registra una empresa
 */
export const sendCompanyNotification = async (companyData: any) => {
  try {
    const templateParams = {
      subject: `Nuevo Registro 🚀 - Empresa`,
      form_type: 'Empresa',
      email: companyData.email,
      name: companyData.name || 'No proporcionado',
      company_name: companyData.companyName || 'No proporcionado',
      employee_count: companyData.employeeCount || 'No especificado',
      linkedin: companyData.linkedin || 'No proporcionado',
      ticket: companyData.ticket || 'No especificado',
      cycle: companyData.cycle || 'No especificado',
      deals: companyData.deals || 0,
      what: companyData.what || 'No especificado',
      industry: companyData.industry || 'No especificado',
      markets: companyData.markets?.join(', ') || 'No especificado',
      selling_type: companyData.sellingType || 'No especificado',
      has_team: companyData.hasTeam || 'No especificado',
      team_size: companyData.teamSize || 'No especificado',
      has_leads: companyData.hasLeadsBase || 'No especificado',
      leads_size: companyData.leadsBaseSize || 'No especificado',
      frustration: companyData.frustration || 'No especificado',
      registration_date: new Date().toLocaleString('es-ES', { 
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.COMPANY_FORM,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Notificación de empresa enviada exitosamente:', response);
    return { success: true, messageId: response.text };
    
  } catch (error) {
    console.error('❌ Error enviando notificación de empresa:', error);
    throw error;
  }
};

/**
 * Envía email de bienvenida a un closer recién registrado
 */
export const sendCloserWelcomeEmail = async (closerData: any) => {
  try {
    const templateParams = {
      to_email: closerData.email,
      to_name: closerData.nombre ? `${closerData.nombre} ${closerData.apellido || ''}`.trim() : closerData.email.split('@')[0],
      years_experience: closerData.years || 'No especificado',
      biggest_deal: closerData.biggestDeal ? `$${closerData.biggestDeal.toLocaleString()}` : 'No especificado',
      industries: closerData.expertIndustries?.join(', ') || 'No especificado',
      ticket_range: closerData.ticket || 'No especificado',
      markets: closerData.soldMarkets?.join(', ') || 'No especificado',
      superpower: closerData.superpower || 'No especificado',
      registration_date: new Date().toLocaleString('es-ES', { 
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const response = await emailjs.send(
      WELCOME_EMAILJS_SERVICE_ID,
      WELCOME_TEMPLATES.CLOSER_WELCOME,
      templateParams,
      WELCOME_EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email de bienvenida para closer enviado exitosamente:', response);
    return { success: true, messageId: response.text };
    
  } catch (error) {
    console.error('❌ Error enviando email de bienvenida para closer:', error);
    throw error;
  }
};

/**
 * Envía email de bienvenida a una empresa recién registrada
 */
export const sendCompanyWelcomeEmail = async (companyData: any) => {
  try {
    const templateParams = {
      to_email: companyData.email,
      to_name: companyData.name || companyData.email.split('@')[0],
      company_name: companyData.companyName || 'No especificado',
      employee_count: companyData.employeeCount || 'No especificado',
      company_industry: companyData.industry || 'No especificado',
      ticket_range: companyData.ticket || 'No especificado',
      sales_cycle: companyData.cycle || 'No especificado',
      deals_count: companyData.deals || 0,
      markets: companyData.markets?.join(', ') || 'No especificado',
      selling_type: companyData.sellingType || 'No especificado',
      has_team: companyData.hasTeam || 'No especificado',
      team_size: companyData.teamSize || 'No especificado',
      has_leads: companyData.hasLeadsBase || 'No especificado',
      leads_size: companyData.leadsBaseSize || 'No especificado',
      registration_date: new Date().toLocaleString('es-ES', { 
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const response = await emailjs.send(
      WELCOME_EMAILJS_SERVICE_ID,
      WELCOME_TEMPLATES.COMPANY_WELCOME,
      templateParams,
      WELCOME_EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email de bienvenida para empresa enviado exitosamente:', response);
    return { success: true, messageId: response.text };
    
  } catch (error) {
    console.error('❌ Error enviando email de bienvenida para empresa:', error);
    throw error;
  }
};

/**
 * Función de prueba para verificar que EmailJS funciona
 */
export const sendTestEmail = async () => {
  try {
    const templateParams = {
      subject: '🧪 Prueba de EmailJS - Closwork',
      form_type: 'Prueba',
      email: 'test@closwork.com',
      registration_date: new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.CLOSER_FORM,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email de prueba enviado exitosamente:', response);
    return { success: true, messageId: response.text };
    
  } catch (error) {
    console.error('❌ Error enviando email de prueba:', error);
    throw error;
  }
};
