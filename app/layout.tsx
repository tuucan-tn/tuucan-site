import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import home from "@/content/home.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "TUUCAN — Tennessee Unitarian Universalist Collective Action Network",
    template: "%s · TUUCAN",
  },
  description:
    "A statewide network of Unitarian Universalist congregations working together for justice across Tennessee.",
  metadataBase: new URL("https://tuucan.org"),
  openGraph: {
    title: "TUUCAN — Working Together for Justice Across Tennessee",
    description:
      "A statewide network of Unitarian Universalist congregations working together for justice across Tennessee.",
    url: "https://tuucan.org",
    siteName: "TUUCAN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SiteHeader site={home.site} />
        <main className="flex-1">{children}</main>
        <SiteFooter footer={home.footer} site={home.site} />
      </body>
    </html>
  );
}
