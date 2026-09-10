import type { Metadata } from "next";
import Link from "next/link";
import menus from "@/content/menus.json";

export const metadata: Metadata = {
  title: "Summit Meal Menus — TUUCAN",
  description:
    "Meal menus for the Tennessee Solidarity Summit, September 18–20, 2026. All meals served buffet style.",
};

export default function MenusPage() {
  const { heading, intro, meals } = menus;

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-gradient-to-b from-cream to-sand">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
            TN Solidarity Summit 2026
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] text-slate sm:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            {intro}
          </p>
          <div className="mt-6">
            <Link
              href="/summit"
              className="text-sm font-medium text-orange hover:underline"
            >
              ← Back to Summit page
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Menus ---------------- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <div className="space-y-16">
            {meals.map((meal) => (
              <div key={meal.id} id={meal.id} className="scroll-mt-20">
                {/* Meal header */}
                <div className="border-b-2 border-orange pb-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-2xl font-bold text-slate sm:text-3xl">
                      {meal.title}
                    </h2>
                    <span className="rounded-full bg-orange/10 px-3 py-1 text-sm font-semibold text-orange">
                      {meal.day}
                    </span>
                  </div>
                  {meal.restaurant && (
                    <p className="mt-2 text-base font-semibold text-slate/80">
                      {meal.restaurant}
                    </p>
                  )}
                  {meal.restaurantNote && (
                    <p className="mt-1 text-sm italic text-slate/60">
                      {meal.restaurantNote}
                    </p>
                  )}
                </div>

                {/* Menu items */}
                {meal.items.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {meal.items.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-sand-deep bg-sand/40 p-4"
                      >
                        {"category" in item && item.category ? (
                          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-flame">
                            {item.category}
                          </p>
                        ) : null}
                        <p className="font-semibold text-slate">{item.name}</p>
                        {"description" in item && item.description ? (
                          <p className="mt-1 text-sm leading-6 text-ink/70">
                            {item.description}
                          </p>
                        ) : null}
                        {"allergyNote" in item && item.allergyNote ? (
                          <p className="mt-2 rounded-md bg-orange/10 px-3 py-1.5 text-xs font-medium text-orange-dark">
                            ⚠ {item.allergyNote}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 text-sm italic text-slate/50">
                    Menu coming soon.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/summit"
              className="inline-block rounded-full border border-slate/20 px-6 py-2.5 text-sm font-medium text-slate transition-colors hover:bg-sand"
            >
              ← Back to Summit page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
