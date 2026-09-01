import type {Metadata} from "next";
import {headers} from "next/headers";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {RichProductStory} from "@/components/rich-product-story";
import {routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    {locale, slug: "amane"},
    {locale, slug: "amane-santoku"}
  ]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  if (slug !== "amane" && slug !== "amane-santoku") return {};

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:3011";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("127.0.0.1") ? "http" : "https");
  const title = "amane | KAMA-ASA Original Knife Series";
  const description = locale === "ja"
    ? "釜浅商店オリジナル洋包丁シリーズamane。その設計、関の手仕事、ラインナップ、手入れまでを紹介します。"
    : "Discover KAMA-ASA's original amane knife series: its design, Seki craftsmanship, line-up and care.";
  const image = `${protocol}://${host}/images/kamaasa/amane/amane-santoku.jpg`;

  return {
    title,
    description,
    openGraph: {title, description, images: [image]},
    twitter: {card: "summary_large_image", title, description, images: [image]}
  };
}

export default async function ProductStoryPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  if (slug !== "amane" && slug !== "amane-santoku") notFound();

  return (
    <main className="min-h-svh bg-[#f7f7f5]">
      <RichProductStory locale={locale} />
    </main>
  );
}
