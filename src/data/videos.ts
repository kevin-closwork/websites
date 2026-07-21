export type VideoProvider = "wistia" | "vimeo";

export type VideoTier = "featured" | "platform" | "closer-testimonial" | "company-testimonial";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  provider: VideoProvider;
  mediaId: string;
  tier: VideoTier;
  /** Lower number = shown first within its tier */
  order: number;
  durationLabel?: string;
  aspect?: number;
  thumbnail?: string;
}

/** Main & platform videos — highest visibility on the landing */
export const primaryVideos: VideoItem[] = [
  {
    id: "testimonio-yamel",
    title: "Testimonio Yamel",
    description:
      "Experiencia real de una closer en el programa: de la entrevista al primer cierre, con acompañamiento y vacantes filtradas.",
    provider: "wistia" as const,
    mediaId: "wpdtadch0z",
    tier: "featured" as const,
    order: 1,
    durationLabel: "4:25",
    aspect: 1.7777777777777777,
    thumbnail: "https://fast.wistia.com/embed/medias/wpdtadch0z/swatch",
  },
  {
    id: "como-funciona-closwork",
    title: "¿Cómo funciona Closwork?",
    description:
      "Descubre en pocos minutos cómo desplegar tu fuerza de ventas bajo comisión y conectar con closers verificados en LATAM.",
    provider: "vimeo" as const,
    mediaId: "1141958981",
    tier: "platform" as const,
    order: 2,
    durationLabel: "2:30",
    aspect: 1.7777777777777777,
  },
].sort((a, b) => a.order - b.order);

/** Closer testimonials — secondary video row (add new IDs here as they are published) */
export const closerTestimonialVideos: VideoItem[] = [];

export interface TextTestimonial {
  name: string;
  company: string;
  role: string;
  content: string;
}

/** Company text testimonials — lowest visual priority */
export const companyTextTestimonials: TextTestimonial[] = [
  {
    name: "María González",
    company: "TechStart México",
    role: "CEO",
    content:
      "Closwork nos ayudó a escalar nuestras ventas un 300% en solo 3 meses. Los closers que encontramos son realmente profesionales y conocen el mercado LATAM.",
  },
  {
    name: "Ana Torres",
    company: "EcommSolutions",
    role: "Directora de Ventas",
    content:
      "La plataforma nos conectó con el socio comercial perfecto para nuestro nicho. Sin riesgos fijos y con resultados desde el primer mes.",
  },
];
