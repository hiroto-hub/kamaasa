"use client";

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {LanguagePill} from "./site-header";

type ProductHotspot = {
  id: string;
  name: {ja: string; en: string};
  href: string;
};

const productHotspots: ProductHotspot[] = [
  {id: "knife", name: {ja: "amane 三徳 175mm", en: "amane Santoku 175mm"}, href: "/products/amane"},
  {id: "board", name: {ja: "包丁にやさしいまな板 黒", en: "Knife-friendly Cutting Board"}, href: "/products/knife-friendly-black-cutting-board"},
  {id: "frying-pan", name: {ja: "釜浅の鉄打出しフライパン", en: "Hammered Iron Frying Pan"}, href: "/products/hammered-iron-frying-pan-26cm"},
  {id: "wok", name: {ja: "打出し中華鍋 1.6mm厚", en: "Hammered Carbon Steel Wok"}, href: "/products/yamada-hammered-carbon-steel-wok"},
  {id: "tamagoyaki-pan", name: {ja: "真鍮取手玉子焼器 関西型", en: "Brass-handle Tamagoyaki Pan"}, href: "/products/brass-handle-copper-egg-roll-pan"},
  {id: "rice-pot", name: {ja: "釜浅のごはん釜", en: "KAMA-ASA Rice Pot"}, href: "/products/cast-iron-rice-cooking-pot"}
];

export function FeaturedProductsHome({locale}: {locale: string}) {
  const language = locale === "ja" ? "ja" : "en";

  return (
    <main className="tool-tabletop" lang={language}>
      <Image
        src="/images/kamaasa/generated/v3/all-tools-tabletop-mobile-safe-v2.png"
        alt=""
        fill
        priority
        sizes="(max-width: 639px) 100vw, 640px"
        className="tool-tabletop__image"
      />

      <div className="tool-tabletop__brand tool-tabletop__reveal tool-tabletop__reveal--brand" aria-label="KAMA-ASA JAPAN">
        <span aria-hidden="true">⌂</span>
        <strong>KAMA-ASA</strong>
        <small>JAPAN</small>
      </div>

      <div className="tool-tabletop__language">
        <LanguagePill />
      </div>

      <div className="tool-tabletop__message">
        <p className="tool-tabletop__reveal tool-tabletop__reveal--1">TOOLS FOR EVERYDAY COOKING</p>
        <h1 className="tool-tabletop__reveal tool-tabletop__reveal--2">
          <span>{language === "ja" ? "気になる道具を選ぶ" : "Choose a tool"}</span>
        </h1>
      </div>

      <nav className="tool-tabletop__links" aria-label={language === "ja" ? "商品を選ぶ" : "Choose a product"}>
        {productHotspots.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            locale={locale}
            className={`tool-tabletop__hotspot tool-tabletop__hotspot--${product.id}`}
            aria-label={`${product.name[language]} — ${language === "ja" ? "商品詳細を見る" : "View product details"}`}
          />
        ))}
      </nav>

      <div className="tool-tabletop__labels" aria-hidden="true">
        {productHotspots.map((product) => (
          <span key={product.id} className={`tool-tabletop__label tool-tabletop__label--${product.id}`}>
            {product.name[language]}
          </span>
        ))}
      </div>

      <div className="tool-tabletop__hint tool-tabletop__reveal tool-tabletop__reveal--3">
        <i aria-hidden="true" />
        <span>{language === "ja" ? "道具をタップして見る" : "TAP A TOOL TO DISCOVER"}</span>
      </div>
    </main>
  );
}
