import Image from "next/image";

type Props = {
  footer: { tagline: string; contactEmail: string };
  site: { name: string; fullName: string };
};

export function SiteFooter({ footer, site }: Props) {
  return (
    <footer className="bg-slate-deep text-cream/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/tuucan-bird.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-md bg-cream/95 p-0.5"
          />
          <div>
            <p className="text-lg font-extrabold tracking-tight text-cream">
              {site.name}
            </p>
            <p className="text-sm text-cream/70">{footer.tagline}</p>
          </div>
        </div>

        <div className="text-sm sm:text-right">
          <a
            href={`mailto:${footer.contactEmail}`}
            className="font-medium text-orange transition-colors hover:text-cream"
          >
            {footer.contactEmail}
          </a>
          <p className="mt-1 text-cream/60">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
