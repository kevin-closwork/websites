# 🎯 Mapa de Eventos Meta Pixel - Closwork

## 📊 Resumen de Eventos por Página

### 🏠 **PÁGINA PRINCIPAL (Index.tsx)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Homepage', 'landing' | useEffect |
| **"Soy Empresa" (principal)** | `Lead` | 'Empresa Registration Click', 0 | Línea 66 |
| **"Soy Closer" (principal)** | `Lead` | 'Closer Registration Click', 0 | Línea 75 |
| **"Empresa" (sticky CTA)** | `Lead` | 'Empresa Registration Click - Sticky CTA', 0 | Línea 99 |
| **"Closer" (sticky CTA)** | `Lead` | 'Closer Registration Click - Sticky CTA', 0 | Línea 108 |
| **Email contacto** | `Contact` | 'Email Contact' | Línea 145 |
| **Teléfono contacto** | `Contact` | 'Phone Contact' | Línea 155 |
| **"Precios" (footer)** | `ViewContent` | 'Pricing Calculator', 'navigation' | Línea 180 |
| **"Registro" (footer)** | `Lead` | 'Registration Link Click', 0 | Línea 190 |

---

### 🏢 **PÁGINA EMPRESAS V2 (EmpresasV2.tsx)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Empresas V2 Page', 'landing' | useEffect |
| **Secciones de contenido** | `ViewContent` | 'Empresas V2 - [Section]', '[category]' | useEffect (delay 1s) |
| **"Registra tu empresa gratis" (Hero)** | `Lead` + `InitiateCheckout` + `SubmitApplication` | 'Empresa Registration - Hero CTA', 0 | Línea 131-134 |
| **"Contactar" (Hero)** | `Contact` + `Lead` | 'WhatsApp Contact - Hero Section', 0 | Línea 146-148 |
| **"Registra tu empresa gratis" (Card)** | `Lead` + `InitiateCheckout` + `SubmitApplication` + `StartTrial` | 'Empresa Registration - Directory Card', 0 | Línea 588-592 |
| **"Registra tu empresa gratis" (Final CTA)** | `Lead` + `InitiateCheckout` + `SubmitApplication` + `CompleteRegistration` | 'Empresa Registration - Final CTA', 0 | Línea 668-672 |
| **"Contactar" (Final CTA)** | `Contact` + `Lead` + `Schedule` | 'WhatsApp Contact - Final CTA', 0 | Línea 684-687 |
| **Hover - Visibilidad Premium** | `ViewContent` | 'Empresas V2 - Visibilidad Premium Benefit', 'benefit' | Línea 490 |
| **Hover - Recomendaciones Orgánicas** | `ViewContent` | 'Empresas V2 - Recomendaciones Orgánicas Benefit', 'benefit' | Línea 507 |
| **Hover - Credibilidad Validada** | `ViewContent` | 'Empresas V2 - Credibilidad Validada Benefit', 'benefit' | Línea 524 |
| **Hover - Acceso Prioritario** | `ViewContent` | 'Empresas V2 - Acceso Prioritario Benefit', 'benefit' | Línea 541 |
| **Hover - Stats 50+ Empresas** | `ViewContent` | 'Empresas V2 - Stats - 50+ Empresas', 'stats' | Línea 643 |
| **Hover - Stats 200+ Closers** | `ViewContent` | 'Empresas V2 - Stats - 200+ Closers', 'stats' | Línea 651 |
| **Hover - Stats 95% Satisfacción** | `ViewContent` | 'Empresas V2 - Stats - 95% Satisfacción', 'stats' | Línea 659 |

---

### 🏢 **PÁGINA EMPRESAS (Empresas.tsx)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Empresas Page', 'landing' | useEffect |
| **Reproducir video demo** | `ViewContent` | 'Demo Video Play', 'video' | Línea 93 |
| **"Ver Demo en 2 Minutos"** | `ViewContent` | 'Demo Request', 'cta' | Línea 135 |
| **"Hablar con un Experto"** | `Contact` | 'Expert Consultation' | Línea 144 |
| **"Ver Demo Gratis" (CTA)** | `ViewContent` | 'Free Demo Request', 'cta' | Línea 447 |
| **"Hablar con Experto" (CTA)** | `Contact` | 'Expert Consultation - CTA' | Línea 456 |

---

### 🏢 **PÁGINA EMPRESAS V2 (EmpresasV2.tsx)**
**🔧 PIXEL ID ESPECÍFICO: 757168883861497**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Empresas V2 Page', 'landing' | useEffect |
| **"Registra tu empresa gratis" (hero)** | `Lead` | 'Empresa Registration - Beta Directory', 0 | Línea 111 |
| **"Contactar" (WhatsApp hero)** | `Contact` | 'WhatsApp Contact - Empresas V2' | Línea 123 |
| **"Registra tu empresa gratis" (card)** | `Lead` | 'Empresa Registration - Beta Directory Card', 0 | Línea 563 |
| **"Registra tu empresa gratis" (final CTA)** | `Lead` | 'Empresa Registration - Final CTA', 0 | Línea 639 |
| **"Contactar" (final CTA)** | `Contact` | 'WhatsApp Contact - Final CTA' | Línea 650 |

**📌 NOTA**: Esta página utiliza un pixel ID específico (757168883861497) diferente al pixel principal (2578574645813186) para tracking separado de conversiones.

---

### 📝 **FORMULARIOS**

#### **CompanyForm.tsx**
**🔧 PIXEL ID ESPECÍFICO: 757168883861497 (cuando se accede desde plan=Directorio%20Beta)**

| Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------|-------------------|-------------|-----------|
| **Inicio de envío** | `InitiateCheckout` | 'Company Registration Form', 0 | Línea 125 |
| **Registro exitoso** | `CompleteRegistration` | 'Company Registration' | Línea 172 |
| **Registro exitoso** | `Lead` | 'Company Registration Complete', 0 | Línea 173 |

**📌 NOTA**: El formulario de empresa usa automáticamente el pixel correcto basado en la URL. Si se accede desde `?plan=Directorio%20Beta`, usa el pixel específico (757168883861497).

#### **CloserForm.tsx**
| Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------|-------------------|-------------|-----------|
| **Inicio de envío** | `InitiateCheckout` | 'Closer Registration Form', 0 | Línea 134 |
| **Registro exitoso** | `CompleteRegistration` | 'Closer Registration' | Línea 174 |
| **Registro exitoso** | `Lead` | 'Closer Registration Complete', 0 | Línea 175 |

---

### 📋 **PÁGINA SOLICITUD (Solicitud.tsx)**
**🔧 PIXEL ID ESPECÍFICO: 757168883861497 (solo para plan=Directorio%20Beta)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página (empresa)** | `ViewContent` | 'Company Registration Page', 'form' | useEffect |
| **Carga de página (general)** | `ViewContent` | 'Registration Page', 'form' | useEffect |
| **"Compartir para acceso VIP"** | `Lead` | 'VIP Access Share', 0 | Línea 67 |
| **Registro exitoso (empresa)** | `Lead` + `CompleteRegistration` + `Purchase` | 'Company Registration Complete', 0 | useEffect success |
| **Registro exitoso (closer)** | `Lead` + `CompleteRegistration` | 'Closer Registration Complete', 0 | useEffect success |

**📌 NOTA**: Cuando se accede con `?plan=Directorio%20Beta`, la página usa el pixel ID específico (757168883861497) para tracking separado de conversiones del directorio beta.

---

### 🧮 **CALCULADORA (Calculator.tsx)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Calculator Page', 'tool' | useEffect |
| **"Quiero ahorrar ahora"** | `Lead` | 'Calculator CTA - Save Now', 0 | Línea 237 |
| **"Ver más beneficios"** | `ViewContent` | 'More Benefits', 'navigation' | Línea 248 |

---

### 💰 **PÁGINA PRECIOS (Pricing.tsx)**

| Botón/Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------------|-------------------|-------------|-----------|
| **Carga de página** | `ViewContent` | 'Pricing Page', 'pricing' | useEffect |
| **"Comenzar Ahora" (header)** | `Lead` | 'Pricing Header CTA', 0 | Línea 52 |
| **"Comenzar Ahora" (final CTA)** | `Lead` | 'Pricing Final CTA', 0 | Línea 188 |
| **"Ver Demo" (final CTA)** | `ViewContent` | 'Demo Request - Pricing', 'cta' | Línea 198 |

---

### ✅ **PÁGINAS DE AGRADECIMIENTO**

#### **GraciasEmpresa.tsx**
| Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------|-------------------|-------------|-----------|
| **Carga de página** | `Purchase` | 'Company Registration Complete', 0, 'USD' | useEffect |

#### **GraciasCloser.tsx**
| Acción | Evento Meta Pixel | Descripción | Ubicación |
|--------|-------------------|-------------|-----------|
| **Carga de página** | `Purchase` | 'Closer Registration Complete', 0, 'USD' | useEffect |

---

## 📈 **Resumen de Tipos de Eventos**

### **Eventos de Conversión (Alto Valor)**
- `Lead` - 12 eventos (generación de leads)
- `CompleteRegistration` - 2 eventos (registro completado)
- `Purchase` - 2 eventos (conversión final)

### **Eventos de Interacción (Medio Valor)**
- `ViewContent` - 8 eventos (visualización de contenido)
- `Contact` - 5 eventos (contacto con la empresa)
- `InitiateCheckout` - 2 eventos (inicio de proceso)

### **Eventos por Categoría**
- **Navegación**: 3 eventos
- **Formularios**: 4 eventos
- **CTAs principales**: 8 eventos
- **Contacto**: 5 eventos
- **Conversión**: 4 eventos

---

## 🎯 **Funnel de Conversión**

1. **Awareness** → `ViewContent` (páginas principales)
2. **Interest** → `ViewContent` (demos, calculadora)
3. **Consideration** → `Lead` (CTAs de registro)
4. **Intent** → `InitiateCheckout` (inicio de formularios)
5. **Action** → `CompleteRegistration` (formulario enviado)
6. **Conversion** → `Purchase` (registro exitoso)

---

## 🔧 **Configuración en Facebook Ads Manager**

### **Pixels Configurados:**
- **Pixel Principal**: `2578574645813186` (todas las páginas excepto empresas-v2 y solicitud con plan Directorio Beta)
- **Pixel Empresas V2**: `757168883861497` (página empresas-v2 y solicitud con plan=Directorio%20Beta)

### **Eventos Personalizados Recomendados:**
- `Lead` → Configurar como "Conversión"
- `CompleteRegistration` → Configurar como "Conversión"
- `Purchase` → Configurar como "Conversión"
- `ViewContent` → Configurar como "Engagement"
- `Contact` → Configurar como "Engagement"

### **Audiencias Personalizadas:**
- **Interesados**: Usuarios que dispararon `ViewContent`
- **Leads Calificados**: Usuarios que dispararon `Lead`
- **Registrados**: Usuarios que dispararon `CompleteRegistration`
- **Conversiones**: Usuarios que dispararon `Purchase`

### **Configuración Específica por Pixel:**
- **Pixel Principal (2578574645813186)**: Tracking general del sitio
- **Pixel Empresas V2 (757168883861497)**: Tracking específico para conversiones de empresas y directorio beta

### **Eventos Agregados en EmpresasV2:**
- **Eventos Múltiples por Botón**: Cada botón de registro ahora dispara múltiples eventos para mejor tracking
- **Eventos de Hover**: Tracking de interacciones con elementos específicos
- **Eventos de Secciones**: Tracking automático de secciones de contenido
- **Eventos de Estadísticas**: Tracking de interacciones con métricas de confianza
  - Página empresas-v2
  - Formulario de solicitud con `?plan=Directorio%20Beta`
  - Todos los eventos relacionados con el directorio beta

---

## 📊 **Métricas Clave a Monitorear**

1. **Tasa de Conversión**: `Purchase` / `ViewContent`
2. **Tasa de Lead**: `Lead` / `ViewContent`
3. **Tasa de Registro**: `CompleteRegistration` / `Lead`
4. **Engagement**: `Contact` / `ViewContent`
5. **Funnel Drop-off**: Porcentaje de pérdida entre cada etapa

---

*Última actualización: $(date)*
*Total de eventos implementados: 29*
