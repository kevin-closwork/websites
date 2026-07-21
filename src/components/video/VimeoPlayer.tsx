import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface VimeoPlayerProps {
  mediaId: string;
  aspect?: number;
  className?: string;
  title?: string;
}

const VimeoPlayer = ({
  mediaId,
  aspect = 0.5625,
  className,
  title,
}: VimeoPlayerProps) => {
  useEffect(() => {
    if (document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) return;

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className={cn("overflow-hidden rounded-2xl bg-slate-900 shadow-xl", className)}
      style={{ paddingTop: `${aspect * 100}%`, position: "relative" }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${mediaId}?badge=0&autopause=0&controls=1&title=0&byline=0&portrait=0`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title ?? "Video"}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default VimeoPlayer;
