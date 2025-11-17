// Configuración de Stripe para Closwork
export const stripeConfig = {
  // URLs de Stripe Checkout
  checkoutUrls: {
    // STARTER - $899 MXN/mes
    planBasico: 'https://buy.stripe.com/14A4gy2IN2DA2q7fnx6Na04', // URL real de Stripe - ACTUALIZAR
    
    // GROWTH - $1,900 MXN/mes
    planGrowth: 'https://buy.stripe.com/5kQ5kCabfguq6Gn5MX6Na01', // URL real de Stripe - ACTUALIZAR
    
    // SCALE - $2,400 MXN/mes
    planScale: 'https://buy.stripe.com/28E7sKdnremi5Cjb7h6Na02', // URL real de Stripe - ACTUALIZAR
  },
  
  // URLs de éxito y cancelación
  redirectUrls: {
    success: 'https://closwork.com/gracias-plan-basico',
    cancel: 'https://closwork.com/pago-cancelado',
  },
  
  // Configuración de precios
  prices: {
    planBasico: 899, // MXN/mes
    planGrowth: 1900, // MXN/mes
    planScale: 2400, // MXN/mes
  },
  
  // Configuración de monedas
  currencies: {
    planBasico: 'MXN',
    planGrowth: 'MXN',
    planScale: 'MXN',
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
      checkoutType: 'GROWTH - $1,900 MXN/mes',
      leadType: 'GROWTH - Stripe Checkout',
    },
    planScale: {
      checkoutType: 'SCALE - $2,400 MXN/mes',
      leadType: 'SCALE - Stripe Checkout',
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
