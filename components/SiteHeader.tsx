import Image from "next/image";

type Props = {
  site: { name: string; fullName: string; contactEmail: string };
};

const NAV = [
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Event Photos", href: "/photos" },
  { label: "Get Involved", href: "/#get-involved" },
];

export function SiteHeader({ site }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-deep/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image
            src="/tuucan-bird.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-md"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate/80 transition-colors hover:text-flame"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${site.contactEmail}`}
          className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark"
        >
          Get Involved
        </a>
      </div>
    </header>
  );
}
