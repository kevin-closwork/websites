import { Helmet } from "react-helmet-async";
import { LegalDocView } from "@/components/legal/LegalDocView";
import { getPrivacyDoc } from "@/lib/legal/registry";
import NotFound from "@/pages/NotFound";

const Privacidad = () => {
  const doc = getPrivacyDoc();
  if (!doc) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{doc.title} — Closwork</title>
        <meta
          name="description"
          content="Aviso de Privacidad Integral de Closwork conforme a la LFPDPPP."
        />
        <link rel="canonical" href="/privacidad" />
      </Helmet>
      <LegalDocView doc={doc} showVersionBadge />
    </>
  );
};

export default Privacidad;
