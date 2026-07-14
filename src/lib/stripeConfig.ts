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

    // CONCIERGE - $249 USD/mes (actualizar si hay Payment Link dedicado)
    planConcierge: 'https://buy.stripe.com/6oUaEWervfqm5CjgrB6Na0a',
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
  },
  
  // Configuración de monedas
  currencies: {
    planBasico: 'MXN',
    planGrowth: 'MXN',
    planScale: 'MXN',
    planConcierge: 'USD',
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
  }
};

// Función helper para obtener la URL de checkout
export const getStripeCheckoutUrl = (plan: keyof typeof stripeConfig.checkoutUrls): string => {
  return stripeConfig.checkoutUrls[plan];
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
