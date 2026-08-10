import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { LegalDocView } from "@/components/legal/LegalDocView";
import { getDoc } from "@/lib/legal/registry";
import NotFound from "@/pages/NotFound";

export default function LegalOrdenServicio() {
  const { planSlug, versionSlug } = useParams<{ planSlug: string; versionSlug?: string }>();
  const version = versionSlug?.replace(/^v/i, "");

  if (planSlug !== "concierge") return <NotFound />;

  const doc = getDoc("os-concierge", version);
  if (!doc) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{doc.title} — Closwork</title>
        <link
          rel="canonical"
          href={`/legal/orden-servicio/concierge/v${doc.version}`}
        />
      </Helmet>
      <LegalDocView doc={doc} />
    </>
  );
}

export function LegalOrdenServicioRedirect() {
  const doc = getDoc("os-concierge");
  if (!doc) return <NotFound />;
  return <Navigate to={`/legal/orden-servicio/concierge/v${doc.version}`} replace />;
}
