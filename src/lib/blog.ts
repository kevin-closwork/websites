import matter from "gray-matter";

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

const rawModules = import.meta.glob("../content/blog/posts/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

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

export function parsePost(path: string, raw: string): BlogPost | null {
  const { data, content } = matter(raw);
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
  for (const [path, raw] of Object.entries(rawModules)) {
    const post = parsePost(path, raw);
    if (post) posts.push(post);
  }
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
