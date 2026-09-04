"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";
import {LanguagePill} from "./site-header";

type FeaturedProduct = {
  number: string;
  category: {ja: string; en: string};
  name: {ja: string; en: string};
  note: {ja: string; en: string};
  image: string;
  imageClassName?: string;
  href?: string;
  tone: "light" | "dark" | "warm";
};

const products: FeaturedProduct[] = [
  {
    number: "01",
    category: {ja: "包丁", en: "KNIVES"},
    name: {ja: "amane 三徳 175mm", en: "amane Santoku 175mm"},
    note: {ja: "釜浅オリジナル洋包丁シリーズ", en: "KAMA-ASA ORIGINAL KNIFE SERIES"},
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    imageClassName: "object-contain object-center p-10",
    href: "/products/amane",
    tone: "light"
  },
  {
    number: "02",
    category: {ja: "まな板", en: "CUTTING BOARDS"},
    name: {ja: "包丁にやさしいまな板 黒", en: "Knife-friendly Cutting Board Black"},
    note: {ja: "刃と手に、やさしい黒。", en: "A softer surface for every edge."},
    image: "/images/kamaasa/featured/cutting-board-black.jpg",
    imageClassName: "object-cover object-center",
    href: "/products/knife-friendly-black-cutting-board",
    tone: "dark"
  },
  {
    number: "03",
    category: {ja: "フライパン", en: "FRYING PANS"},
    name: {ja: "釜浅の鉄打出しフライパン", en: "KAMA-ASA Hammered Iron Frying Pan"},
    note: {ja: "火と鉄を、毎日の道具に。", en: "Iron and fire, shaped for every day."},
    image: "/images/kamaasa/featured/frying-pan-product.jpg",
    imageClassName: "object-cover object-center",
    href: "/products/hammered-iron-frying-pan-26cm",
    tone: "warm"
  },
  {
    number: "04",
    category: {ja: "中華鍋", en: "WOKS"},
    name: {ja: "北京鍋", en: "Peking Wok"},
    note: {ja: "振る、煽る。軽やかな鉄。", en: "Responsive iron for motion and flame."},
    image: "/images/kamaasa/featured/peking-wok-cropped.png",
    imageClassName: "object-contain object-center",
    href: "/products/yamada-hammered-carbon-steel-wok",
    tone: "light"
  },
  {
    number: "05",
    category: {ja: "玉子焼器", en: "TAMAGOYAKI PANS"},
    name: {ja: "真鍮取手玉子焼器", en: "Brass-handle Tamagoyaki Pan"},
    note: {ja: "銅と真鍮、熱を操るかたち。", en: "Copper and brass, made to control heat."},
    image: "/images/kamaasa/featured/tamagoyaki-pan.jpeg",
    imageClassName: "object-cover object-center",
    href: "/products/brass-handle-copper-egg-roll-pan",
    tone: "warm"
  },
  {
    number: "06",
    category: {ja: "ごはん釜", en: "RICE COOKERS"},
    name: {ja: "釜浅のごはん釜", en: "KAMA-ASA Rice Pot"},
    note: {ja: "一膳のために、火を整える。", en: "Heat, balanced for a better bowl of rice."},
    image: "/images/kamaasa/featured/rice-pot.jpg",
    imageClassName: "featured-tool__image--rice object-contain object-center",
    href: "/products/cast-iron-rice-cooking-pot",
    tone: "dark"
  }
];

function FittedProductTitle({children}: {children: string}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = titleRef.current;
    if (!element) return;

    const fitTitle = () => {
      element.style.fontSize = "38px";
      const range = document.createRange();
      range.selectNodeContents(element);
      const textWidth = range.getBoundingClientRect().width;
      const availableWidth = element.clientWidth;
      const fittedSize = Math.min(38, Math.max(18, 38 * availableWidth / Math.max(textWidth, 1) * 0.97));
      element.style.fontSize = `${fittedSize}px`;
    };

    fitTitle();
    void document.fonts.ready.then(fitTitle);
    window.addEventListener("resize", fitTitle);
    return () => window.removeEventListener("resize", fitTitle);
  }, [children]);

  return (
    <h2
      ref={titleRef}
      className="featured-product-title featured-rise featured-rise-2 w-full max-w-full whitespace-nowrap font-serif text-[38px] font-normal leading-[1.08] tracking-[-0.045em]"
      style={{whiteSpace: "nowrap", wordBreak: "keep-all", overflowWrap: "normal"}}
    >
      {children}
    </h2>
  );
}

export function FeaturedProductsHome({locale}: {locale: string}) {
  const railRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const language = locale === "ja" ? "ja" : "en";

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.slide));
      },
      {root: rail, threshold: [0.56, 0.72]}
    );
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="featured-exhibition relative h-svh overflow-hidden text-white">
      <div ref={railRef} className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain">
        <section
          ref={(element) => {slideRefs.current[0] = element;}}
          data-slide="0"
          data-active={current === 0 ? "true" : "false"}
          className="featured-intro relative flex h-full snap-start snap-always flex-col overflow-hidden"
        >
          <Image src="/og-featured.png" alt="" fill priority sizes="(max-width: 639px) 100vw, 420px" className="object-cover object-center" />
          <div className="featured-intro__veil absolute inset-0" />
          <div className="featured-intro__top relative z-10 flex items-start justify-between px-6 pt-7">
            <p>KAMA-ASA / SELECTED TOOLS</p>
            <div className="text-[#181818]"><LanguagePill /></div>
          </div>
          <div className="relative z-10 mt-auto px-6 pb-16">
            <p className="featured-rise featured-rise-1 mb-7 text-[10px] tracking-[0.24em] text-[#d1b276]">
              {language === "ja" ? "六つの道具、六つの背景" : "SIX TOOLS / SIX STORIES"}
            </p>
            <h1 className="featured-rise featured-rise-2 max-w-[9em] font-serif text-[52px] font-normal leading-[0.98] tracking-[-0.055em]">
              {language === "ja" ? "道具から料理を考える" : "Tools for the way we cook"}
            </h1>
            <div className="featured-rise featured-rise-3 mt-9 flex items-center gap-4 text-[9px] tracking-[0.2em] text-white/70">
              <span className="h-px w-12 bg-white/55" />
              <span>{language === "ja" ? "スクロールして選ぶ" : "SCROLL TO DISCOVER"}</span>
            </div>
          </div>
        </section>

        {products.map((product, index) => {
          const slide = (
            <>
              <div className={`featured-tool__image absolute inset-0 ${product.number === "06" ? "bg-[#f7f7f5]" : ""}`}>
                <Image
                  src={product.image}
                  alt={product.name[language]}
                  fill
                  sizes="(max-width: 639px) 100vw, 420px"
                  className={product.imageClassName ?? "object-cover"}
                />
              </div>
              <div className="featured-tool__veil absolute inset-0" />
              <div className="featured-tool__top relative z-10 flex items-center justify-between px-6 pt-7 text-[9px] tracking-[0.22em]">
                <span>{product.category[language]}</span>
                <span>{product.number} / 06</span>
              </div>
              <div className="relative z-10 mt-auto px-6 pb-12">
                <p className="featured-rise featured-rise-1 mb-5 text-[9px] tracking-[0.18em] text-[#c9aa70]">{product.note[language]}</p>
                <FittedProductTitle>{product.name[language]}</FittedProductTitle>
                <div className="featured-rise featured-rise-3 mt-8 flex items-center justify-between border-t border-white/35 pt-4 text-[9px] tracking-[0.2em]">
                  <span>{product.number === "01" ? (language === "ja" ? "物語を読む" : "DISCOVER THE STORY") : (language === "ja" ? "選ばれた道具" : "SELECTED TOOL")}</span>
                  <span aria-hidden="true" className="text-lg">↗</span>
                </div>
              </div>
            </>
          );

          const className = `featured-tool featured-tool--${product.tone} relative flex h-full snap-start snap-always flex-col overflow-hidden`;
          return product.href ? (
            <Link
              key={product.number}
              ref={(element) => {slideRefs.current[index + 1] = element;}}
              data-slide={index + 1}
              data-active={current === index + 1 ? "true" : "false"}
              href={product.href}
              locale={locale}
              className={className}
            >
              {slide}
            </Link>
          ) : (
            <section
              key={product.number}
              ref={(element) => {slideRefs.current[index + 1] = element;}}
              data-slide={index + 1}
              data-active={current === index + 1 ? "true" : "false"}
              className={className}
            >
              {slide}
            </section>
          );
        })}
      </div>

      <nav className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2" aria-label="Featured tools">
        {[0, ...products.map((_, index) => index + 1)].map((slide) => (
          <button
            key={slide}
            type="button"
            aria-label={`Go to slide ${slide + 1}`}
            aria-current={current === slide ? "step" : undefined}
            onClick={() => slideRefs.current[slide]?.scrollIntoView({behavior: "smooth", block: "start"})}
            className={`h-1.5 w-1.5 rounded-full border border-white/70 transition-transform ${current === slide ? "scale-150 bg-[#c9aa70]" : "bg-black/45"}`}
          />
        ))}
      </nav>
    </div>
  );
}
