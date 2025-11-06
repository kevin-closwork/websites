# 📧 Variables del Template EmailJS - template_h13nixs

## 🎯 **Variables Disponibles para tu Template**

Tu template `template_h13nixs` debe incluir estas variables para funcionar correctamente:

### **📋 Variables Comunes (para ambos formularios):**
```
{{to_email}} - Emails de destino (kevin@closwork.com, hola@closwork.com, jonathan@closwork.com)
{{subject}} - Asunto del email (ej: "Nuevo Registro 🚀 - Closer" o "Nuevo Registro 🚀 - Empresa")
{{form_type}} - Tipo de formulario (Closer/Empresa)
{{email}} - Email del registrado
{{registration_date}} - Fecha y hora del registro
```

### **👤 Variables para Formulario de Closer:**
```
{{linkedin}} - LinkedIn del closer
{{whatsapp}} - WhatsApp del closer
{{years}} - Años de experiencia
{{biggest_deal}} - Deal más grande cerrado
{{industries}} - Industrias de expertise
{{ticket}} - Ticket sweet spot
{{markets}} - Mercados vendidos
{{superpower}} - Superpoder del closer
{{deals_q}} - Deals del último trimestre
{{revenue}} - Revenue del último año
{{employment}} - Estado de empleo
{{epic_deal}} - Deal épico
```

### **🏢 Variables para Formulario de Empresa:**
```
{{name}} - Nombre de la empresa
{{linkedin}} - LinkedIn de la empresa
{{ticket}} - Ticket promedio
{{cycle}} - Ciclo de venta
{{deals}} - Meta de deals mensuales
{{what}} - Qué vende la empresa
{{industry}} - Industria principal
{{markets}} - Mercados objetivo
{{selling_type}} - Tipo de venta
{{has_team}} - Si tiene equipo
{{team_size}} - Tamaño del equipo
{{has_leads}} - Si tiene base de leads
{{leads_size}} - Tamaño de la base de leads
{{frustration}} - Frustraciones del proceso
```

## 📝 **Template HTML para Closers** (`template_57lhlg8`)

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{subject}}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">{{subject}}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Nuevo registro en Closwork - Closer</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            
            <!-- Tipo de Formulario -->
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                <h2 style="margin: 0; color: #1976d2; font-size: 20px;">📝 Formulario de Closer</h2>
            </div>
            
            <!-- Información Básica -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">
                    📋 Información del Registro
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div><strong>Email:</strong> {{email}}</div>
                    <div><strong>Fecha:</strong> {{registration_date}}</div>
                </div>
            </div>
            
            <!-- Perfil del Closer -->
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #856404;">👤 Perfil del Closer</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div><strong>LinkedIn:</strong> {{linkedin}}</div>
                    <div><strong>WhatsApp:</strong> {{whatsapp}}</div>
                    <div><strong>Experiencia:</strong> {{years}} años</div>
                    <div><strong>Deal más grande:</strong> {{biggest_deal}}</div>
                    <div><strong>Industrias:</strong> {{industries}}</div>
                    <div><strong>Ticket:</strong> {{ticket}}</div>
                    <div><strong>Mercados:</strong> {{markets}}</div>
                    <div><strong>Superpoder:</strong> {{superpower}}</div>
                    <div><strong>Deals Q:</strong> {{deals_q}}</div>
                    <div><strong>Revenue:</strong> {{revenue}}</div>
                    <div><strong>Empleo:</strong> {{employment}}</div>
                </div>
            </div>
            
            <!-- Deal Épico -->
            {{#if epic_deal}}
            <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #0c5460;">💎 Deal Épico</h3>
                <p style="margin: 0; font-style: italic;">{{epic_deal}}</p>
            </div>
            {{/if}}
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d;">
                <p style="margin: 0;">🚀 Proyecto: Closwork - Closers On Demand</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Notificación automática generada el {{registration_date}}</p>
            </div>
        </div>
    </div>
</body>
</html>
```

## 🏢 **Template HTML para Empresas** (`template_k4gcopu`)

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{subject}}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">{{subject}}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Nuevo registro en Closwork - Empresa</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            
            <!-- Tipo de Formulario -->
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                <h2 style="margin: 0; color: #155724; font-size: 20px;">📝 Formulario de Empresa</h2>
            </div>
            
            <!-- Información Básica -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 8px;">
                    📋 Información del Registro
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div><strong>Email:</strong> {{email}}</div>
                    <div><strong>Fecha:</strong> {{registration_date}}</div>
                </div>
            </div>
            
            <!-- Información de la Empresa -->
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #155724;">🏢 Información de la Empresa</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div><strong>Nombre:</strong> {{name}}</div>
                    <div><strong>LinkedIn:</strong> {{linkedin}}</div>
                    <div><strong>Ticket:</strong> {{ticket}}</div>
                    <div><strong>Ciclo:</strong> {{cycle}}</div>
                    <div><strong>Deals:</strong> {{deals}} mensuales</div>
                    <div><strong>Industria:</strong> {{industry}}</div>
                    <div><strong>Mercados:</strong> {{markets}}</div>
                    <div><strong>Tipo de venta:</strong> {{selling_type}}</div>
                    <div><strong>Equipo:</strong> {{has_team}} {{#if team_size}}({{team_size}} personas){{/if}}</div>
                    <div><strong>Base de leads:</strong> {{has_leads}} {{#if leads_size}}({{leads_size}} leads){{/if}}</div>
                </div>
            </div>
            
            <!-- Qué vende -->
            {{#if what}}
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #856404;">💼 Qué Vende</h3>
                <p style="margin: 0;">{{what}}</p>
            </div>
            {{/if}}
            
            <!-- Frustraciones -->
            {{#if frustration}}
            <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #721c24;">😤 Frustraciones del Proceso</h3>
                <p style="margin: 0;">{{frustration}}</p>
            </div>
            {{/if}}
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d;">
                <p style="margin: 0;">🚀 Proyecto: Closwork - Closers On Demand</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Notificación automática generada el {{registration_date}}</p>
            </div>
        </div>
    </div>
</body>
</html>
```

## ⚠️ **Notas Importantes:**

1. **Mismo template para ambos formularios**: Usamos el mismo template ID para closers y empresas
2. **Asunto dinámico**: El asunto cambia automáticamente según el tipo de formulario:
   - **Closer**: "Nuevo Registro 🚀 - Closer"
   - **Empresa**: "Nuevo Registro 🚀 - Empresa"
3. **Variables condicionales**: El contenido cambia según el valor de `{{form_type}}`
4. **Variables opcionales**: Algunas variables pueden estar vacías, usa `{{#if}}` para manejarlas
5. **Formato de fecha**: `{{registration_date}}` viene formateado en español

## 🔧 **Configuración en EmailJS:**

1. **Copia el HTML** del ejemplo anterior
2. **Pégalo en tu template** `template_h13nixs`
3. **Guarda y publica** el template
4. **Verifica** que todas las variables estén disponibles

¡Una vez configurado, tendrás emails profesionales y automáticos funcionando perfectamente! 🎉
