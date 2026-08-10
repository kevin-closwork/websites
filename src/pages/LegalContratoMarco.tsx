import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { LegalDocView } from "@/components/legal/LegalDocView";
import { getDoc } from "@/lib/legal/registry";
import NotFound from "@/pages/NotFound";

export default function LegalContratoMarco() {
  const { versionSlug } = useParams<{ versionSlug?: string }>();
  const version = versionSlug?.replace(/^v/i, "");
  const doc = getDoc("contrato-marco", version);

  if (!doc) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{doc.title} — Closwork</title>
        <link rel="canonical" href={`/legal/contrato-marco/v${doc.version}`} />
      </Helmet>
      <LegalDocView doc={doc} />
    </>
  );
}

export function LegalContratoMarcoRedirect() {
  const doc = getDoc("contrato-marco");
  if (!doc) return <NotFound />;
  return <Navigate to={`/legal/contrato-marco/v${doc.version}`} replace />;
}
