import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const loadedScripts = new Set<string>();
let playerScriptPromise: Promise<void> | null = null;

function loadScript(src: string, type?: string): Promise<void> {
  if (loadedScripts.has(src)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      loadedScripts.add(src);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    if (type) script.type = type;
    script.onload = () => {
      loadedScripts.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

function ensureWistiaPlayer(): Promise<void> {
  if (!playerScriptPromise) {
    playerScriptPromise = loadScript("https://fast.wistia.com/player.js");
  }
  return playerScriptPromise;
}

function ensureWistiaEmbed(mediaId: string): Promise<void> {
  return ensureWistiaPlayer().then(() =>
    loadScript(`https://fast.wistia.com/embed/${mediaId}.js`, "module")
  );
}

interface WistiaPlayerProps {
  mediaId: string;
  aspect?: number;
  className?: string;
  title?: string;
}

const WistiaPlayer = ({
  mediaId,
  aspect = 1.7777777777777777,
  className,
  title,
}: WistiaPlayerProps) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    ensureWistiaEmbed(mediaId).catch(() => {});
  }, [mediaId]);

  useEffect(() => {
    const styleId = `wistia-placeholder-${mediaId}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      wistia-player[media-id='${mediaId}']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
        display: block;
        filter: blur(5px);
        padding-top: ${(1 / aspect) * 100}%;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      styleRef.current?.remove();
      styleRef.current = null;
    };
  }, [mediaId, aspect]);

  return (
    <div className={cn("wistia-player-wrapper overflow-hidden rounded-2xl bg-slate-900 shadow-xl", className)}>
      <wistia-player
        media-id={mediaId}
        aspect={String(aspect)}
        aria-label={title}
      />
    </div>
  );
};

export default WistiaPlayer;
