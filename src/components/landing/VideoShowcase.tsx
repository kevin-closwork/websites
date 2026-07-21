import { useState } from "react";
import { Play, Building2, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ScrollReveal";
import WistiaPlayer from "@/components/video/WistiaPlayer";
import VimeoPlayer from "@/components/video/VimeoPlayer";
import {
  primaryVideos,
  closerTestimonialVideos,
  companyTextTestimonials,
  type VideoItem,
} from "@/data/videos";
import { cn } from "@/lib/utils";

function VideoPlayer({ video, className }: { video: VideoItem; className?: string }) {
  if (video.provider === "wistia") {
    return (
      <WistiaPlayer
        mediaId={video.mediaId}
        aspect={video.aspect}
        title={video.title}
        className={className}
      />
    );
  }

  return (
    <VimeoPlayer
      mediaId={video.mediaId}
      aspect={video.aspect}
      title={video.title}
      className={className}
    />
  );
}

function VideoPlaylistItem({
  video,
  isActive,
  onSelect,
}: {
  video: VideoItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full gap-3 rounded-xl border p-3 text-left transition-all duration-200",
        isActive
          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20"
          : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
      )}
    >
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-800">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a5ca0] to-[#5dc88c]">
            <Play className="h-6 w-6 text-white/90" fill="currentColor" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-5 w-5 text-white" fill="currentColor" />
        </div>
        {video.durationLabel && (
          <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {video.durationLabel}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className={cn("text-sm font-semibold leading-snug", isActive ? "text-primary" : "text-foreground")}>
          {video.title}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{video.description}</p>
      </div>
    </button>
  );
}

const VideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(primaryVideos[0]);

  return (
    <section id="testimonios" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <ScrollReveal variant="fade-up">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Videos
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4">
            Conoce Closwork en acción
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4 max-w-2xl mx-auto">
            Historias reales, cómo funciona la plataforma y resultados de empresas y closers en LATAM
          </p>
        </div>
      </ScrollReveal>

      {/* Featured + playlist */}
      <ScrollReveal variant="fade-up" delay={1}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-3 flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Videos principales
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
            <div className="space-y-4">
              <VideoPlayer key={activeVideo.id} video={activeVideo} />
              <div className="px-1">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">{activeVideo.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{activeVideo.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:max-h-[420px] lg:overflow-y-auto lg:pr-1">
              {primaryVideos.map((video) => (
                <VideoPlaylistItem
                  key={video.id}
                  video={video}
                  isActive={activeVideo.id === video.id}
                  onSelect={() => setActiveVideo(video)}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Closer testimonial videos — secondary row */}
      {closerTestimonialVideos.length > 0 && (
        <ScrollReveal variant="fade-up" delay={2}>
          <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-border">
            <div className="mb-6 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Testimonios de closers
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {closerTestimonialVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="group rounded-xl border border-border bg-card overflow-hidden text-left transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="relative aspect-video bg-slate-800">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a5ca0]/80 to-[#5dc88c]/80">
                        <Play className="h-10 w-10 text-white/90" fill="currentColor" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-8 w-8 text-white" fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-sm text-foreground">{video.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Company text testimonials — compact, lower priority */}
      <ScrollReveal variant="fade-up" delay={3}>
        <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-border/60">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Lo que dicen las empresas
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyTextTestimonials.map((t, i) => (
              <Card key={i} className="border-border/60 bg-muted/30 shadow-none">
                <CardContent className="pt-5 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">&quot;{t.content}&quot;</p>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company} · {t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default VideoShowcase;
