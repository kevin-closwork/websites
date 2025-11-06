# EmailJS - Plantillas de Bienvenida

Este documento describe cómo configurar las plantillas de EmailJS para enviar emails de bienvenida automáticos a empresas y closers cuando se registran.

## Configuración del Servicio

- **Service ID**: `service_ryia90u`
- **Public Key**: `uguMoYSMu2jKPB4oE`

## Plantillas Requeridas

### 1. Template para Closer (template_w5w6o3j)

**Variables disponibles:**
- `{{to_email}}` - Email del closer
- `{{to_name}}` - Nombre del closer (extraído del email)
- `{{years_experience}}` - Años de experiencia cerrando B2B
- `{{biggest_deal}}` - Deal más grande cerrado (formateado como $XX,XXX)
- `{{industries}}` - Industrias dominadas (separadas por comas)
- `{{ticket_range}}` - Rango de ticket sweet spot
- `{{markets}}` - Mercados donde vende (separados por comas)
- `{{superpower}}` - Tipo de closer (Hunter, Farmer, Técnico, etc.)
- `{{registration_date}}` - Fecha de registro (formato español)

**Ejemplo de uso:**
```
Hola {{to_name}},

¡Bienvenido a Closwork! 🚀

Gracias por registrarte como Closer. Hemos recibido tu información:

📊 Tu perfil:
• Experiencia: {{years_experience}} años
• Deal más grande: {{biggest_deal}}
• Industrias: {{industries}}
• Ticket: {{ticket_range}}
• Mercados: {{markets}}
• Superpoder: {{superpower}}

Te contactaremos pronto para conectar con empresas que buscan closers como tú.

¡Bienvenido a la elite! 💪

El equipo de Closwork
```

### 2. Template para Empresa (template_9591x3s)

**Variables disponibles:**
- `{{to_email}}` - Email de la empresa
- `{{to_name}}` - Nombre del representante de la empresa
- `{{company_industry}}` - Industria de la empresa
- `{{ticket_range}}` - Rango de ticket promedio
- `{{sales_cycle}}` - Ciclo de ventas
- `{{deals_count}}` - Número de deals por mes
- `{{markets}}` - Mercados objetivo (separados por comas)
- `{{selling_type}}` - Tipo de venta (Inbound, Outbound, Mixto)
- `{{has_team}}` - Si tiene equipo de ventas
- `{{team_size}}` - Tamaño del equipo
- `{{has_leads}}` - Si tiene base de leads
- `{{leads_size}}` - Tamaño de la base de leads
- `{{registration_date}}` - Fecha de registro (formato español)

**Ejemplo de uso:**
```
Hola {{to_name}},

¡Bienvenido a Closwork! 🚀

Gracias por registrarte como Empresa. Hemos recibido tu información:

🏢 Tu empresa:
• Industria: {{company_industry}}
• Ticket promedio: {{ticket_range}}
• Ciclo de ventas: {{sales_cycle}}
• Deals por mes: {{deals_count}}
• Mercados: {{markets}}
• Tipo de venta: {{selling_type}}
• Equipo: {{has_team}} {{#if team_size}}({{team_size}} personas){{/if}}
• Base de leads: {{has_leads}} {{#if leads_size}}({{leads_size}} leads){{/if}}

Te contactaremos pronto para conectar con closers que se ajusten a tus necesidades.

¡Juntos cerraremos más deals! 💰

El equipo de Closwork
```

## Configuración en EmailJS

1. **Crear el servicio** con ID `service_ryia90u`
2. **Crear las plantillas** con los IDs especificados
3. **Configurar las variables** en cada plantilla
4. **Probar** el envío con datos de ejemplo

## Flujo de Emails

Cuando un usuario se registra:

1. **Se envía notificación** al equipo de Closwork (servicio existente)
2. **Se envía email de bienvenida** al usuario registrado (nuevo servicio)
3. **Se redirige** a la página de gracias

## Notas Importantes

- Los emails de bienvenida se envían **después** de guardar los datos en Firebase
- Si falla el envío del email de bienvenida, **no se bloquea** el flujo de registro
- Se mantiene el servicio existente de notificaciones intacto
- Los emails de bienvenida usan un servicio separado para mayor flexibilidad

## Troubleshooting

Si los emails de bienvenida no se envían:

1. Verificar que el Service ID y Public Key sean correctos
2. Confirmar que las plantillas existan y tengan los IDs correctos
3. Revisar la consola del navegador para errores
4. Verificar que las variables de la plantilla coincidan con las enviadas
