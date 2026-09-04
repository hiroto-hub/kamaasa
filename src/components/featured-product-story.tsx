"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";
import {type FeaturedProductStory, type LocalizedCopy} from "@/data/featured-product-stories";

const pad2 = (value: number) => String(value).padStart(2, "0");

const cleanHeading = (value: string) => value
  .replace(/[、，]/g, " ")
  .replace(/[。．.!！?？]+$/g, "")
  .replace(/\s+/g, " ")
  .trim();

const headingFontSize = (value: string, first: boolean) => {
  const units = Array.from(value).reduce((total, character) => total + (/^[\x00-\x7F]$/.test(character) ? 0.55 : 1), 0);
  return Math.min(first ? 34 : 28, Math.max(12, 326 / Math.max(units, 1)));
};

export function FeaturedProductStoryView({locale, story}: {locale: string; story: FeaturedProductStory}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(1);
  const language: keyof LocalizedCopy = locale === "ja" ? "ja" : "en";

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.page));
    }, {root: rail, threshold: [0.55, 0.72]});
    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-svh overflow-hidden bg-[#f7f7f5] text-[#303030]">
      <div ref={railRef} className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain">
        {story.pages.map((page, index) => {
          const first = index === 0;
          const heading = cleanHeading(first ? story.title[language] : page.title[language]);
          return (
            <section
              key={`${story.slug}-${index}`}
              ref={(element) => {pageRefs.current[index] = element;}}
              data-page={index + 1}
              data-active={current === index + 1 ? "true" : "false"}
              aria-label={`Story page ${index + 1} of ${story.pages.length}`}
              className={`story-page relative flex h-full snap-start snap-always flex-col overflow-hidden ${page.dark ? "bg-[#171717] text-white" : "bg-[#f7f7f5]"}`}
            >
              {page.image && (
                <div className={`relative ${first ? "order-2 h-[57%]" : "h-[43%]"} shrink-0 overflow-hidden bg-white`}>
                  <Image src={page.image} alt={page.imageAlt?.[language] ?? ""} fill priority={index < 2} sizes="(max-width: 639px) 100vw, 420px" className={page.imageClassName ?? "object-cover object-center"} />
                  {!first && <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />}
                </div>
              )}

              {page.videoId && (
                <div className="relative order-2 mx-7 mb-auto aspect-video shrink-0 overflow-hidden bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${page.videoId}?rel=0&playsinline=1`}
                    title={page.videoTitle?.[language] ?? page.title[language]}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              <div className={`relative z-10 flex flex-col px-7 ${first ? "order-1 flex-1 justify-end pb-7 pt-14" : page.videoId ? "order-1 mt-auto flex-none pb-5" : "flex-1 justify-center py-8"}`}>
                <p className={`story-reveal story-reveal-1 mb-4 text-[10px] font-semibold tracking-[0.24em] ${page.dark ? "text-[#c6a66a]" : "text-[#8b6b31]"}`}>{page.kicker[language]}</p>
                <h1 className="story-display story-reveal story-reveal-2 max-w-full whitespace-nowrap leading-[1.16]" style={{fontSize: `${headingFontSize(heading, first)}px`}}>{heading}</h1>
                <div className={`story-reveal story-reveal-3 my-5 h-px w-12 ${page.dark ? "bg-white/45" : "bg-black/35"}`} />
                <p className={`story-copy story-reveal story-reveal-4 max-w-[34em] text-[13px] ${page.videoId ? "leading-[1.75]" : "leading-[1.92]"} ${page.dark ? "text-white/78" : "text-[#4a4a4a]"}`}>{page.body[language]}</p>

                {page.specs && (
                  <dl className={`story-reveal story-reveal-5 mt-6 border-t text-[11px] ${page.dark ? "border-white/25" : "border-black/25"}`}>
                    {page.specs.map((item) => (
                      <div key={item.label.en} className={`grid grid-cols-[40%_1fr] border-b py-2 ${page.dark ? "border-white/15" : "border-black/15"}`}>
                        <dt className={page.dark ? "text-white/50" : "text-black/55"}>{item.label[language]}</dt>
                        <dd className="font-medium">{item.value[language]}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {page.related && (
                  <div className="story-reveal story-reveal-5 mt-7">
                    <p className="mb-4 text-[9px] font-semibold tracking-[0.2em] text-black/55">{language === "ja" ? "関連商品" : "RELATED PRODUCTS"}</p>
                    <div className={`grid gap-2 ${story.relatedProducts.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {story.relatedProducts.map((related, relatedIndex) => {
                        return (
                          <a key={related.href} href={related.href} hrefLang="en-US" className="group overflow-hidden border border-black/15 bg-white/75 text-left transition-colors active:bg-black/10">
                            <div className="relative h-24 bg-white/80"><Image src={related.image} alt="" fill sizes="104px" className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-105" /></div>
                            <div className="grid min-h-[48px] grid-cols-[21px_1fr] border-t border-black/10">
                              <span className="flex items-center justify-center border-r border-black/10 text-[7px] tracking-[0.08em] text-[#8b6b31]">{pad2(relatedIndex + 1)}</span>
                              <span className="flex items-center px-1.5 py-1.5 text-[8px] font-medium leading-[1.25]">{related.name[language]}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                    <a href={story.storeUrl} hrefLang="en-US" className="mt-5 flex items-center justify-between border-y border-black/25 py-3 text-[9px] font-semibold tracking-[0.16em]">
                      <span>{language === "ja" ? "英語のオンラインストアで見る" : "VIEW ON THE ENGLISH ONLINE STORE"}</span><span aria-hidden="true">↗</span>
                    </a>
                    <Link href="/?floor=tools" locale={locale} className="mt-3 flex items-center justify-between py-2 text-[9px] font-semibold tracking-[0.16em] text-black/55">
                      <span>{language === "ja" ? "道具一覧へ戻る" : "BACK TO SELECTED TOOLS"}</span><span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>

              {first && <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-20 text-center text-[9px] font-semibold tracking-[0.2em] text-black/55">SCROLL TO DISCOVER ↓</div>}
            </section>
          );
        })}
      </div>

      <Link href="/?floor=tools" locale={locale} aria-label={language === "ja" ? "道具一覧へ戻る" : "Back to selected tools"} className="mincho group absolute left-4 top-4 z-30 flex h-8 items-center gap-2 border border-black/15 bg-white/80 px-3 text-[10px] tracking-[0.18em] text-black/65 backdrop-blur-sm">
        <span aria-hidden="true" className="text-[14px] leading-none">←</span><span>{language === "ja" ? "道具一覧" : "TOOLS"}</span>
      </Link>
      <div className="pointer-events-none absolute right-4 top-4 z-30 bg-white/90 px-2.5 py-1.5 text-[12px] font-medium tracking-[0.1em] shadow-sm backdrop-blur-sm" aria-live="polite">{pad2(current)} <span className="text-black/40">/ {pad2(story.pages.length)}</span></div>
      <nav className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2" aria-label="Story pages">
        {story.pages.map((page, index) => <button key={`${page.kicker.en}-dot-${index}`} type="button" aria-label={`Go to page ${index + 1}`} aria-current={current === index + 1 ? "step" : undefined} onClick={() => pageRefs.current[index]?.scrollIntoView({behavior: "smooth", block: "start"})} className={`h-1.5 w-1.5 rounded-full border border-white/80 shadow-sm transition-transform ${current === index + 1 ? "scale-150 bg-[#a47c36]" : "bg-[#777]"}`} />)}
      </nav>
    </div>
  );
}
