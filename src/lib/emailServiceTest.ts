import { 
  sendCloserNotification, 
  sendCompanyNotification, 
  sendCloserWelcomeEmail, 
  sendCompanyWelcomeEmail,
  sendTestEmail 
} from './emailService';

/**
 * Función de prueba para verificar que todos los servicios de EmailJS funcionen
 */
export const testAllEmailServices = async () => {
  console.log('🧪 Iniciando pruebas de todos los servicios de EmailJS...\n');

  // Datos de prueba para closer
  const testCloserData = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'test.closer@example.com',
    linkedin: 'https://www.linkedin.com/in/test-closer',
    whatsapp: '+525512345678',
    years: '3-5',
    biggestDeal: 75000,
    expertIndustries: ['SaaS', 'Fintech'],
    ticket: '$25-100K USD',
    soldMarkets: ['México', 'Colombia'],
    superpower: 'Hunter',
    dealsLastQ: 12,
    revenueLastYear: '$200-500K USD',
    employment: 'Sí pero busco side-hustle',
    epicDeal: 'Cerrado un deal de $75K en 2 semanas para una startup de fintech'
  };

  // Datos de prueba para empresa
  const testCompanyData = {
    email: 'test.company@example.com',
    name: 'Empresa Test S.A.',
    linkedin: 'https://www.linkedin.com/company/test-company',
    ticket: '$5-25K USD',
    cycle: '1-3 meses',
    deals: 8,
    what: 'Software de gestión empresarial para PYMEs',
    industry: 'SaaS',
    markets: ['México', 'Chile'],
    sellingType: 'Mixto',
    hasTeam: 'si',
    teamSize: 3,
    hasLeadsBase: 'mediana',
    leadsBaseSize: 500,
    frustration: 'Necesitamos cerrar más deals y reducir el tiempo de venta'
  };

  try {
    // 1. Probar notificación de closer (servicio existente)
    console.log('📧 Probando notificación de closer...');
    const closerNotification = await sendCloserNotification(testCloserData);
    console.log('✅ Notificación de closer exitosa:', closerNotification.messageId);

    // 2. Probar notificación de empresa (servicio existente)
    console.log('📧 Probando notificación de empresa...');
    const companyNotification = await sendCompanyNotification(testCompanyData);
    console.log('✅ Notificación de empresa exitosa:', companyNotification.messageId);

    // 3. Probar email de bienvenida para closer (nuevo servicio)
    console.log('📧 Probando email de bienvenida para closer...');
    const closerWelcome = await sendCloserWelcomeEmail(testCloserData);
    console.log('✅ Email de bienvenida para closer exitoso:', closerWelcome.messageId);

    // 4. Probar email de bienvenida para empresa (nuevo servicio)
    console.log('📧 Probando email de bienvenida para empresa...');
    const companyWelcome = await sendCompanyWelcomeEmail(testCompanyData);
    console.log('✅ Email de bienvenida para empresa exitoso:', companyWelcome.messageId);

    // 5. Probar email de prueba (servicio existente)
    console.log('📧 Probando email de prueba...');
    const testEmail = await sendTestEmail();
    console.log('✅ Email de prueba exitoso:', testEmail.messageId);

    console.log('\n🎉 ¡Todas las pruebas fueron exitosas!');
    console.log('✅ Servicio de notificaciones funcionando');
    console.log('✅ Servicio de emails de bienvenida funcionando');
    
    return {
      success: true,
      results: {
        closerNotification,
        companyNotification,
        closerWelcome,
        companyWelcome,
        testEmail
      }
    };

  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

/**
 * Función para probar solo el servicio de notificaciones (existente)
 */
export const testNotificationService = async () => {
  console.log('🧪 Probando solo el servicio de notificaciones...\n');

  const testCloserData = {
    nombre: 'María',
    apellido: 'García',
    email: 'test@example.com',
    linkedin: 'https://www.linkedin.com/in/test',
    whatsapp: '+525512345678',
    years: '1-2',
    biggestDeal: 25000,
    expertIndustries: ['SaaS'],
    ticket: '$5-25K USD',
    soldMarkets: ['México'],
    superpower: 'Farmer',
    dealsLastQ: 5,
    revenueLastYear: '$50-200K USD',
    employment: 'Disponible',
    epicDeal: 'Deal de prueba'
  };

  try {
    const result = await sendCloserNotification(testCloserData);
    console.log('✅ Servicio de notificaciones funcionando:', result.messageId);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error en servicio de notificaciones:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * Función para probar solo el servicio de emails de bienvenida (nuevo)
 */
export const testWelcomeService = async () => {
  console.log('🧪 Probando solo el servicio de emails de bienvenida...\n');

  const testData = {
    email: 'welcome.test@example.com',
    name: 'Usuario Test',
    industry: 'SaaS',
    ticket: '$1-5K USD',
    cycle: '1-3 meses',
    deals: 3,
    markets: ['México'],
    sellingType: 'Inbound caliente',
    hasTeam: 'no',
    hasLeadsBase: 'pequena'
  };

  try {
    const result = await sendCompanyWelcomeEmail(testData);
    console.log('✅ Servicio de emails de bienvenida funcionando:', result.messageId);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error en servicio de emails de bienvenida:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

// Ejemplo de uso en la consola del navegador:
// import { testAllEmailServices } from './lib/emailServiceTest';
// testAllEmailServices();
