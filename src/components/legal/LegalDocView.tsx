import { Link } from "react-router-dom";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import type { LegalDoc } from "@/lib/legal/registry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalDocViewProps = {
  doc: LegalDoc;
  showVersionBadge?: boolean;
};

export function LegalDocView({ doc, showVersionBadge = true }: LegalDocViewProps) {
  return (
    <div className="min-h-screen landing-page flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          {showVersionBadge ? (
            <p className="text-sm text-muted-foreground mb-2">
              Versión {doc.version} · Vigente desde {doc.effectiveDate}
            </p>
          ) : null}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">{doc.title}</h1>
          <p className="text-xs text-muted-foreground mt-2 font-mono break-all">
            SHA-256: {doc.hash.slice(0, 16)}…
          </p>
        </div>
        <article
          className="prose prose-lg max-w-none
          prose-headings:text-secondary prose-p:text-foreground
          prose-a:text-primary prose-strong:text-secondary
          prose-blockquote:border-l-primary prose-li:marker:text-primary"
        >
          <BlogMarkdown markdown={doc.markdown} />
        </article>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/legal"
            className="text-sm text-primary font-medium hover:underline underline-offset-4"
          >
            ← Índice legal
          </Link>
          <Link
            to="/contratar"
            className="text-sm text-primary font-medium hover:underline underline-offset-4"
          >
            Contratar Plan Concierge
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
