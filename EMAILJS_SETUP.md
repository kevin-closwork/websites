# 📧 Configuración de EmailJS para Notificaciones Automáticas

## 🎯 **¿Qué hemos implementado?**

Hemos integrado **EmailJS** en tu proyecto para enviar notificaciones automáticas por email cada vez que alguien se registre en los formularios de Closwork.

## ⚙️ **Configuración Requerida en EmailJS**

### **Paso 1: Obtener tu Public Key**
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. En la sección **Account** → **API Keys**
3. Copia tu **Public Key**
4. Reemplaza `YOUR_PUBLIC_KEY` en `src/lib/emailService.ts`

### **Paso 2: Configurar tu Template Existente**

Ya tienes configurado el template `template_h13nixs` en EmailJS. Solo necesitas:

1. **Copiar el HTML** del archivo `EMAILJS_TEMPLATE_VARIABLES.md`
2. **Pegarlo en tu template** `template_h13nixs` en EmailJS
3. **Guardar y publicar** el template

#### **Variables disponibles en tu template:**
```
{{to_email}} - Emails de destino
{{subject}} - Asunto del email (configurado automáticamente)
{{form_type}} - Tipo de formulario (Closer/Empresa)
{{email}} - Email del registrado
{{registration_date}} - Fecha y hora del registro

# Variables específicas según el tipo de formulario
# Se muestran automáticamente según {{form_type}}
```

## 📝 **Ejemplo de Template HTML**

### **Template para Closers:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Closer Registrado</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb;">🎉 Nuevo Closer Registrado en Closwork</h1>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af;">📋 Información del Closer</h2>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Email:</strong> {{closer_email}}</li>
                <li><strong>LinkedIn:</strong> {{closer_linkedin}}</li>
                <li><strong>WhatsApp:</strong> {{closer_whatsapp}}</li>
                <li><strong>Experiencia:</strong> {{closer_years}} años</li>
                <li><strong>Deal más grande:</strong> {{closer_biggest_deal}}</li>
                <li><strong>Industrias:</strong> {{closer_industries}}</li>
                <li><strong>Ticket:</strong> {{closer_ticket}}</li>
                <li><strong>Mercados:</strong> {{closer_markets}}</li>
                <li><strong>Superpoder:</strong> {{closer_superpower}}</li>
                <li><strong>Deals Q:</strong> {{closer_deals_q}}</li>
                <li><strong>Revenue:</strong> {{closer_revenue}}</li>
                <li><strong>Empleo:</strong> {{closer_employment}}</li>
            </ul>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e;">💎 Deal Épico</h3>
            <p>{{closer_epic_deal}}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0; color: #6b7280;">
            <p>📅 Registrado el: {{registration_date}}</p>
            <p>🚀 Proyecto: Closwork - Closers On Demand</p>
        </div>
    </div>
</body>
</html>
```

### **Template para Empresas:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Nueva Empresa Registrada</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #059669;">🚀 Nueva Empresa Registrada en Closwork</h1>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #047857;">📋 Información de la Empresa</h2>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Email:</strong> {{company_email}}</li>
                <li><strong>Nombre:</strong> {{company_name}}</li>
                <li><strong>LinkedIn:</strong> {{company_linkedin}}</li>
                <li><strong>Ticket promedio:</strong> {{company_ticket}}</li>
                <li><strong>Ciclo de venta:</strong> {{company_cycle}}</li>
                <li><strong>Meta de deals:</strong> {{company_deals}} mensuales</li>
                <li><strong>Industria:</strong> {{company_industry}}</li>
                <li><strong>Mercados:</strong> {{company_markets}}</li>
                <li><strong>Tipo de venta:</strong> {{company_selling_type}}</li>
                <li><strong>Equipo:</strong> {{company_has_team}} {{#if company_team_size}}({{company_team_size}} personas){{/if}}</li>
                <li><strong>Base de leads:</strong> {{company_has_leads}} {{#if company_leads_size}}({{company_leads_size}} leads){{/if}}</li>
            </ul>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e;">💼 Qué Vende</h3>
            <p>{{company_what}}</p>
        </div>
        
        {{#if company_frustration}}
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626;">😤 Frustraciones del Proceso</h3>
            <p>{{company_frustration}}</p>
        </div>
        {{/if}}
        
        <div style="text-align: center; margin: 30px 0; color: #6b7280;">
            <p>📅 Registrado el: {{registration_date}}</p>
            <p>🚀 Proyecto: Closwork - Closers On Demand</p>
        </div>
    </div>
</body>
</html>
```

## 🔧 **Configuración en el Código**

### **1. Actualizar Public Key**
En `src/lib/emailService.ts`:
```typescript
const EMAILJS_PUBLIC_KEY = 'tu_public_key_aqui';
```

### **2. Template ID ya configurado**
Tu template ID `template_h13nixs` ya está configurado en el código:
```typescript
const TEMPLATES = {
  CLOSER_FORM: 'template_h13nixs', // Tu template existente
  COMPANY_FORM: 'template_h13nixs', // Mismo template para ambos
};
```

## 🧪 **Probar la Integración**

### **Opción 1: Probar con formulario real**
1. Llena y envía un formulario de closer o empresa
2. Verifica en la consola del navegador que aparezca: `✅ Notificación por email enviada exitosamente`
3. Revisa tu email para confirmar que llegó la notificación

### **Opción 2: Función de prueba**
Puedes usar la función `sendTestEmail()` desde la consola del navegador:
```javascript
import { sendTestEmail } from './src/lib/emailService';
sendTestEmail();
```

## 🚨 **Solución de Problemas**

### **Error: "Service not found"**
- Verifica que el `SERVICE_ID` sea correcto
- Confirma que el servicio esté activo en EmailJS

### **Error: "Template not found"**
- Verifica que los `TEMPLATE_ID` sean correctos
- Confirma que los templates estén publicados en EmailJS

### **Error: "Public key not valid"**
- Verifica que el `PUBLIC_KEY` sea correcto
- Confirma que la key esté activa en EmailJS

### **No llegan emails**
- Verifica que el servicio de email esté configurado correctamente
- Revisa la carpeta de spam
- Confirma que las variables del template coincidan con las del código

## 📊 **Monitoreo**

### **Logs en Consola:**
- ✅ `Notificación por email enviada exitosamente`
- ⚠️ `Error enviando notificación por email: [error]`

### **Dashboard de EmailJS:**
- Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Revisa la sección **Activity** para ver emails enviados
- Monitorea el uso de tu plan gratuito (200 emails/mes)

## 🎯 **Próximos Pasos**

1. **Crear templates** en EmailJS con el HTML proporcionado
2. **Actualizar IDs** en el código
3. **Probar** con un formulario real
4. **Verificar** que lleguen las notificaciones

¡Una vez configurado, tendrás notificaciones automáticas funcionando perfectamente! 🚀
