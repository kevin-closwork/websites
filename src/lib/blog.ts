import { parse as parseYaml } from "yaml";
import { blogMarkdownRaw } from "@/content/blog/loader";

/**
 * gray-matter usa Buffer (Node) — falla en el navegador. Frontmatter YAML con `yaml`.
 * Delimitador: línea exacta "---" después del bloque.
 */
function splitFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const text = raw.replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);
  if ((lines[0]?.trim() ?? "") !== "---") {
    return { data: {}, content: text };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if ((lines[i]?.trim() ?? "") === "---") {
      end = i;
      break;
    }
  }

  if (end === -1) {
    return { data: {}, content: text };
  }

  const yamlBlock = lines.slice(1, end).join("\n");
  const content = lines.slice(end + 1).join("\n");

  let data: Record<string, unknown> = {};
  if (yamlBlock.trim()) {
    try {
      const parsed = parseYaml(yamlBlock) as unknown;
      if (
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        data = parsed as Record<string, unknown>;
      }
    } catch {
      /* YAML inválido */
    }
  }

  return { data, content };
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  author?: string;
  tags?: string[];
  /** Overrides filename-based slug when set */
  slug?: string;
  /** Omit from listing and routes when true */
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTimeMinutes: number;
}

function slugFromPath(filePath: string): string {
  const normalized = filePath.replace(/\\/g, "/");
  const base = normalized.split("/").pop() ?? "";
  return base.replace(/\.md$/i, "");
}

function readingTime(md: string): number {
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}

/** `YYYY-MM-DD` como día civil local — evita mostrar el día anterior en LATAM (`new Date("2026-01-12")` es UTC midnight). */
export function parseBlogDate(ymd: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return new Date(ymd);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d);
}

export function parsePost(path: string, raw: string): BlogPost | null {
  const { data, content } = splitFrontmatter(raw);
  const fm = data as Partial<BlogFrontmatter>;
  if (fm.draft === true) return null;
  const title = fm.title ?? slugFromPath(path);
  const description = fm.description ?? "";
  const date = normalizeDate(fm.date);
  if (!description || !date) return null;

  const slug =
    typeof fm.slug === "string" && fm.slug.trim()
      ? fm.slug.trim().toLowerCase()
      : slugFromPath(path);

  return {
    title,
    description,
    date,
    slug,
    author: fm.author,
    tags: Array.isArray(fm.tags)
      ? fm.tags.filter((t): t is string => typeof t === "string")
      : [],
    content,
    readingTimeMinutes: readingTime(content),
  };
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const [path, raw] of Object.entries(blogMarkdownRaw)) {
    try {
      const post = parsePost(path, raw);
      if (post) posts.push(post);
    } catch (e) {
      console.error("[blog] parse error:", path, e);
    }
  }
  return posts.sort(
    (a, b) =>
      parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
