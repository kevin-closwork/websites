/**
 * Vite: los globs relativos deben estar junto al contenido; si cargas desde `/lib`
 * el patrón a veces queda vacío en dev/deploy y `/blog` se renderiza sin posts.
 */
export const blogMarkdownRaw = import.meta.glob("./posts/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;
