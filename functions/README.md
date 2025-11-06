# 🔥 Firebase Cloud Functions - Notificaciones por Email

## 📋 Descripción
Este directorio contiene las Cloud Functions de Firebase que se ejecutan automáticamente cuando alguien se registra en los formularios de Closwork, enviando notificaciones por email.

## 🚀 Funciones Implementadas

### 1. `onCloserFormSubmitted`
- **Trigger**: Se ejecuta cuando se crea un documento en `closer_forms`
- **Acción**: Envía notificación por email con los datos del closer registrado

### 2. `onCompanyFormSubmitted`
- **Trigger**: Se ejecuta cuando se crea un documento en `company_forms`
- **Acción**: Envía notificación por email con los datos de la empresa registrada

### 3. `helloWorld`
- **Función de prueba**: Para verificar que las funciones están funcionando

## ⚙️ Configuración

### Paso 1: Configurar Variables de Entorno
1. Copia el archivo `env.example` a `.env`:
   ```bash
   cp env.example .env
   ```

2. Edita el archivo `.env` con tus credenciales reales:
   ```env
   # Email del remitente (tu email de Gmail)
   SENDER_EMAIL=tu-email@gmail.com
   
   # Contraseña de aplicación de Gmail (NO tu contraseña normal)
   SENDER_PASSWORD=tu-contraseña-de-aplicacion
   
   # Email del destinatario (donde quieres recibir las notificaciones)
   # Puedes usar múltiples emails separados por comas
   RECIPIENT_EMAIL=kevin@closwork.com,hola@closwork.com,jonathan@closwork.com
   
   # Configuración del servidor SMTP de Gmail
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

### 📧 Múltiples Destinatarios
La función soporta múltiples destinatarios separados por comas:
- **Formato**: `email1@dominio.com,email2@dominio.com,email3@dominio.com`
- **Ejemplo**: `kevin@closwork.com,hola@closwork.com,jonathan@closwork.com`
- **Ventajas**: 
  - Todos reciben la misma notificación
  - Si un email falla, los otros siguen funcionando
  - Logs detallados de éxito/fallo por destinatario

### Paso 2: Configurar Gmail para Envío de Emails

#### Opción A: Usar Contraseña de Aplicación (Recomendado)
1. Ve a [Google Account Settings](https://myaccount.google.com/)
2. Activa la **Verificación en dos pasos** si no está activada
3. Ve a **Seguridad** → **Contraseñas de aplicación**
4. Genera una nueva contraseña para "Firebase Functions"
5. Usa esa contraseña en `SENDER_PASSWORD`

#### Opción B: Usar OAuth2 (Más Seguro)
Para implementación avanzada, considera usar OAuth2 con Google.

### Paso 3: Configurar Firebase
1. Asegúrate de estar logueado en Firebase:
   ```bash
   firebase login
   ```

2. Selecciona tu proyecto:
   ```bash
   firebase use closwork-web
   ```

## 🚀 Despliegue

### Desplegar Todas las Funciones
```bash
firebase deploy --only functions
```

### Desplegar una Función Específica
```bash
firebase deploy --only functions:onCloserFormSubmitted
firebase deploy --only functions:onCompanyFormSubmitted
```

### Ver Logs en Tiempo Real
```bash
firebase functions:log --only onCloserFormSubmitted
firebase functions:log --only onCompanyFormSubmitted
```

### 📊 Logs de Múltiples Destinatarios
Los logs muestran información detallada para cada destinatario:
- **Total de destinatarios**: Número de emails configurados
- **Emails exitosos**: Cuántos se enviaron correctamente
- **Emails fallidos**: Cuántos fallaron y por qué
- **Logs individuales**: Estado de cada email por separado

## 📧 Formato de las Notificaciones

### Email de Notificación
- **Asunto**: `🚀 Nuevo [Closer/Empresa] registrado en Closwork`
- **Contenido**:
  - ID del documento
  - Email del registrado
  - Nombre/LinkedIn
  - Fecha y hora del registro
  - Datos completos del formulario
  - Información del proyecto

### Ejemplo de Email
```
🎉 Nuevo Closer se ha registrado en Closwork

📋 Información del registro:
• ID del documento: abc123def456
• Email: closer@example.com
• Nombre/LinkedIn: LinkedIn: https://linkedin.com/in/closer
• Fecha de registro: 15/12/2024, 14:30:25

📊 Datos completos:
{
  "email": "closer@example.com",
  "linkedin": "https://linkedin.com/in/closer",
  "whatsapp": "+1234567890",
  "years": "3-5",
  ...
}
```

## 🔍 Monitoreo y Debugging

### Ver Funciones Desplegadas
```bash
firebase functions:list
```

### Ver Estado de las Funciones
```bash
firebase functions:config:get
```

### Ejecutar Función Localmente (Desarrollo)
```bash
firebase emulators:start --only functions
```

## 🛠️ Desarrollo Local

### Instalar Dependencias
```bash
npm install
```

### Ejecutar Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 📊 Costos y Límites

### Firebase Functions Pricing
- **Primeras 2M invocaciones/mes**: Gratis
- **2M+ invocaciones/mes**: $0.40 por millón
- **Tiempo de ejecución**: $0.40 por millón de GB-segundos

### Límites Configurados
- **maxInstances**: 10 (control de costos)
- **Region**: us-central1 (latencia optimizada)

## 🚨 Solución de Problemas

### Error: "Invalid login"
- Verifica que `SENDER_EMAIL` y `SENDER_PASSWORD` sean correctos
- Asegúrate de usar una contraseña de aplicación, no tu contraseña normal

### Error: "Authentication failed"
- Verifica que la verificación en dos pasos esté activada en Gmail
- Regenera la contraseña de aplicación

### Error: "Function execution failed"
- Revisa los logs: `firebase functions:log`
- Verifica que las variables de entorno estén configuradas

### Error: "Permission denied"
- Verifica que tengas permisos de administrador en el proyecto Firebase
- Ejecuta `firebase login` nuevamente

## 🔐 Seguridad

### Variables de Entorno
- **NUNCA** commits el archivo `.env` al repositorio
- Usa `.env.example` como plantilla
- Las variables se configuran en Firebase Console para producción

### Permisos de Firestore
- Las funciones solo leen datos de las colecciones específicas
- No modifican ni eliminan datos existentes
- Solo envían notificaciones por email

## 📈 Escalabilidad

### Optimizaciones Implementadas
- **maxInstances**: Limita el número de instancias concurrentes
- **Region**: us-central1 para latencia optimizada
- **Error handling**: Manejo robusto de errores
- **Logging**: Logs detallados para monitoreo

### Monitoreo Recomendado
- Configura alertas en Firebase Console
- Monitorea el uso de funciones
- Revisa logs regularmente

## 🤝 Contribución

### Estructura del Código
- `index.js`: Funciones principales
- `package.json`: Dependencias
- `.env`: Variables de entorno (no committear)
- `env.example`: Plantilla de variables

### Agregar Nuevas Funciones
1. Define la función en `index.js`
2. Configura el trigger apropiado
3. Implementa el manejo de errores
4. Agrega logging apropiado
5. Prueba localmente
6. Despliega a producción

## 📞 Soporte

Para problemas o preguntas:
- Revisa los logs de Firebase
- Consulta la [documentación oficial de Firebase Functions](https://firebase.google.com/docs/functions)
- Verifica la configuración de variables de entorno
