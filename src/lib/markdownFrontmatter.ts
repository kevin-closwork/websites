import { parse as parseYaml } from "yaml";

export function splitFrontmatter(raw: string): {
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

  if (end === -1) return { data: {}, content: text };

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
