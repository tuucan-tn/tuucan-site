import Image from "next/image";
import home from "@/content/home.json";

export default function Home() {
  const { hero, values, about, stats, work, getInvolved, event } = home;

  return (
    <div id="top">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-slate sm:text-5xl lg:text-6xl">
              {hero.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/80">
              {hero.subheading}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${hero.ctaEmail}`}
                className="rounded-full bg-orange px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark"
              >
                {hero.ctaLabel}
              </a>
              <a
                href="#who-we-are"
                className="rounded-full px-5 py-3 text-base font-semibold text-slate underline-offset-4 hover:underline"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/tuucan-mark.png"
              alt="The TUUCAN toucan and flaming chalice over the state of Tennessee"
              width={1000}
              height={1000}
              priority
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Values strip ---------------- */}
      <section className="border-y border-sand-deep bg-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6">
          {values.map((v) => (
            <span
              key={v}
              className="text-sm font-semibold uppercase tracking-wide text-slate/75"
            >
              {v}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- Upcoming Event ---------------- */}
      {event?.show && (
        <section id="event" className="scroll-mt-20 bg-sand-deep/30">
          <div className="mx-auto max-w-4xl px-5 py-16 md:py-20">
            <div className="rounded-3xl border border-orange/40 bg-cream p-8 text-center shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
                {event.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate sm:text-4xl">
                {event.title}
              </h2>
              <p className="mt-3 text-base font-semibold text-orange-dark">
                {event.date} · {event.location}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/80">
                {event.body}
              </p>
              <div className="mt-7">
                <a
                  href={event.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark"
                >
                  {event.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Who We Are ---------------- */}
      <section id="who-we-are" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate sm:text-4xl">
                {about.heading}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-8 text-ink/80">
                {about.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-sand-deep bg-sand/60 p-6"
                >
                  <dt className="text-3xl font-black text-orange">{s.value}</dt>
                  <dd className="mt-1 text-sm font-medium text-slate/80">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- What We Do ---------------- */}
      <section id="what-we-do" className="scroll-mt-20 bg-slate-deep text-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">{work.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {work.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07]"
              >
                <h3 className="text-xl font-semibold text-orange">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-cream/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Get Involved ---------------- */}
      <section
        id="get-involved"
        className="scroll-mt-20 bg-gradient-to-b from-sand to-cream"
      >
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold text-slate sm:text-4xl">
            {getInvolved.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            {getInvolved.body}
          </p>
          <div className="mt-8">
            <a
              href={`mailto:${getInvolved.ctaEmail}`}
              className="inline-block rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark"
            >
              {getInvolved.ctaLabel}
            </a>
          </div>
          <p className="mt-6 text-sm text-slate/70">{getInvolved.note}</p>
        </div>
      </section>
    </div>
  );
}
