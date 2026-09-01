"use client";

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {LanguagePill} from "./site-header";

type FeaturedProduct = {
  number: string;
  category: {ja: string; en: string};
  name: {ja: string; en: string};
  image: string;
  imageClassName?: string;
  href?: string;
  className: string;
};

const products: FeaturedProduct[] = [
  {
    number: "01",
    category: {ja: "包丁", en: "KNIVES"},
    name: {ja: "amane", en: "amane"},
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    imageClassName: "object-contain object-center p-7",
    href: "/products/amane",
    className: "featured-product--hero"
  },
  {
    number: "02",
    category: {ja: "まな板", en: "CUTTING BOARDS"},
    name: {ja: "包丁にやさしいまな板 黒", en: "Knife-friendly Cutting Board Black"},
    image: "/images/kamaasa/featured/cutting-board-black.jpg",
    imageClassName: "object-cover object-center",
    className: "featured-product--board"
  },
  {
    number: "03",
    category: {ja: "フライパン", en: "FRYING PANS"},
    name: {ja: "釜浅の鉄打出しフライパン", en: "KAMA-ASA Hammered Iron Frying Pan"},
    image: "/images/kamaasa/featured/frying-pan-product.jpg",
    imageClassName: "object-cover object-center",
    className: "featured-product--pan"
  },
  {
    number: "04",
    category: {ja: "中華鍋", en: "WOKS"},
    name: {ja: "北京鍋", en: "Peking Wok"},
    image: "/images/kamaasa/featured/peking-wok.jpg",
    imageClassName: "object-cover object-top",
    className: "featured-product--wok"
  },
  {
    number: "05",
    category: {ja: "玉子焼器", en: "TAMAGOYAKI PANS"},
    name: {ja: "真鍮取手玉子焼器", en: "Brass-handle Tamagoyaki Pan"},
    image: "/images/kamaasa/featured/tamagoyaki-pan.jpeg",
    imageClassName: "object-cover object-center",
    className: "featured-product--egg"
  },
  {
    number: "06",
    category: {ja: "ごはん釜", en: "RICE COOKERS"},
    name: {ja: "釜浅のごはん釜", en: "KAMA-ASA Rice Pot"},
    image: "/images/kamaasa/featured/rice-pot.jpg",
    imageClassName: "object-cover object-center",
    className: "featured-product--rice"
  }
];

export function FeaturedProductsHome({locale}: {locale: string}) {
  const language = locale === "ja" ? "ja" : "en";

  return (
    <section className="featured-showcase min-h-svh text-[#f4f0e8]">
      <header className="featured-showcase__header">
        <div>
          <p className="featured-showcase__kicker">KAMA-ASA / SELECTED TOOLS</p>
          <h1>{language === "ja" ? "選ばれた道具、その背景へ。" : "Tools with a story to tell."}</h1>
        </div>
        <div className="featured-showcase__language">
          <LanguagePill />
        </div>
      </header>

      <div className="featured-showcase__grid">
        {products.map((product) => {
          const content = (
            <>
              <div className="featured-product__image">
                <Image
                  src={product.image}
                  alt={product.name[language]}
                  fill
                  priority={product.number === "01"}
                  sizes={product.number === "01" ? "(max-width: 639px) 100vw, 420px" : "210px"}
                  className={product.imageClassName ?? "object-cover"}
                />
              </div>
              <div className="featured-product__label">
                <span className="featured-product__number">{product.number}</span>
                <span>
                  <small>{product.category[language]}</small>
                  <strong>{product.name[language]}</strong>
                </span>
                <span aria-hidden="true" className="featured-product__arrow">↗</span>
              </div>
            </>
          );

          return product.href ? (
            <Link
              key={product.number}
              href={product.href}
              locale={locale}
              className={`featured-product ${product.className}`}
            >
              {content}
            </Link>
          ) : (
            <article key={product.number} className={`featured-product ${product.className}`}>
              {content}
            </article>
          );
        })}
      </div>

      <footer className="featured-showcase__footer">
        <span>{language === "ja" ? "道具を選んで、物語を読む" : "Choose a tool and discover its story"}</span>
        <span aria-hidden="true">SCROLL ↓</span>
      </footer>
    </section>
  );
}
