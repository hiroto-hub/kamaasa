import type {Metadata} from "next";
import {headers} from "next/headers";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {RichProductStory} from "@/components/rich-product-story";
import {routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale, slug: "amane-santoku"}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  if (slug !== "amane-santoku") return {};

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:3011";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("127.0.0.1") ? "http" : "https");
  const title = "amane Santoku 175mm | KAMA-ASA Story Guide";
  const description = locale === "ja"
    ? "釜浅商店オリジナルのamane三徳。Overview、7つの特徴、仕様、手入れまでを紹介します。"
    : "Explore KAMA-ASA's amane Santoku: its overview, seven key features, specifications and care.";
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

  if (slug !== "amane-santoku") notFound();

  return (
    <main className="min-h-svh bg-[#f7f7f5]">
      <RichProductStory locale={locale} />
    </main>
  );
}
