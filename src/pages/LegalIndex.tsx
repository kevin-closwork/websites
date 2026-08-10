import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAllLegalDocs,
  legalDocRoute,
  type LegalDoc,
} from "@/lib/legal/registry";

export default function LegalIndex() {
  const docs = getAllLegalDocs();
  const grouped = docs.reduce<Record<string, LegalDoc[]>>((acc, d) => {
    (acc[d.docId] ??= []).push(d);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Documentos legales — Closwork</title>
        <meta
          name="description"
          content="Contrato Marco, Órdenes de Servicio y Aviso de Privacidad versionados de Closwork."
        />
      </Helmet>
      <div className="min-h-screen landing-page flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-secondary mb-2">Documentos legales</h1>
          <p className="text-muted-foreground mb-10">
            Versiones publicadas e inmutables. Cada documento incluye hash SHA-256 para
            trazabilidad probatoria.
          </p>
          <ul className="space-y-8">
            {Object.entries(grouped).map(([docId, versions]) => (
              <li key={docId} className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-secondary mb-4">
                  {versions[0]?.title ?? docId}
                </h2>
                <ul className="space-y-2">
                  {versions.map((v) => (
                    <li key={`${v.docId}-${v.version}`} className="flex flex-wrap items-center gap-3 text-sm">
                      <Link
                        to={legalDocRoute(v)}
                        className="text-primary font-medium hover:underline"
                      >
                        v{v.version}
                      </Link>
                      <span
                        className={
                          v.status === "vigente"
                            ? "rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs"
                            : "rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs"
                        }
                      >
                        {v.status}
                      </span>
                      <span className="text-muted-foreground">{v.effectiveDate}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </main>
        <Footer />
      </div>
    </>
  );
}
