// Configuración de Stripe para Closwork
export const stripeConfig = {
  // URLs de Stripe Checkout
  checkoutUrls: {
    // Plan Básico - $899 USD por lanzamiento
    planBasico: 'https://buy.stripe.com/14A4gy2IN2DA2q7fnx6Na04', // URL real de Stripe
    
    // Plan Growth - $2400 USD por lanzamiento
    planGrowth: 'https://buy.stripe.com/5kQ5kCabfguq6Gn5MX6Na01', // URL real de Stripe
    
    // Plan Scale - $7900 USD por lanzamiento
    planScale: 'https://buy.stripe.com/28E7sKdnremi5Cjb7h6Na02', // URL real de Stripe
  },
  
  // URLs de éxito y cancelación
  redirectUrls: {
    success: 'https://closwork.com/gracias-plan-basico',
    cancel: 'https://closwork.com/pago-cancelado',
  },
  
  // Configuración de precios
  prices: {
    planBasico: 899, // USD
    planGrowth: 2400, // USD
    planScale: 7900, // USD
  },
  
  // Configuración de monedas
  currencies: {
    planBasico: 'USD',
    planGrowth: 'USD',
    planScale: 'USD',
  },
  
  // Configuración de moneda
  currency: 'USD',
  
  // Configuración de tracking
  tracking: {
    planBasico: {
      checkoutType: 'Plan Básico - $899 USD',
      leadType: 'Plan Básico - Stripe Checkout',
    },
    planGrowth: {
      checkoutType: 'Plan Growth - $2400 USD',
      leadType: 'Plan Growth - Stripe Checkout',
    },
    planScale: {
      checkoutType: 'Plan Scale - $7900 USD',
      leadType: 'Plan Scale - Stripe Checkout',
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
