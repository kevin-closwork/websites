import { cn } from "@/lib/utils";

/**
 * Retratos que flotan en los márgenes laterales de la sección.
 * Solo se muestran desde xl, donde el contenido central deja hueco libre a los
 * lados: por debajo de ese ancho taparían los textos y las cifras.
 */
const AVATARS = [
  { src: "/stock/closer-01.jpg", position: "left-[2%] top-[12%] h-20 w-20", delay: "0s" },
  { src: "/stock/closer-02.jpg", position: "left-[6%] top-[42%] h-16 w-16", delay: "1.4s" },
  { src: "/stock/closer-03.jpg", position: "left-[3%] bottom-[14%] h-[4.5rem] w-[4.5rem]", delay: "2.6s" },
  { src: "/stock/closer-04.jpg", position: "right-[2%] top-[16%] h-[4.5rem] w-[4.5rem]", delay: "0.8s" },
  { src: "/stock/closer-05.jpg", position: "right-[6%] top-[46%] h-16 w-16", delay: "2s" },
  { src: "/stock/closer-06.jpg", position: "right-[3%] bottom-[12%] h-20 w-20", delay: "3.2s" },
];

export function FloatingAvatars({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 hidden xl:block", className)}>
      {AVATARS.map((avatar) => (
        <span
          key={avatar.src}
          style={{ animationDelay: avatar.delay }}
          className={cn(
            "absolute animate-float overflow-hidden rounded-full opacity-80 ring-4 ring-white/70 shadow-[0_18px_36px_-16px_rgba(0,54,107,0.45)]",
            avatar.position
          )}
        >
          <img src={avatar.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </span>
      ))}
    </div>
  );
}

export default FloatingAvatars;
