const Bubble = ({ name, text, side = "left" }: { name: string; text: string; side?: "left" | "right" }) => (
  <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${side === "right" ? "bg-brand/20 border border-brand/30" : "bg-secondary/60 border border-border"}`}>
      <div className="text-xs text-muted-foreground mb-1">{name}</div>
      <p className="leading-relaxed">{text}</p>
    </div>
  </div>
);

const WhatsAppTestimonials = () => (
  <section className="container py-16">
    <h3 className="text-xl font-semibold mb-6">Lo que dicen en WhatsApp</h3>
    <div className="grid gap-3">
      <Bubble name="CEO_Fintech" text="wey, cerré 3 deals en mi primera semana" />
      <Bubble name="Founder_SaaS" text="literal solo apreté un botón y empezaron las demos" side="right" />
      <Bubble name="VP_Sales" text="mi equipo interno está celoso del performance de los closers 😅" />
    </div>
  </section>
);

export default WhatsAppTestimonials;
