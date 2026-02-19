# 🎨 Paleta de Colores - Closwork

## Colores Principales de Marca

### 🟢 Primary (Verde)
- **HSL**: `152 48% 47%`
- **HEX**: `#4aab6f`
- **RGB**: `rgb(74, 171, 111)`
- **Uso**: Color principal de marca, botones principales, acentos
- **Foreground**: Blanco (`0 0% 100%`)

### 🔵 Secondary (Azul Oscuro)
- **HSL**: `210 100% 21%`
- **HEX**: `#003976`
- **RGB**: `rgb(0, 57, 118)`
- **Uso**: Textos principales, títulos, elementos secundarios
- **Foreground**: Blanco (`0 0% 100%`)

### ✨ Primary Glow (Verde Brillante)
- **HSL**: `152 58% 57%`
- **HEX**: `#5bb87d` (aproximado)
- **Uso**: Efectos de brillo, hover states, highlights

---

## Colores del Sistema

### Background & Foreground
- **Background**: `0 0% 100%` (Blanco puro)
- **Foreground**: `210 100% 21%` (Azul oscuro - mismo que secondary)

### Muted (Grises Suaves)
- **Muted**: `210 15% 96%` (Gris muy claro)
- **Muted Foreground**: `210 10% 46%` (Gris medio)

### Accent
- **Accent**: `152 48% 47%` (Mismo que primary)
- **Accent Foreground**: `0 0% 100%` (Blanco)

### Destructive (Rojo/Error)
- **HSL**: `0 84.2% 60.2%`
- **HEX**: `#ef4444` (aproximado)
- **Foreground**: Blanco

### Borders & Inputs
- **Border**: `210 15% 90%` (Gris claro)
- **Input**: `210 15% 90%` (Mismo que border)
- **Ring**: `152 48% 47%` (Mismo que primary)

---

## Gradientes

### Gradient Primary
```css
linear-gradient(135deg, hsl(152 48% 47%), hsl(152 58% 57%))
```
- **De**: Verde principal (`#4aab6f`)
- **A**: Verde brillante (`#5bb87d`)
- **Dirección**: 135deg (diagonal)

### Gradient Secondary
```css
linear-gradient(135deg, hsl(210 100% 21%), hsl(210 80% 35%))
```
- **De**: Azul oscuro (`#003976`)
- **A**: Azul medio (`#1a4a7a` aproximadamente)
- **Dirección**: 135deg (diagonal)

### Gradient Hero
```css
linear-gradient(135deg, hsl(210 100% 21%) 0%, hsl(152 48% 47%) 100%)
```
- **De**: Azul oscuro (`#003976`)
- **A**: Verde principal (`#4aab6f`)
- **Uso**: Fondo del hero section

### Gradient Tech
```css
linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(210 15% 98%) 100%)
```
- **De**: Blanco puro
- **A**: Gris muy claro
- **Dirección**: Vertical (180deg)

---

## Sombras (Shadows)

### Shadow Glow
```css
box-shadow: 0 0 40px hsl(152 48% 47% / 0.3);
```
- **Color**: Verde primary con 30% de opacidad
- **Uso**: Efectos de brillo en elementos interactivos

### Shadow Elevation
```css
box-shadow: 0 10px 30px -10px hsl(210 100% 21% / 0.2);
```
- **Color**: Azul secondary con 20% de opacidad
- **Uso**: Elevación de tarjetas y elementos flotantes

### Shadow Card
```css
box-shadow: 0 4px 20px hsl(210 20% 15% / 0.1);
```
- **Color**: Gris oscuro con 10% de opacidad
- **Uso**: Sombras sutiles en tarjetas

---

## Colores Adicionales (Tailwind Extended)

Estos colores están definidos en `tailwind.config.ts` pero no tienen valores en `index.css`:
- `tech-blue`
- `startup-yellow`
- `electric-blue`
- `cyber-yellow`
- `innovation-blue`
- `brand`
- `success-green`
- `success-green-light`

---

## Modo Oscuro (Dark Mode)

### Background & Foreground
- **Background**: `222.2 84% 4.9%` (Azul muy oscuro)
- **Foreground**: `210 40% 98%` (Gris muy claro/blanco)

### Primary (Dark)
- **Primary**: `210 40% 98%` (Blanco/gris claro)
- **Primary Foreground**: `222.2 47.4% 11.2%` (Azul oscuro)

### Secondary (Dark)
- **Secondary**: `217.2 32.6% 17.5%` (Gris azulado oscuro)
- **Secondary Foreground**: `210 40% 98%` (Blanco)

### Muted (Dark)
- **Muted**: `217.2 32.6% 17.5%`
- **Muted Foreground**: `215 20.2% 65.1%` (Gris medio)

---

## Colores de Uso Común en Componentes

### Footer
- **Background**: `bg-slate-950` (Gris muy oscuro)
- **Texto Principal**: `text-zinc-100` (Gris muy claro)
- **Texto Secundario**: `text-zinc-50` (Gris claro)
- **Links**: `text-muted-foreground` con hover a `text-primary`

### Hero Section
- **Background**: `gradient-hero` (Azul a Verde)
- **Texto**: Blanco (`text-white`)
- **Badges**: `bg-white/10` con `backdrop-blur-sm`

### Planes (Cards)
- **Plan Popular (GROWTH)**:
  - Background: `from-[#4aab6f] via-[#5bb87d] to-[#6bbf8a]`
  - Texto: Blanco
  - Badge: `from-[#003976] to-[#1a4a7a]`

- **Planes Regulares**:
  - Background: Blanco
  - Texto: `text-secondary` (Azul oscuro)
  - Border: `border-gray-100`

### Botones

#### Variante "hero"
- Background: Gradiente azul a verde
- Texto: Blanco

#### Variante "outline-white"
- Border: Blanco
- Background: Transparente
- Texto: Blanco

#### Variante "success"
- Background: Verde primary
- Texto: Blanco

---

## Valores HSL a HEX (Referencia Rápida)

| HSL | HEX | Descripción |
|-----|-----|-------------|
| `152 48% 47%` | `#4aab6f` | Primary (Verde) |
| `152 58% 57%` | `#5bb87d` | Primary Glow |
| `210 100% 21%` | `#003976` | Secondary (Azul) |
| `210 80% 35%` | `#1a4a7a` | Azul Medio |
| `210 15% 96%` | `#f5f6f8` | Muted (Gris claro) |
| `210 10% 46%` | `#6b7280` | Muted Foreground |
| `210 15% 90%` | `#e5e7eb` | Border/Input |
| `0 84.2% 60.2%` | `#ef4444` | Destructive |

---

## Clases de Utilidad Tailwind

### Backgrounds
- `bg-primary` → Verde principal
- `bg-secondary` → Azul oscuro
- `bg-gradient-primary` → Gradiente verde
- `bg-gradient-secondary` → Gradiente azul
- `bg-gradient-hero` → Gradiente hero (azul a verde)
- `bg-gradient-tech` → Gradiente tech (blanco a gris)

### Text Colors
- `text-primary` → Verde principal
- `text-secondary` → Azul oscuro
- `text-muted-foreground` → Gris medio
- `text-primary-glow` → Verde brillante

### Borders
- `border-primary` → Borde verde
- `border-secondary` → Borde azul
- `border-border` → Borde gris claro

### Shadows
- `shadow-glow` → Sombra con efecto glow verde
- `shadow-elevation` → Sombra elevada azul
- `shadow-card` → Sombra sutil para tarjetas

---

## Guía de Uso

### ✅ Usar Primary (Verde) para:
- Botones principales y CTAs
- Enlaces y elementos interactivos
- Iconos y acentos
- Estados de éxito
- Badges y etiquetas

### ✅ Usar Secondary (Azul) para:
- Títulos y headings principales
- Texto de cuerpo importante
- Fondos de secciones
- Elementos de navegación

### ✅ Usar Gradientes para:
- Hero sections
- Fondos de secciones destacadas
- Botones principales
- Cards especiales (plan popular)

### ✅ Usar Muted para:
- Texto secundario
- Placeholders
- Elementos deshabilitados
- Fondos sutiles

---

## Ejemplos de Combinaciones

### Combinación Principal
- **Fondo**: Gradiente Hero (Azul → Verde)
- **Texto**: Blanco
- **Botones**: Verde primary con hover glow

### Combinación Secundaria
- **Fondo**: Blanco o gradient-tech
- **Texto**: Azul secondary
- **Acentos**: Verde primary

### Combinación de Tarjetas
- **Fondo**: Blanco
- **Border**: Gris claro
- **Título**: Azul secondary
- **Texto**: Gris muted
- **CTA**: Verde primary

---

## Accesibilidad

### Contraste Recomendado
- **Primary sobre Blanco**: ✅ WCAG AA (4.5:1)
- **Secondary sobre Blanco**: ✅ WCAG AA (4.5:1)
- **Blanco sobre Primary**: ✅ WCAG AA (4.5:1)
- **Blanco sobre Secondary**: ✅ WCAG AA (4.5:1)

### Estados Interactivos
- **Hover**: Usar `primary-glow` o aumentar opacidad
- **Active**: Reducir brillo ligeramente
- **Focus**: Ring verde (`ring-primary`)

---

¡Listo para usar en tu diseño! 🎨
