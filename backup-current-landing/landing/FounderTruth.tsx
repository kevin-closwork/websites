import founderImg from "@/assets/founder.jpg";

const FounderTruth = () => (
  <section className="container py-16">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <img src={founderImg} alt="Founder de Closwork comprometido con el futuro de las ventas B2B" className="w-full h-auto rounded-xl border border-border shadow-glow" loading="lazy" />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">The Founder's Truth</h3>
        <p className="text-lg leading-relaxed">
          "Perdí $200K USD en equipos de ventas que no vendían. Vi morir 3 startups brillantes por no poder escalar ventas. Closwork es mi venganza contra el status quo. No es otra plataforma de freelancers - es el fin de las ventas B2B como las conoces."
        </p>
      </div>
    </div>
  </section>
);

export default FounderTruth;
