import { cn } from "@/lib/utils";

/**
 * Retratos que flotan en los márgenes laterales de la sección.
 * Solo se muestran desde xl, donde el contenido central deja hueco libre a los
 * lados: por debajo de ese ancho taparían los textos y las cifras.
 * Máximo 9, con tamaños y ritmos distintos para que no se lean como una grilla.
 */
const AVATARS = [
  { src: "/stock/closer-01.jpg", position: "left-[1.5%] top-[8%] h-24 w-24", delay: "0s", duration: "5.6s", opacity: "opacity-85" },
  { src: "/stock/closer-02.jpg", position: "left-[7%] top-[28%] h-12 w-12", delay: "1.1s", duration: "7.2s", opacity: "opacity-70" },
  { src: "/stock/closer-03.jpg", position: "left-[2.5%] top-[48%] h-[4.75rem] w-[4.75rem]", delay: "2.4s", duration: "6.1s", opacity: "opacity-80" },
  { src: "/stock/closer-07.jpg", position: "left-[8%] bottom-[18%] h-14 w-14", delay: "3.5s", duration: "8s", opacity: "opacity-65" },
  { src: "/stock/closer-05.jpg", position: "left-[3%] bottom-[6%] h-20 w-20", delay: "0.6s", duration: "5.2s", opacity: "opacity-75" },
  { src: "/stock/closer-04.jpg", position: "right-[2%] top-[10%] h-16 w-16", delay: "1.8s", duration: "6.8s", opacity: "opacity-80" },
  { src: "/stock/closer-08.jpg", position: "right-[7.5%] top-[34%] h-[5.5rem] w-[5.5rem]", delay: "0.3s", duration: "7.5s", opacity: "opacity-85" },
  { src: "/stock/closer-06.jpg", position: "right-[1.5%] top-[58%] h-12 w-12", delay: "2.9s", duration: "5.9s", opacity: "opacity-70" },
  { src: "/stock/closer-09.jpg", position: "right-[6%] bottom-[8%] h-[4.25rem] w-[4.25rem]", delay: "4.1s", duration: "6.4s", opacity: "opacity-75" },
];

export function FloatingAvatars({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 hidden xl:block", className)}>
      {AVATARS.map((avatar) => (
        <span
          key={avatar.src}
          style={{ animationDelay: avatar.delay, animationDuration: avatar.duration }}
          className={cn(
            "absolute animate-float overflow-hidden rounded-full ring-4 ring-white/70 shadow-[0_18px_36px_-16px_rgba(0,54,107,0.45)]",
            avatar.position,
            avatar.opacity
          )}
        >
          <img src={avatar.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </span>
      ))}
    </div>
  );
}

export default FloatingAvatars;
