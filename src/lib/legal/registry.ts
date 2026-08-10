import { sha256 } from "js-sha256";
import { legalMarkdownRaw } from "@/content/legal/loader";
import { splitFrontmatter } from "@/lib/markdownFrontmatter";

export type LegalDocStatus = "vigente" | "archivado";

export type OrderPricing = {
  base_amount: number;
  base_included_closers: number;
  additional_closer_amount: number;
  max_additional_closers: number;
  max_total_closers?: number;
  implementation_fee: number;
  sales_commission_pct: number;
  direct_placement_fee?: number;
  minimum_term_months?: number;
};

export type OrderGuarantees = {
  first_closer_placement_business_days: number;
  subsequent_closer_placement_business_days: number;
  refund_deadline_business_days: number;
  replacements_per_position: number;
  replacement_window_months: number;
  max_direct_competitors: number;
};

export type LegalDoc = {
  docId: string;
  version: string;
  hash: string;
  effectiveDate: string;
  status: LegalDocStatus;
  url: string;
  title: string;
  orderCode?: string;
  frontmatter: Record<string, unknown>;
  markdown: string;
  pricing?: OrderPricing;
  guarantees?: OrderGuarantees;
};

const DOCS: LegalDoc[] = [];

function pathToMeta(filePath: string): {
  docId: string;
  version: string;
  planSlug?: string;
} | null {
  const norm = filePath.replace(/\\/g, "/");
  const m1 = norm.match(/contrato-marco\/v([\d.]+)\.md$/i);
  if (m1) return { docId: "contrato-marco", version: m1[1] };
  const m2 = norm.match(/orden-servicio\/([^/]+)\/v([\d.]+)\.md$/i);
  if (m2) return { docId: "os-concierge", version: m2[2], planSlug: m2[1] };
  const m3 = norm.match(/privacidad\/v([\d.]+)\.md$/i);
  if (m3) return { docId: "aviso-privacidad", version: m3[1] };
  return null;
}

function parsePricing(fm: Record<string, unknown>): OrderPricing | undefined {
  const p = fm.pricing;
  if (!p || typeof p !== "object" || Array.isArray(p)) return undefined;
  const o = p as Record<string, unknown>;
  const num = (k: string) => Number(o[k]);
  if (Number.isNaN(num("base_amount"))) return undefined;
  return {
    base_amount: num("base_amount"),
    base_included_closers: num("base_included_closers"),
    additional_closer_amount: num("additional_closer_amount"),
    max_additional_closers: num("max_additional_closers"),
    max_total_closers: o.max_total_closers != null ? num("max_total_closers") : undefined,
    implementation_fee: num("implementation_fee"),
    sales_commission_pct: num("sales_commission_pct"),
    direct_placement_fee: o.direct_placement_fee != null ? num("direct_placement_fee") : undefined,
    minimum_term_months: o.minimum_term_months != null ? num("minimum_term_months") : undefined,
  };
}

function parseGuarantees(fm: Record<string, unknown>): OrderGuarantees | undefined {
  const g = fm.guarantees;
  if (!g || typeof g !== "object" || Array.isArray(g)) return undefined;
  const o = g as Record<string, unknown>;
  const num = (k: string) => Number(o[k]);
  return {
    first_closer_placement_business_days: num("first_closer_placement_business_days"),
    subsequent_closer_placement_business_days: num("subsequent_closer_placement_business_days"),
    refund_deadline_business_days: num("refund_deadline_business_days"),
    replacements_per_position: num("replacements_per_position"),
    replacement_window_months: num("replacement_window_months"),
    max_direct_competitors: num("max_direct_competitors"),
  };
}

function buildRegistry(): LegalDoc[] {
  const docs: LegalDoc[] = [];
  for (const [path, raw] of Object.entries(legalMarkdownRaw)) {
    const meta = pathToMeta(path);
    if (!meta) continue;
    const { data, content } = splitFrontmatter(raw);
    const docId = String(data.doc_id ?? meta.docId);
    const version = String(data.version ?? meta.version);
    const status = (data.status === "archivado" ? "archivado" : "vigente") as LegalDocStatus;
    docs.push({
      docId,
      version,
      hash: sha256(raw),
      effectiveDate: String(data.effective_date ?? ""),
      status,
      url: String(data.url ?? ""),
      title: String(data.title ?? docId),
      orderCode: data.order_code != null ? String(data.order_code) : undefined,
      frontmatter: data,
      markdown: content.trim(),
      pricing: parsePricing(data),
      guarantees: parseGuarantees(data),
    });
  }
  return docs.sort((a, b) =>
    a.docId === b.docId
      ? b.version.localeCompare(a.version, undefined, { numeric: true })
      : a.docId.localeCompare(b.docId)
  );
}

function ensureRegistry() {
  if (DOCS.length === 0) {
    DOCS.push(...buildRegistry());
  }
}

export function getAllLegalDocs(): LegalDoc[] {
  ensureRegistry();
  return [...DOCS];
}

export function listVersions(docId: string): LegalDoc[] {
  return getAllLegalDocs().filter((d) => d.docId === docId);
}

export function getDoc(docId: string, version?: string): LegalDoc | undefined {
  const versions = listVersions(docId);
  if (version) return versions.find((d) => d.version === version);
  return versions.find((d) => d.status === "vigente") ?? versions[0];
}

export function getCurrentOrder(planSlug: string): LegalDoc | undefined {
  ensureRegistry();
  const slug = planSlug.toLowerCase();
  return getAllLegalDocs().find(
    (d) =>
      d.docId === "os-concierge" &&
      d.status === "vigente" &&
      d.url.includes(`/orden-servicio/${slug}/`)
  );
}

export function getFrameworkDoc(): LegalDoc | undefined {
  return getDoc("contrato-marco");
}

export function getPrivacyDoc(): LegalDoc | undefined {
  return getDoc("aviso-privacidad");
}

/** Rutas versionadas por docId (para índice /legal). */
export function legalDocRoute(doc: LegalDoc): string {
  if (doc.docId === "contrato-marco") return `/legal/contrato-marco/v${doc.version}`;
  if (doc.docId === "os-concierge") {
    const slug = doc.url.match(/orden-servicio\/([^/]+)/)?.[1] ?? "concierge";
    return `/legal/orden-servicio/${slug}/v${doc.version}`;
  }
  if (doc.docId === "aviso-privacidad") return "/privacidad";
  return doc.url || "/legal";
}
