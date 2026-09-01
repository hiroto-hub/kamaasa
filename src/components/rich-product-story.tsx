"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";

type Copy = {ja: string; en: string};

type StoryPage = {
  kicker: Copy;
  title: Copy;
  body: Copy;
  image?: string;
  imageAlt?: Copy;
  imagePosition?: string;
  dark?: boolean;
  specs?: {label: Copy; value: Copy}[];
  related?: boolean;
};

type RelatedTool = {
  name: Copy;
  image: string;
  href: string;
};

const copy = (ja: string, en: string): Copy => ({ja, en});

const pages: StoryPage[] = [
  {
    kicker: copy("KAMA-ASA ORIGINAL", "KAMA-ASA ORIGINAL"),
    title: copy("amane", "amane"),
    body: copy(
      "はじめて握った日から、手になじむ。毎日の料理から専門的な仕事までを支える、釜浅商店オリジナル洋包丁シリーズです。",
      "A knife that feels right from day one. KAMA-ASA's original knife series, shaped for everyday cooking and precise professional work."
    ),
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    imageAlt: copy("amane 三徳包丁", "amane Santoku knife")
  },
  {
    kicker: copy("THE STANDARD", "THE STANDARD"),
    title: copy("道具の基本を、もう一度つくる。", "Reconsidering the everyday standard."),
    body: copy(
      "amaneが目指したのは、使う人を選ばず、毎日の料理で自然に手が伸びる究極のスタンダード。硬さと刃持ちに優れるVG10ステンレス鋼を芯に、切れ味、研ぎやすさ、握り心地をひとつずつ整えました。",
      "amane was created as an ultimate standard: approachable, dependable and natural to reach for every day. A VG10 stainless core brings hardness and edge retention, while every detail balances cutting, sharpening and comfort."
    ),
    image: "/images/kamaasa/amane/point-01.jpg",
    imageAlt: copy("amaneで食材を切る様子", "Cutting with the amane knife")
  },
  {
    kicker: copy("POINT 01", "POINT 01"),
    title: copy("鋼を活かし、食材へすっと入る。", "Hard steel, shaped for a smooth cut."),
    body: copy(
      "硬いVG10鋼を活かすため、焼き入れ後の歪みを丁寧に取り、砥石で厚みを整えます。峰から刃先へなだらかに薄くなる凸刃が切り込みの抵抗を抑え、切れ離れと刃持ちを両立します。",
      "After tempering, the hard VG10 steel is carefully straightened and refined on whetstones. A convex profile thins gradually from spine to edge, reducing resistance while balancing food release and lasting sharpness."
    ),
    image: "/images/kamaasa/amane/point-04.jpg",
    imageAlt: copy("滑らかに食材へ入るamaneの刃", "The amane blade cutting smoothly")
  },
  {
    kicker: copy("POINT 02", "POINT 02"),
    title: copy("研ぎ、握り、口金。手になじむ設計。", "An edge, handle and bolster made for the hand."),
    body: copy(
      "表裏7対3の刃付けは右利きの手に扱いやすく、一枚鋼は研ぎながら自分の刃へ育てられます。積層強化木の柄は境目まで何度も磨き、丸く滑らかな握りへ。ステンレスの口金が水や汚れの侵入を抑えます。",
      "A 7:3 edge suits right-handed use, while single-layer steel can be reshaped through years of sharpening. The composite-wood handle is polished into a seamless rounded grip, and a stainless bolster helps keep out water and dirt."
    ),
    image: "/images/kamaasa/amane/point-02.jpg",
    imageAlt: copy("磨かれたハンドル", "The polished amane handle")
  },
  {
    kicker: copy("POINT 03", "POINT 03"),
    title: copy("釜浅商店の印と、関の手仕事。", "The KAMA-ASA mark, made in Seki."),
    body: copy(
      "刃の裏に刻まれた釜浅商店のマークは、ここだけのオリジナルである証です。一本を支えるのは、日本有数の刃物産地・岐阜県関市の藤竹。研削、歪み取り、仕上げ、柄付けまで、多くの工程を自社で担う作り手と共同開発しました。",
      "The mark on the reverse identifies an original available only from KAMA-ASA. amane was developed with Fujitake in Seki, Gifu, where the maker performs much of the grinding, straightening, finishing and handle fitting in-house."
    ),
    image: "/images/kamaasa/amane/point-07.jpg",
    imageAlt: copy("関市での包丁づくり", "Knife making in Seki"),
    dark: true
  },
  {
    kicker: copy("THE LINE-UP", "THE LINE-UP"),
    title: copy("料理に合わせて、一本を選ぶ。", "One series, shaped for every task."),
    body: copy(
      "肉・魚・野菜を一本でこなす三徳と牛刀。長い引き切りに向く筋引、骨まわりを細かく扱う骨スキ。共通する切れ味と握り心地を、用途に合う刃の形で選べます。",
      "Choose Santoku or Gyuto for versatile daily work, Sujihiki for long clean slices, and Honesuki for precise work around bone. Each profile shares the same considered edge and polished grip."
    ),
    image: "/images/kamaasa/amane/point-03.jpg",
    imageAlt: copy("用途に合わせて選べるamaneシリーズ", "The amane knife series")
  },
  {
    kicker: copy("SPECIFICATION / CARE", "SPECIFICATION / CARE"),
    title: copy("三徳 175mmを、長く使う。", "Living with the Santoku 175 mm."),
    body: copy(
      "食器洗浄機は使わず、洗ったあとは水分をよく拭き取ってください。研ぎ直しながら長く使え、釜浅商店では名入れにも対応しています。",
      "Do not place the knife in a dishwasher. Wash and dry it thoroughly after use. Regular sharpening keeps it working for years, and KAMA-ASA also offers name engraving."
    ),
    specs: [
      {label: copy("全長", "Total length"), value: copy("300mm", "300 mm")},
      {label: copy("刃渡り", "Blade length"), value: copy("175mm", "175 mm")},
      {label: copy("刃付け", "Bevel"), value: copy("両刃・右利き用", "Double bevel, right-handed")},
      {label: copy("刃の構造", "Blade structure"), value: copy("一枚鋼", "Single layer")},
      {label: copy("刃材", "Blade"), value: copy("V10ステンレス鋼", "V10 stainless steel")},
      {label: copy("柄材", "Handle"), value: copy("積層強化木", "Composite wood")},
      {label: copy("産地", "Origin"), value: copy("岐阜県関市", "Seki, Gifu, Japan")}
    ]
  },
  {
    kicker: copy("SHOP THE SERIES", "SHOP THE SERIES"),
    title: copy("使い方から、次の一本へ。", "Choose the knife that fits your work."),
    body: copy(
      "同じAMANEシリーズから、用途に合わせた三本をご紹介します。日々の万能包丁から、肉や魚のための専門的な一本へ。",
      "Explore three more knives from the AMANE series, each shaped for a different task—from everyday preparation to precise work with meat and fish."
    ),
    related: true
  }
];

const relatedTools: RelatedTool[] = [
  {
    name: copy("amane 牛刀", "amane Chef knife"),
    image: "/images/kamaasa/related/amane-chef-knife.jpg",
    href: "https://kama-asa.co.jp/en-us/products/amane-gyuto?country=US"
  },
  {
    name: copy("amane 筋引", "amane Sujihiki"),
    image: "/images/kamaasa/related/amane-sujihiki.png",
    href: "https://kama-asa.co.jp/en-us/products/amane-sujihiki?country=US"
  },
  {
    name: copy("amane 骨スキ", "amane Honesuki"),
    image: "/images/kamaasa/related/amane-honesuki.png",
    href: "https://kama-asa.co.jp/en-us/products/amane-honesuki?country=US"
  }
];

const pad2 = (value: number) => String(value).padStart(2, "0");

export function RichProductStory({locale}: {locale: string}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(1);
  const language: keyof Copy = locale === "ja" ? "ja" : "en";

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setCurrent(Number((visible.target as HTMLElement).dataset.page));
      },
      {root: rail, threshold: [0.55, 0.72]}
    );
    pageRefs.current.forEach((page) => page && observer.observe(page));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-svh overflow-hidden bg-[#f7f7f5] text-[#303030]">
      <div ref={railRef} className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain">
        {pages.map((page, index) => {
          const first = index === 0;
          return (
            <section
              key={`${page.kicker.en}-${index}`}
              ref={(element) => {pageRefs.current[index] = element;}}
              data-page={index + 1}
              data-active={current === index + 1 ? "true" : "false"}
              aria-label={`Story page ${index + 1} of ${pages.length}`}
              className={`story-page relative flex h-full snap-start snap-always flex-col overflow-hidden ${page.dark ? "bg-[#171717] text-white" : "bg-[#f7f7f5]"}`}
            >
              {page.image && (
                <div className={`relative ${first ? "order-2 h-[58%]" : "h-[43%]"} shrink-0 overflow-hidden bg-white`}>
                  <Image
                    src={page.image}
                    alt={page.imageAlt?.[language] ?? ""}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 639px) 100vw, 420px"
                    className={first ? "object-contain p-6" : "object-cover"}
                    style={{objectPosition: page.imagePosition ?? "center"}}
                  />
                  {!first && <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />}
                </div>
              )}

              <div className={`relative z-10 flex flex-1 flex-col px-7 ${first ? "order-1 justify-end pb-7 pt-14" : "justify-center py-9"}`}>
                <p className={`story-reveal story-reveal-1 mb-5 text-[11px] font-semibold tracking-[0.24em] ${page.dark ? "text-[#c6a66a]" : "text-[#8b6b31]"}`}>
                  {page.kicker[language]}
                </p>
                <h1 className={`story-reveal story-reveal-2 ${first ? "text-[38px]" : "text-[29px]"} max-w-[95%] font-medium leading-[1.12] tracking-[-0.03em]`}>
                  {page.title[language]}
                </h1>
                <div className={`story-reveal story-reveal-3 my-6 h-px w-12 ${page.dark ? "bg-white/45" : "bg-black/35"}`} />
                <p className={`story-reveal story-reveal-4 max-w-[34em] text-[14px] leading-[1.9] ${page.dark ? "text-white/78" : "text-[#4a4a4a]"}`}>
                  {page.body[language]}
                </p>

                {page.specs && (
                  <dl className="story-reveal story-reveal-5 mt-7 border-t border-black/25 text-[12px]">
                    {page.specs.map((item) => (
                      <div key={item.label.en} className="grid grid-cols-[42%_1fr] border-b border-black/15 py-2.5">
                        <dt className="text-black/55">{item.label[language]}</dt>
                        <dd className="font-medium">{item.value[language]}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {page.related && (
                  <div className="story-reveal story-reveal-5 mt-8">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[9px] font-semibold tracking-[0.2em] text-black/55">
                        {language === "ja" ? "関連商品" : "RELATED PRODUCTS"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {relatedTools.map((tool, toolIndex) => (
                        <a
                          key={tool.name.en}
                          href={tool.href}
                          target="_self"
                          hrefLang="en-US"
                          aria-label={`${tool.name[language]} — ${language === "ja" ? "英語のECサイトで見る" : "view on the English online store"}`}
                          className="group overflow-hidden border border-black/15 bg-white/75 text-left transition-colors active:bg-black/10"
                        >
                          <div className="relative h-24 bg-white/80">
                            <Image
                              src={tool.image}
                              alt=""
                              fill
                              sizes="104px"
                              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="grid min-h-[44px] grid-cols-[22px_1fr] border-t border-black/10">
                            <span className="flex items-center justify-center border-r border-black/10 text-[7px] tracking-[0.08em] text-[#8b6b31]">
                              {pad2(toolIndex + 2)}
                            </span>
                            <span className="flex items-center px-2 py-1.5 text-[9px] font-medium leading-[1.25]">
                              {tool.name[language]}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                    <Link
                      href="/"
                      locale={locale}
                      className="mt-8 flex items-center justify-between border-y border-black/25 py-3 text-[10px] font-semibold tracking-[0.16em]"
                    >
                      <span>{language === "ja" ? "道具一覧へ戻る" : "BACK TO SELECTED TOOLS"}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>

              {first && (
                <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-20 text-center text-[9px] font-semibold tracking-[0.2em] text-black/55">
                  SCROLL TO DISCOVER ↓
                </div>
              )}
            </section>
          );
        })}
      </div>

      <Link
        href="/"
        locale={locale}
        aria-label={language === "ja" ? "道具一覧へ戻る" : "Back to selected tools"}
        className="mincho group absolute left-4 top-4 z-30 flex h-8 items-center gap-2 border border-black/15 bg-white/75 px-3 text-[10px] font-normal tracking-[0.18em] text-black/60 backdrop-blur-sm transition-colors hover:border-black/25 hover:bg-white/85 hover:text-black/75 active:bg-white/95 active:text-black/85"
      >
        <span
          aria-hidden="true"
          className="text-[14px] font-normal leading-none transition-transform group-active:-translate-x-0.5"
        >
          ←
        </span>
        <span>{language === "ja" ? "道具一覧" : "TOOLS"}</span>
      </Link>

      <div className="pointer-events-none absolute right-4 top-4 z-30 bg-white/90 px-2.5 py-1.5 text-[12px] font-medium tracking-[0.1em] shadow-sm backdrop-blur-sm" aria-live="polite">
        {pad2(current)} <span className="text-black/40">/ {pad2(pages.length)}</span>
      </div>

      <nav className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2" aria-label="Story pages">
        {pages.map((page, index) => (
          <button
            key={`${page.kicker.en}-dot`}
            type="button"
            aria-label={`Go to page ${index + 1}`}
            aria-current={current === index + 1 ? "step" : undefined}
            onClick={() => pageRefs.current[index]?.scrollIntoView({behavior: "smooth", block: "start"})}
            className={`h-1.5 w-1.5 rounded-full border border-white/80 shadow-sm transition-transform ${current === index + 1 ? "scale-150 bg-[#a47c36]" : "bg-[#777]"}`}
          />
        ))}
      </nav>

    </div>
  );
}
