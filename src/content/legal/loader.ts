/** Vite: globs relativos junto al contenido legal. */
export const legalMarkdownRaw = import.meta.glob("./**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;
