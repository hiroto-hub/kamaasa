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
};

const copy = (ja: string, en: string): Copy => ({ja, en});

const pages: StoryPage[] = [
  {
    kicker: copy("KAMA-ASA ORIGINAL", "KAMA-ASA ORIGINAL"),
    title: copy("amane 三徳 175mm", "amane Santoku 175mm"),
    body: copy(
      "はじめて握った日から、手になじむ。毎日の料理に寄り添う、釜浅商店オリジナルの三徳包丁です。",
      "A knife that feels right from day one. KAMA-ASA's original Santoku, shaped for everyday cooking."
    ),
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    imageAlt: copy("amane 三徳包丁", "amane Santoku knife")
  },
  {
    kicker: copy("OVERVIEW 01", "OVERVIEW 01"),
    title: copy("肉も、魚も、野菜も。", "One knife for meat, fish, and vegetables."),
    body: copy(
      "三徳は、菜切包丁のまっすぐな刃と、牛刀の汎用性をあわせ持つ、日本で広く使われる万能包丁です。175mmの刃渡りは、家庭のまな板で扱いやすく、日々のほとんどの食材に応えます。",
      "Santoku is Japan's widely used all-purpose knife. Its long, straight edge brings together the character of a Nakiri and the versatility of a chef's knife, making the 175 mm blade a natural fit for everyday preparation."
    ),
    image: "/images/kamaasa/amane/point-01.jpg",
    imageAlt: copy("amaneで食材を切る様子", "Cutting with the amane knife")
  },
  {
    kicker: copy("OVERVIEW 02", "OVERVIEW 02"),
    title: copy("芯に選んだのは、VG10。", "Made from VG10 steel."),
    body: copy(
      "刃持ちと硬さに優れるVG10ステンレス鋼を採用。毎日の手入れのしやすさと、鋭い切れ味を長く保つこと。その両立を目指した素材です。",
      "VG10 stainless steel is known for excellent hardness and edge durability. It gives amane a lasting sharpness while remaining practical for an everyday kitchen."
    ),
    image: "/images/kamaasa/amane/point-03.jpg",
    imageAlt: copy("amaneの刃先", "Close view of the amane blade")
  },
  {
    kicker: copy("POINT 01", "POINT 01"),
    title: copy("プロの道具に使われる、硬質ステンレス。", "Professional-grade stainless steel."),
    body: copy(
      "硬い鋼を活かすため、焼き入れ後の歪みを丁寧に取り、砥石で厚みを整えます。プレス成形の一枚物でありながら、手仕事の工程を重ねて仕上げています。",
      "To make the most of hard VG10 steel, distortion is carefully removed after tempering and the blade thickness is refined on whetstones. Handwork remains essential throughout the finishing process."
    ),
    image: "/images/kamaasa/amane/point-01.jpg",
    imageAlt: copy("amaneの切れ味", "The amane knife in use")
  },
  {
    kicker: copy("POINT 02", "POINT 02"),
    title: copy("食材へ、すっと入る凸刃。", "A convex edge for a smooth cut."),
    body: copy(
      "峰から刃先へなだらかに薄くなる凸形状。切り込むときの抵抗を抑え、切れ離れと刃持ちのバランスを考えた設計です。",
      "A smooth curve runs from the spine toward the thin edge. The convex geometry reduces resistance as it cuts while balancing edge durability and food release."
    ),
    image: "/images/kamaasa/amane/point-04.jpg",
    imageAlt: copy("肉を切るamane", "amane slicing meat")
  },
  {
    kicker: copy("POINT 03", "POINT 03"),
    title: copy("研ぎ方を、使い手の手へ。", "One-piece steel that adapts to your hand."),
    body: copy(
      "表裏7対3の刃付けで、右利きの方が扱いやすい設計です。一枚鋼は研ぎによって刃の形を調整でき、長く使うほど自分の道具へ育てられます。",
      "The edge is finished at a 7:3 front-to-back ratio for right-handed use. Its single-layer construction also lets the owner adjust the edge through sharpening over years of use."
    ),
    image: "/images/kamaasa/amane/point-03.jpg",
    imageAlt: copy("一枚鋼の刃", "Single-layer steel blade")
  },
  {
    kicker: copy("POINT 04", "POINT 04"),
    title: copy("握ってわかる、丸み。", "A handle shaped for a comfortable grip."),
    body: copy(
      "金属と積層強化木の境目まで何度も磨き、隙間のない艶やかな丸みへ。小さな手でも握りやすく、長い仕込みでも負担を抑える形です。",
      "The metal and composite-wood handle are polished repeatedly into a seamless, rounded form. It is comfortable over long preparation sessions and particularly approachable for smaller hands."
    ),
    image: "/images/kamaasa/amane/point-02.jpg",
    imageAlt: copy("磨かれたハンドル", "The polished amane handle")
  },
  {
    kicker: copy("POINT 05", "POINT 05"),
    title: copy("水を入れない、ステンレスの口金。", "A hygienic, durable stainless-steel bolster."),
    body: copy(
      "刃とハンドルの間にある口金が、水の侵入や汚れの付着を抑えます。錆びにくいステンレス製で、衛生面と耐久性を支える小さな要所です。",
      "The stainless-steel bolster between blade and handle helps keep water and dirt from entering the handle. It is a small detail that supports both hygiene and durability."
    ),
    image: "/images/kamaasa/amane/point-05.jpg",
    imageAlt: copy("ステンレスの口金", "Stainless-steel bolster")
  },
  {
    kicker: copy("POINT 06", "POINT 06"),
    title: copy("釜浅商店の印。", "The KAMA-ASA mark."),
    body: copy(
      "刃の裏に刻まれた釜浅商店のマークは、ここでしか手に入らないオリジナルであること、そして道具への責任を示す印です。",
      "The mark engraved on the reverse of the blade identifies an original available only from KAMA-ASA—and the responsibility the shop takes for the tool."
    ),
    image: "/images/kamaasa/amane/point-06.jpg",
    imageAlt: copy("刃に刻まれた釜浅商店のマーク", "KAMA-ASA mark on the blade")
  },
  {
    kicker: copy("POINT 07", "POINT 07"),
    title: copy("岐阜・関の藤竹とつくる。", "Made with Fujitake in Seki, Gifu."),
    body: copy(
      "日本有数の刃物産地、岐阜県関市。研削、歪み取り、仕上げ、柄付けまで多くの工程を自社で行う藤竹と共同開発しました。料理人から信頼される技術が、一本を支えています。",
      "amane was developed with Fujitake in Seki, one of Japan's leading blade-making regions. The maker performs much of the grinding, straightening, finishing and handle fitting in-house."
    ),
    image: "/images/kamaasa/amane/point-07.jpg",
    imageAlt: copy("関市での包丁づくり", "Knife making in Seki"),
    dark: true
  },
  {
    kicker: copy("SPECIFICATION", "SPECIFICATION"),
    title: copy("一本の輪郭。", "The essentials."),
    body: copy(
      "毎日の万能包丁として取り回しやすい寸法と、研ぎ直しながら長く使うための構成です。",
      "Proportioned for everyday versatility and built to be maintained through years of sharpening."
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
    kicker: copy("CARE & ENGRAVING", "CARE & ENGRAVING"),
    title: copy("使ったあとに、次の切れ味をつくる。", "Care today for tomorrow's edge."),
    body: copy(
      "食器洗浄機は使わず、使用後は洗って水分をよく拭き取ってください。研ぎ直しながら使うことで、一本は長く手に残ります。釜浅商店では名入れにも対応しています。",
      "Do not place the knife in a dishwasher. Wash it after use and wipe it thoroughly dry. Regular sharpening lets it remain a trusted tool for years. KAMA-ASA also offers name engraving."
    ),
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    imageAlt: copy("手入れをしながら長く使うamane", "An amane knife made to be maintained")
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
          const last = index === pages.length - 1;
          return (
            <section
              key={`${page.kicker.en}-${index}`}
              ref={(element) => {pageRefs.current[index] = element;}}
              data-page={index + 1}
              aria-label={`Story page ${index + 1} of ${pages.length}`}
              className={`relative flex h-full snap-start snap-always flex-col overflow-hidden ${page.dark ? "bg-[#171717] text-white" : "bg-[#f7f7f5]"}`}
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
                <p className={`mb-5 text-[11px] font-semibold tracking-[0.24em] ${page.dark ? "text-[#c6a66a]" : "text-[#8b6b31]"}`}>
                  {page.kicker[language]}
                </p>
                <h1 className={`${first ? "text-[38px]" : "text-[29px]"} max-w-[95%] font-medium leading-[1.12] tracking-[-0.03em]`}>
                  {page.title[language]}
                </h1>
                <div className={`my-6 h-px w-12 ${page.dark ? "bg-white/45" : "bg-black/35"}`} />
                <p className={`max-w-[34em] text-[14px] leading-[1.9] ${page.dark ? "text-white/78" : "text-[#4a4a4a]"}`}>
                  {page.body[language]}
                </p>

                {page.specs && (
                  <dl className="mt-7 border-t border-black/25 text-[12px]">
                    {page.specs.map((item) => (
                      <div key={item.label.en} className="grid grid-cols-[42%_1fr] border-b border-black/15 py-2.5">
                        <dt className="text-black/55">{item.label[language]}</dt>
                        <dd className="font-medium">{item.value[language]}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {last && (
                  <Link href="/" locale={locale} className="mt-7 inline-flex w-fit items-center border-b border-black pb-1 text-[12px] font-semibold tracking-[0.16em]">
                    {language === "ja" ? "店内マップへ戻る" : "BACK TO STORE MAP"}
                  </Link>
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
