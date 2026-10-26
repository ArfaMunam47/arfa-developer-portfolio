"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the curved row ──────────────────────────────────────────────
 * Scroll Tilted Grid turned on its side, with the tilt drawn as a curve.
 * One row of images streams from right to left around the inside of a
 * cylinder. The centre faces you flat, the ends bend toward you so each
 * end image curves along its length, and the ends fade into the page.
 *
 * A CSS box can't bend, so every tile is cut into SLICES vertical strips,
 * each a flat facet of the cylinder showing its share of the image. The
 * strips sit still inside their tile, each turned its own few degrees
 * to match the cylinder radius, forming a continuous curved surface.
 * ────────────────────────────────────────────────────────────────── */

export interface TiltedGridItem {
  id: string | number;
  image: string;
  title?: string;
  subtitle?: string;
  href?: string;
  accent?: string;
}

export interface TiltedGridHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TiltedGridItem[];
  slices?: number;
  tileWidth?: number;
  tileHeight?: number;
  radius?: number;
  tiltAngle?: number;
  speed?: number; // seconds per full loop
  interactive?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: TiltedGridItem[] = [
  { id: "prism", image: "/Prism.jpeg", title: "Prism" },
  { id: "studypilot", image: "/studypilot.png", title: "StudyPilot AI" },
  { id: "velora", image: "/veloraa.png", title: "Velora Store" },
  { id: "kumo", image: "/kumo.png", title: "Kumo Ramen" },
  { id: "pastel", image: "/pastel.png", title: "Pastel Form" },
];

export function TiltedGridHero({
  items = DEFAULT_ITEMS,
  slices = 12,
  tileWidth = 360,
  tileHeight = 240,
  radius = 1200,
  tiltAngle = 12,
  speed = 28,
  interactive = true,
  className,
  ...props
}: TiltedGridHeroProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const currentDrag = React.useRef(0);

  // Repeat items to guarantee an uninterrupted endless streaming ribbon
  const duplicatedItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    return [...items, ...items, ...items];
  }, [items]);

  const sliceWidthPercent = 100 / slices;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    startX.current = e.clientX;
    currentDrag.current = dragOffset;
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setDragOffset(currentDrag.current + delta * 0.4);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none py-10",
        "flex flex-col items-center justify-center",
        className
      )}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => interactive && setIsPaused(true)}
      onMouseLeave={() => interactive && !isDragging.current && setIsPaused(false)}
      {...props}
    >
      {/* Curved Edge Ambient Vignette Fade Masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-56 z-20"
        style={{
          background:
            "linear-gradient(to right, var(--tilted-bg, #FAF8F5) 0%, rgba(250,248,245,0.7) 40%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-56 z-20"
        style={{
          background:
            "linear-gradient(to left, var(--tilted-bg, #FAF8F5) 0%, rgba(250,248,245,0.7) 40%, transparent 100%)",
        }}
      />

      {/* 3D Curved Cylindrical Track */}
      <div
        className="relative flex items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltAngle}deg) translateX(${dragOffset}px)`,
          transition: isDragging.current ? "none" : "transform 0.4s ease-out",
        }}
      >
        <div
          className="flex gap-6 items-center"
          style={{
            transformStyle: "preserve-3d",
            animation: `cylinderStream ${speed}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedItems.map((item, tileIdx) => (
            <div
              key={`${item.id}-${tileIdx}`}
              className="relative shrink-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-xl group transition-all duration-300"
              style={{
                width: `${tileWidth}px`,
                height: `${tileHeight}px`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Sliced Facets along Cylinder Curve */}
              <div
                className="absolute inset-0 flex w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {Array.from({ length: slices }).map((_, sliceIdx) => {
                  const sliceCenter = (sliceIdx + 0.5) / slices; // 0 to 1
                  const normalizedArc = (sliceCenter - 0.5) * 2; // -1 to +1
                  const facetAngle = normalizedArc * 14; // Degrees of bend across single tile
                  const facetZ = Math.cos((facetAngle * Math.PI) / 180) * 18 - 18;

                  return (
                    <div
                      key={sliceIdx}
                      className="relative h-full overflow-hidden"
                      style={{
                        width: `${sliceWidthPercent}%`,
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${facetAngle}deg) translateZ(${facetZ}px)`,
                      }}
                    >
                      <div
                        className="absolute top-0 bottom-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          left: `-${sliceIdx * 100}%`,
                          width: `${slices * 100}%`,
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Subtle lighting facet depth reflection */}
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
                        style={{
                          background: `linear-gradient(90deg, rgba(255,255,255,${
                            Math.abs(normalizedArc) * 0.4
                          }), rgba(0,0,0,${Math.abs(normalizedArc) * 0.2}))`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Polished Glass Border & Hover Sheen */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 dark:ring-white/15 pointer-events-none transition-all duration-300 group-hover:ring-orange-500/50 group-hover:shadow-[0_0_24px_rgba(250,85,56,0.3)]" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cylinderStream {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default TiltedGridHero;
