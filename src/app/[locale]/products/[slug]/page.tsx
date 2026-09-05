import type {Metadata} from "next";
import {headers} from "next/headers";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {RichProductStory} from "@/components/rich-product-story";
import {FeaturedProductStoryView} from "@/components/featured-product-story";
import {featuredProductStories, featuredProductStoryBySlug} from "@/data/featured-product-stories";
import {routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    {locale, slug: "amane"},
    {locale, slug: "amane-santoku"},
    ...featuredProductStories.map((story) => ({locale, slug: story.slug}))
  ]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const isAmane = slug === "amane" || slug === "amane-santoku";
  const story = featuredProductStoryBySlug[slug];
  if (!isAmane && !story) return {};

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:3011";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("127.0.0.1") ? "http" : "https");
  const title = isAmane ? "amane Santoku 175mm | KAMA-ASA" : `${story.title[locale === "ja" ? "ja" : "en"]} | KAMA-ASA`;
  const description = isAmane
    ? (locale === "ja" ? "釜浅商店オリジナル洋包丁シリーズamane。その設計、関の手仕事、ラインナップ、手入れまでを紹介します。" : "Discover KAMA-ASA's original amane knife series: its design, Seki craftsmanship, line-up and care.")
    : story.description[locale === "ja" ? "ja" : "en"];
  const image = `${protocol}://${host}${isAmane ? "/images/kamaasa/generated/v1/amane-santoku.png" : story.image}`;

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

  const isAmane = slug === "amane" || slug === "amane-santoku";
  const story = featuredProductStoryBySlug[slug];
  if (!isAmane && !story) notFound();

  return (
    <main className="min-h-svh bg-[#f7f7f5]">
      {isAmane ? <RichProductStory locale={locale} /> : <FeaturedProductStoryView locale={locale} story={story} />}
    </main>
  );
}
