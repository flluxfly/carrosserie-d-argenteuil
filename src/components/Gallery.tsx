import { Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type MediaItem = {
  type: "image" | "video";
  src: string;
  thumb?: string;
  poster?: string;
  width?: number | null;
  height?: number | null;
  alt?: string;
};

type GalleryProps = {
  manifestUrl?: string;
};

const Gallery = ({ manifestUrl = "/photos/manifest.json" }: GalleryProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  useEffect(() => {
    fetch(manifestUrl)
      .then((r) => r.json())
      .then((data: MediaItem[]) => {
        const filtered = data.filter(
          (m) =>
            (m.type === "image" && !/\.heic$/i.test(m.src)) ||
            m.type === "video"
        );
        setItems(filtered);
      })
      .catch(() => setItems([]));
  }, [manifestUrl]);

  const images = useMemo(
    () => items.filter((m) => m.type === "image"),
    [items]
  );
  const videos = useMemo(
    () => items.filter((m) => m.type === "video"),
    [items]
  );
  const gridItems = useMemo(
    () => (activeTab === "photos" ? images : videos),
    [activeTab, images, videos]
  );

  const openAt = (idx: number) => {
    setCurrentIndex(idx);
    setOpen(true);
  };

  if (!items.length) {
    return (
      <div className="text-center text-muted-foreground">
        Aucun média pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Onglets Photos / Vidéos */}
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-full bg-muted p-1">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "photos"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "videos"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Vidéos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gridItems.map((m, idx) => (
          <button
            key={m.src}
            className="relative aspect-square w-full overflow-hidden rounded-md focus:outline-none"
            onClick={() => openAt(idx)}
            aria-label="Ouvrir en plein écran"
          >
            {m.type === "image" ? (
              <img
                src={m.thumb || m.src}
                alt={m.alt || "Photo"}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <VideoPreview src={m.src} poster={m.thumb || m.poster} />
            )}
            {m.type === "video" && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/60 p-2">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        plugins={[Thumbnails, Zoom, Video]}
        slides={gridItems.map((m) =>
          m.type === "image"
            ? {
                type: "image",
                src: m.src,
                alt: m.alt,
                width: m.width || undefined,
                height: m.height || undefined,
              }
            : {
                type: "video",
                sources: [
                  ...(m.light ? [{ src: (m as any).light }] : []),
                  { src: m.src },
                ],
                poster: m.poster,
                muted: true,
              }
        )}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
};

export default Gallery;

function useInView<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsInView(true);
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isInView } as const;
}

function VideoPreview({ src, poster }: { src: string; poster?: string }) {
  const { ref, isInView } = useInView<HTMLVideoElement>();
  const hasRealPoster = poster && !/placeholder\.svg$/i.test(poster);

  // Si on a une vraie vignette, afficher simplement l'image
  if (hasRealPoster) {
    return (
      <img
        src={poster}
        alt="Vignette vidéo"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  // Fallback visuel propre quand aucune vignette n'est dispo
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
      {/* Charger la vidéo hors écran uniquement pour Lightbox via isInView si nécessaire */}
      <video
        ref={ref}
        className="hidden"
        muted
        playsInline
        preload="metadata"
        src={isInView ? src : undefined}
      />
      <Play className="h-10 w-10 text-white/90" />
    </div>
  );
}
