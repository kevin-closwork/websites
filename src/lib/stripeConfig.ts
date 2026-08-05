// Configuración de Stripe para Closwork
export const stripeConfig = {
  // URLs de Stripe Checkout
  checkoutUrls: {
    // STARTER - $899 MXN/mes
    planBasico: 'https://buy.stripe.com/5kQ8wO83791YfcT6R16Na05',
    
    // GROWTH - $1,299 MXN/mes
    planGrowth: 'https://buy.stripe.com/6oUaEWervfqm5CjgrB6Na0a',
    
    // SCALE - $1,999 MXN/mes
    planScale: 'https://buy.stripe.com/5kQ8wO5UZ5PMc0H2AL6Na09',

    // CONCIERGE v2 - $249 USD/mes
    planConcierge: 'https://buy.stripe.com/4gMcN4abf91Y6Gnfnx6Na0t',

    // CONCIERGE 2 v3 - primer link (setup); ver también checkoutUrlLists.planConcierge2
    planConcierge2: 'https://buy.stripe.com/4gM5kCgzD3HEd4Lfnx6Na0w',
  },

  // Múltiples Payment Links (se abren juntos al aceptar)
  checkoutUrlLists: {
    planConcierge2: [
      'https://buy.stripe.com/4gM5kCgzD3HEd4Lfnx6Na0w',
      'https://buy.stripe.com/4gMcN4gzDfqm0hZejt6Na0x',
    ],
  },
  
  // URLs de éxito y cancelación
  redirectUrls: {
    success: 'https://closwork.com/gracias-plan-basico',
    cancel: 'https://closwork.com/pago-cancelado',
  },
  
  // Configuración de precios
  prices: {
    planBasico: 899, // MXN/mes
    planGrowth: 1299, // MXN/mes
    planScale: 1999, // MXN/mes
    planConcierge: 249, // USD/mes
    planConcierge2: 60, // USD/mes (Cuota Mensual; setup $999 aparte)
  },
  
  // Configuración de monedas
  currencies: {
    planBasico: 'MXN',
    planGrowth: 'MXN',
    planScale: 'MXN',
    planConcierge: 'USD',
    planConcierge2: 'USD',
  },
  
  // Configuración de moneda
  currency: 'MXN',
  
  // Configuración de tracking
  tracking: {
    planBasico: {
      checkoutType: 'STARTER - $899 MXN/mes',
      leadType: 'STARTER - Stripe Checkout',
    },
    planGrowth: {
      checkoutType: 'GROWTH - $1,299 MXN/mes',
      leadType: 'GROWTH - Stripe Checkout',
    },
    planScale: {
      checkoutType: 'SCALE - $1,999 MXN/mes',
      leadType: 'SCALE - Stripe Checkout',
    },
    planConcierge: {
      checkoutType: 'CONCIERGE - $249 USD/mes',
      leadType: 'CONCIERGE - Stripe Checkout',
    },
    planConcierge2: {
      checkoutType: 'CONCIERGE 2 - $999 setup + $60 USD/mes',
      leadType: 'CONCIERGE 2 - Stripe Checkout',
    },
  }
};

// Función helper para obtener la URL de checkout
export const getStripeCheckoutUrl = (plan: keyof typeof stripeConfig.checkoutUrls): string => {
  return stripeConfig.checkoutUrls[plan];
};

export const getStripeCheckoutUrls = (
  plan: keyof typeof stripeConfig.checkoutUrlLists
): string[] => {
  return stripeConfig.checkoutUrlLists[plan];
};

// Función helper para obtener el precio
export const getStripePrice = (plan: keyof typeof stripeConfig.prices): number => {
  return stripeConfig.prices[plan];
};

// Función helper para obtener la configuración de tracking
export const getStripeTracking = (plan: keyof typeof stripeConfig.tracking) => {
  return stripeConfig.tracking[plan];
};

// Función helper para obtener la moneda
export const getStripeCurrency = (plan: keyof typeof stripeConfig.currencies): string => {
  return stripeConfig.currencies[plan];
};
