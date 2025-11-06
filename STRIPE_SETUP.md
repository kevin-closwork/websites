# 🔥 Configuración de Stripe para Closwork

## 🚨 Configuración Requerida

El botón del Plan Básico ahora está configurado para redirigir a Stripe, pero necesitas reemplazar las URLs de prueba con las URLs reales de tu cuenta de Stripe.

## 📋 Pasos para Configurar Stripe

### 1. Crear Productos en Stripe Dashboard

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navega a **Products** > **Add Product**
3. Crea los siguientes productos:

#### Plan Básico
- **Name**: Plan Básico - Closwork
- **Description**: 1 socio comercial, 1 tipo de producto/servicio, Garantía de cambio (1 cambio), Sesión consultiva
- **Price**: $699 USD
- **Billing**: One-time payment

#### Plan Growth (opcional)
- **Name**: Plan Growth - Closwork
- **Description**: Hasta 3 closers expertos, 50 leads mensuales, Gestión CRM integrada
- **Price**: $1000 USD
- **Billing**: Annual

#### Plan Scale (opcional)
- **Name**: Plan Scale - Closwork
- **Description**: Expansión regional, múltiples closers, leads ilimitados
- **Price**: $2000 USD
- **Billing**: Annual

### 2. Obtener URLs de Checkout

1. Para cada producto creado, ve a **Products** > **[Product Name]**
2. Haz clic en **Pricing** tab
3. Haz clic en **Create payment link**
4. Configura:
   - **Payment method types**: Card, Bank transfer (opcional)
   - **Customer information**: Email (required), Name (optional)
   - **Billing address collection**: Required
   - **Tax behavior**: Exclusive
   - **Shipping**: None
5. Copia la **Payment link URL**

### 3. Actualizar Configuración

Edita el archivo `src/lib/stripeConfig.ts` y reemplaza las URLs de prueba:

```typescript
export const stripeConfig = {
  checkoutUrls: {
    // Reemplaza con tu URL real de Stripe
    planBasico: 'https://buy.stripe.com/TU_URL_REAL_AQUI',
    planGrowth: 'https://buy.stripe.com/TU_URL_REAL_AQUI',
    planScale: 'https://buy.stripe.com/TU_URL_REAL_AQUI',
  },
  // ... resto de la configuración
};
```

### 4. Configurar Webhooks (Opcional pero Recomendado)

1. Ve a **Developers** > **Webhooks**
2. Haz clic en **Add endpoint**
3. URL del endpoint: `https://tu-dominio.com/api/stripe-webhook`
4. Eventos a escuchar:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 5. Configurar Dominio de Producción

1. Ve a **Settings** > **Business settings**
2. En **Branding**, configura:
   - **Business name**: Closwork
   - **Support email**: hola@closwork.com
   - **Business website**: https://closwork.com

## 🧪 Testing

### Modo de Prueba
- Usa las tarjetas de prueba de Stripe:
  - **Éxito**: 4242 4242 4242 4242
  - **Declinada**: 4000 0000 0000 0002
  - **Requiere autenticación**: 4000 0025 0000 3155

### Modo de Producción
- Cambia a modo Live en Stripe Dashboard
- Actualiza las URLs en `stripeConfig.ts`
- Prueba con tarjetas reales

## 📊 Tracking de Eventos

El sistema ya está configurado para trackear:
- `initiateCheckout`: Cuando el usuario hace clic en el botón
- `lead`: Cuando se inicia el proceso de pago
- `purchase`: Cuando se completa el pago (requiere webhook)

## 🔧 Funcionalidades Implementadas

- ✅ Botón del Plan Básico funcional
- ✅ Redirección a Stripe Checkout
- ✅ Tracking de eventos de Facebook Pixel
- ✅ Configuración centralizada
- ✅ Soporte para múltiples planes
- ✅ Manejo de errores

## 🚀 Próximos Pasos

1. **Configurar URLs reales** en `stripeConfig.ts`
2. **Probar el flujo completo** de pago
3. **Configurar webhooks** para tracking de conversiones
4. **Implementar páginas de éxito/error** después del pago
5. **Agregar más planes** si es necesario

## 📞 Soporte

Si necesitas ayuda con la configuración de Stripe, contacta a:
- Email: hola@closwork.com
- Documentación: [Stripe Docs](https://stripe.com/docs)
