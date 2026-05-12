# Guía — Formato Markdown del blog Closwork

Este archivo es la referencia oficial para crear entradas. Los artículos publicados van en **`posts/`**. Filenames: sólo minúsculas, guiones (`-`), sin espacios.

---

## Copiar/adaptar este prompt cuando uses una IA

Escribe un artículo en **Markdown** para el blog de **Closwork** (ventas B2B, closers por comisión, LATAM).  
**Idioma:** español. **Tono:** profesional, claro, sin relleno.

**Obligatorio al inicio del documento** (YAML entre `---`):

- `title`: título que verá el lector (será el H1 de la página).
- `description`: 1–2 frases (≈150–160 caracteres), únicas, sin clickbait vacío; piensa en el snippet de Google.
- `date`: `YYYY-MM-DD`.
- `author`: nombre o `Closwork`.
- `tags`: lista corta (2–5 etiquetas).
- `draft: false` para publicar; `draft: true` para ocultar del listado y del build de rutas (no se mostrará).

**Estructura del cuerpo**

- **No** repitas el título con `#` al inicio: la plantilla ya muestra `title` como H1.
- Primera sección del cuerpo: empieza con `##`, no con `#`.
- Jerarquía estricta: `##` → `###` → `####`. No saltes niveles.
- Párrafos cortos (2–4 líneas). Una idea por párrafo.
- Incluye al menos una **lista** (ordenada o con viñetas) o una **tabla** si aporta claridad.
- Un **blockquote** (`>`) con la idea clave o takeaway ayuda SEO y lectura por IA.
- **Enlaces internos** con ruta absoluta del sitio: `[texto](/blog/otro-slug)`, `[texto](/solicitud?type=empresa)`. Sin dominio cuando sea interno.
- **Enlaces externos:** URL completa con `https://`; la web los abrirá en pestaña nueva.
- Cierra con un párrafo de **siguiente paso** o pregunta (CTA natural), sin ser agresivo.

**Evitar**

- Títulos en mayúsculas sostenidas tipo “CLICK AQUÍ”.
- Contenido genérico repetible (“en el mundo de hoy…”).
- Múltiples H1 (`#`).
- Keyword stuffing.

**Ejemplo de frontmatter válido:**

```yaml
---
title: "Cómo validar closers antes de un piloto"
description: "Pasos prácticos para empresas B2B en LATAM: qué revisar antes de lanzar fuerza comercial externa."
date: "2026-05-11"
author: "Closwork"
tags:
  - Closers
  - B2B
  - Validación
draft: false
---
```

---

## Sintaxis Markdown útil (recordatorio)

| Elemento | Sintaxis |
|----------|----------|
| H2 | `## Título` |
| H3 | `### Subtítulo` |
| Negrita | `**texto**` |
| Cursiva | `*texto*` |
| Enlace | `[etiqueta](url)` |
| Imagen | `![alt](https://...)` |
| Cita | `> texto` |
| Lista | `- ítem` o `1.` |
| Código inline | `` `código` `` |
| Bloque código | cercar con triple backtick \`\`\` |
| Horizontal | `---` en línea propia |

**Tablas (GFM):**

```markdown
| Columna | Columna |
|---------|---------|
| dato    | dato    |
```

---

## Comprobación rápida antes de publicar

1. ¿`description` distinta del primer párrafo del cuerpo?
2. ¿Fecha ISO correcta?
3. ¿Slug deseado = nombre del archivo sin `.md` (o uso de `slug` en YAML si necesitás algo distinto al filename)?
4. ¿Al menos dos encabezados `##` o `###`?
5. ¿Enlace interno útil al producto cuando encaje (`/`, `/blog`, `/solicitud`)?
6. Revisión humana: datos, legales y métricas verificados.
