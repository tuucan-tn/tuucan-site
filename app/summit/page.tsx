import type { Metadata } from "next";
import summit from "@/content/summit.json";
import home from "@/content/home.json";

export const metadata: Metadata = {
  title: "TN Solidarity Summit 2026 — TUUCAN",
  description:
    "Everything you need to know about the Tennessee Solidarity Summit, September 18–20, 2026, at Neshoba Unitarian Universalist Church in Cordova (Memphis), TN.",
};

export default function SummitPage() {
  const { heading, intro, registerUrl, registerLabel, faq } = summit;

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-gradient-to-b from-cream to-sand">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-flame">
            {home.site.name}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] text-slate sm:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            {intro}
          </p>
          <div className="mt-8">
            <a
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark"
            >
              {registerLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold text-slate sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate/60 text-sm">
            Have a question not listed here? Email{" "}
            <a
              href={`mailto:${home.site.contactEmail}`}
              className="text-orange hover:underline"
            >
              {home.site.contactEmail}
            </a>
          </p>

          <dl className="mt-10 space-y-8">
            {faq.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-sand-deep bg-sand/50 p-6 md:p-8"
              >
                <dt className="text-lg font-semibold text-slate">
                  {item.question}
                </dt>
                <dd className="mt-3 leading-7 text-ink/80 whitespace-pre-line">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>

          {faq.length === 0 && (
            <p className="mt-10 text-center text-ink/60">
              FAQ coming soon — check back closer to the event.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
