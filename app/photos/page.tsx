import type { Metadata } from "next";
import Image from "next/image";
import photos from "@/content/photos.json";

export const metadata: Metadata = {
  title: "Event Photos",
  description:
    "Photos from TUUCAN gatherings, trainings, and the annual Fall Flock across Tennessee.",
};

export default function PhotosPage() {
  const { heading, intro, photos: items } = photos;

  return (
    <div>
      {/* ---------------- Heading ---------------- */}
      <section className="bg-gradient-to-b from-cream to-sand">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
            TUUCAN
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] text-slate sm:text-5xl">
            {heading}
          </h1>
          {intro && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/80">
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          {items.length === 0 ? (
            <p className="text-center text-lg text-ink/70">
              Photos coming soon.
            </p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2">
              {items.map((photo, i) => (
                <li
                  key={`${photo.image}-${i}`}
                  className="overflow-hidden rounded-2xl border border-sand-deep bg-sand/60 shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-sand-deep/40">
                    <Image
                      src={photo.image}
                      alt={photo.caption}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  {photo.caption && (
                    <p className="px-5 py-4 text-sm leading-6 text-slate/80">
                      {photo.caption}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
