type Props = {
  announcement: {
    show: boolean;
    text: string;
    linkLabel: string;
    linkHref: string;
  };
};

export function AnnouncementBar({ announcement }: Props) {
  if (!announcement?.show) return null;
  return (
    <a
      href={announcement.linkHref}
      className="block bg-flame text-cream transition-colors hover:bg-orange-dark"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-5 py-2.5 text-center text-sm font-medium">
        <span>{announcement.text}</span>
        <span className="font-semibold underline underline-offset-2">
          {announcement.linkLabel} ↓
        </span>
      </div>
    </a>
  );
}
