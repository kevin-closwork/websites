// Meta Pixel Events Helper - Simplified version without duplicate init calls
// Función para enviar eventos de Meta Pixel de forma consistente

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

export const pixelEvents = {
  // Evento de vista de contenido
  viewContent: (contentName: string, contentCategory?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_category: contentCategory || 'page'
      });
    }
  },

  // Evento de lead - cuando alguien envía información
  lead: (leadType: string, value?: number) => {
    console.log('🔥 PIXEL EVENT LEAD:', { leadType, value });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: leadType,
        value: value || 0,
        currency: 'USD'
      });
      console.log('✅ LEAD EVENT SENT:', leadType);
    } else {
      console.error('❌ LEAD EVENT FAILED: window or fbq not available');
    }
  },

  // Evento de contacto - cuando alguien hace clic en contactar
  contact: (contactMethod: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: contactMethod
      });
    }
  },

  // Evento de completar registro - cuando alguien se registra
  completeRegistration: (registrationType: string) => {
    console.log('🎯 PIXEL EVENT COMPLETE REGISTRATION:', { registrationType });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: registrationType
      });
      console.log('✅ COMPLETE REGISTRATION EVENT SENT:', registrationType);
    } else {
      console.error('❌ COMPLETE REGISTRATION EVENT FAILED: window or fbq not available');
    }
  },

  // Evento de iniciar checkout - cuando alguien inicia un proceso de compra
  initiateCheckout: (checkoutType: string, value?: number) => {
    console.log('🛒 PIXEL EVENT INITIATE CHECKOUT:', { checkoutType, value });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: checkoutType,
        value: value || 0,
        currency: 'USD'
      });
      console.log('✅ INITIATE CHECKOUT EVENT SENT:', checkoutType);
    } else {
      console.error('❌ INITIATE CHECKOUT EVENT FAILED: window or fbq not available');
    }
  },

  // Evento de compra - cuando se completa una venta
  purchase: (purchaseType: string, value: number, currency: string = 'USD') => {
    console.log('💰 PIXEL EVENT PURCHASE:', { purchaseType, value, currency });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        content_name: purchaseType,
        value: value,
        currency: currency
      });
      console.log('✅ PURCHASE EVENT SENT:', purchaseType);
    } else {
      console.error('❌ PURCHASE EVENT FAILED: window or fbq not available');
    }
  },

  // Evento de programar - cuando alguien agenda una cita
  schedule: (scheduleType: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', {
        content_name: scheduleType
      });
    }
  },

  // Evento de búsqueda - cuando alguien busca algo
  search: (searchTerm: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchTerm
      });
    }
  },

  // Evento de suscripción - cuando alguien se suscribe
  subscribe: (subscriptionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Subscribe', {
        content_name: subscriptionType,
        value: value || 0,
        currency: 'USD',
        predicted_ltv: value || 0
      });
    }
  },

  // Evento de iniciar prueba - cuando alguien inicia una prueba gratuita
  startTrial: (trialType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'StartTrial', {
        content_name: trialType,
        value: value || 0,
        currency: 'USD',
        predicted_ltv: value || 0
      });
    }
  },

  // Evento de enviar solicitud - cuando alguien envía una solicitud
  submitApplication: (applicationType: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'SubmitApplication', {
        content_name: applicationType
      });
    }
  },

  // Evento de donación - cuando alguien hace una donación
  donate: (donationType: string, value: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Donate', {
        content_name: donationType,
        value: value,
        currency: 'USD'
      });
    }
  },

  // Evento de agregar al carrito - cuando alguien agrega algo al carrito
  addToCart: (itemName: string, value?: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: itemName,
        value: value || 0,
        currency: 'USD'
      });
    }
  },

  // Evento de agregar información de pago - cuando alguien agrega info de pago
  addPaymentInfo: (paymentType: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        content_name: paymentType
      });
    }
  },

  // Evento de agregar a lista de deseos - cuando alguien agrega a favoritos
  addToWishlist: (itemName: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToWishlist', {
        content_name: itemName
      });
    }
  },

  // Evento de personalizar producto - cuando alguien personaliza algo
  customizeProduct: (productName: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CustomizeProduct', {
        content_name: productName
      });
    }
  },

  // Evento de buscar ubicación - cuando alguien busca una ubicación
  findLocation: (locationType: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'FindLocation', {
        content_name: locationType
      });
    }
  }
};

// Hook personalizado para usar los eventos de pixel
export const usePixelEvents = () => {
  return pixelEvents;
};