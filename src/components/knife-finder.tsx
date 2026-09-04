"use client";

import Image from "next/image";
import {useEffect, useMemo, useState} from "react";

type KnifeId = "santoku" | "gyuto" | "utility" | "sujihiki" | "honesuki";
type Language = "ja" | "en";

type Option = {
  label: {ja: string; en: string};
  scores?: Partial<Record<KnifeId, number>>;
  care?: "self" | "service" | "consult";
};

const questions: {eyebrow: string; title: {ja: string; en: string}; options: Option[]}[] = [
  {
    eyebrow: "01 / COOKING",
    title: {ja: "普段どのくらい料理をしますか", en: "How often do you cook?"},
    options: [
      {label: {ja: "週に数回・手軽な料理が中心", en: "A few times a week, mostly simple meals"}, scores: {santoku: 3, utility: 1}},
      {label: {ja: "ほぼ毎日、いろいろな料理をする", en: "Almost every day, across many dishes"}, scores: {santoku: 3, gyuto: 2}},
      {label: {ja: "量を多く作る・本格的に料理する", en: "Large-volume or serious cooking"}, scores: {gyuto: 3, sujihiki: 1}}
    ]
  },
  {
    eyebrow: "02 / INGREDIENTS",
    title: {ja: "よく切る食材はどれですか", en: "What do you cut most often?"},
    options: [
      {label: {ja: "肉・魚・野菜をまんべんなく", en: "A balanced mix of meat, fish and vegetables"}, scores: {santoku: 4}},
      {label: {ja: "大きな肉や野菜", en: "Large cuts of meat and vegetables"}, scores: {gyuto: 3}},
      {label: {ja: "果物・薬味・小さな食材", en: "Fruit, herbs and small ingredients"}, scores: {utility: 4}},
      {label: {ja: "刺身やロースト肉", en: "Sashimi and roasted meat"}, scores: {sujihiki: 4}},
      {label: {ja: "骨まわりの肉", en: "Meat around joints and bones"}, scores: {honesuki: 4}}
    ]
  },
  {
    eyebrow: "03 / MOTION",
    title: {ja: "重視したい使い方はどれですか", en: "Which cutting style matters most?"},
    options: [
      {label: {ja: "一本で普段の下ごしらえをこなす", en: "One knife for everyday preparation"}, scores: {santoku: 4}},
      {label: {ja: "長い刃で大きく切り進める", en: "A longer blade for broad, efficient cuts"}, scores: {gyuto: 4}},
      {label: {ja: "手元で細かく動かす", en: "Precise work close to the hand"}, scores: {utility: 4}},
      {label: {ja: "長く滑らかに引き切る", en: "Long, clean drawing cuts"}, scores: {sujihiki: 4}},
      {label: {ja: "骨に沿って細かく外す", en: "Working precisely around bone"}, scores: {honesuki: 4}}
    ]
  },
  {
    eyebrow: "04 / CARE",
    title: {ja: "利き手と研ぎ方を教えてください", en: "Tell us your handedness and care preference"},
    options: [
      {label: {ja: "右利き・自分で研ぎたい", en: "Right-handed — sharpen at home"}, care: "self"},
      {label: {ja: "右利き・研ぎはお店に任せたい", en: "Right-handed — use a sharpening service"}, care: "service"},
      {label: {ja: "左利き・合う刃付けを相談したい", en: "Left-handed — ask about a suitable edge"}, care: "consult"}
    ]
  }
];

const knives: Record<KnifeId, {
  name: {ja: string; en: string};
  reason: {ja: string; en: string};
  image: string;
  href: {ja: string; en: string};
}> = {
  santoku: {
    name: {ja: "amane 三徳 175mm", en: "amane Santoku 175mm"},
    reason: {ja: "肉・魚・野菜を一本で扱いやすく、普段の料理の中心に置ける万能包丁です。", en: "A versatile everyday knife designed to handle meat, fish and vegetables with one familiar shape."},
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    href: {ja: "https://kama-asa.co.jp/products/amane-santoku", en: "https://kama-asa.co.jp/en-us/products/amane-santoku?country=US"}
  },
  gyuto: {
    name: {ja: "amane 牛刀", en: "amane Chef Knife"},
    reason: {ja: "長い刃を活かして、大きな食材や量の多い仕込みを効率よく進めたい方に向きます。", en: "Its longer blade suits larger ingredients, longer cuts and higher-volume preparation."},
    image: "/images/kamaasa/related/amane-chef-knife.jpg",
    href: {ja: "https://kama-asa.co.jp/products/amane-gyuto", en: "https://kama-asa.co.jp/en-us/products/amane-gyuto?country=US"}
  },
  utility: {
    name: {ja: "amane ペティナイフ", en: "amane Utility Knife"},
    reason: {ja: "果物、薬味、皮むきなど、手元で行う小さく繊細な作業を軽快にこなせます。", en: "A nimble choice for fruit, herbs, peeling and other small, precise work."},
    image: "/images/kamaasa/related/amane-utility-knife.jpg",
    href: {ja: "https://kama-asa.co.jp/products/amane-petli", en: "https://kama-asa.co.jp/en-us/products/amane-petli"}
  },
  sujihiki: {
    name: {ja: "amane 筋引", en: "amane Sujihiki"},
    reason: {ja: "刺身やロースト肉を、長い刃で切り口を崩さず滑らかに引き切りたい方に向きます。", en: "Its long, slim blade is made for smooth drawing cuts through sashimi and roasted meat."},
    image: "/images/kamaasa/related/amane-sujihiki.png",
    href: {ja: "https://kama-asa.co.jp/products/amane-sujihiki", en: "https://kama-asa.co.jp/en-us/products/amane-sujihiki?country=US"}
  },
  honesuki: {
    name: {ja: "amane 骨スキ", en: "amane Honesuki"},
    reason: {ja: "鶏などの骨に沿って肉を外す、専門的で細かな作業を重視する方に向きます。", en: "A specialist profile for precise work around poultry joints and bones."},
    image: "/images/kamaasa/related/amane-honesuki.png",
    href: {ja: "https://kama-asa.co.jp/products/amane-honesuki", en: "https://kama-asa.co.jp/en-us/products/amane-honesuki?country=US"}
  }
};

export function KnifeFinder({locale}: {locale: string}) {
  const language: Language = locale === "ja" ? "ja" : "en";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const resultId = useMemo<KnifeId>(() => {
    const totals: Record<KnifeId, number> = {santoku: 0, gyuto: 0, utility: 0, sujihiki: 0, honesuki: 0};
    answers.forEach((answer) => Object.entries(answer.scores ?? {}).forEach(([id, score]) => {totals[id as KnifeId] += score ?? 0;}));
    return (Object.entries(totals) as [KnifeId, number][]).sort((a, b) => b[1] - a[1])[0][0];
  }, [answers]);

  const finished = step >= questions.length;
  const result = knives[resultId];
  const care = answers.at(-1)?.care;

  const choose = (option: Option) => {
    setAnswers((current) => [...current.slice(0, step), option]);
    setStep((current) => current + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group absolute bottom-5 right-5 z-40 w-[174px] border border-black/20 bg-[#f7f5ef]/95 px-4 py-3 text-left text-[#292929] shadow-[0_5px_22px_rgb(0_0_0_/_0.18)] backdrop-blur-md transition-colors hover:bg-white active:bg-[#ece8df]"
        >
          <span className="block text-[8px] font-semibold tracking-[0.2em] text-[#8b6b31]">KNIFE FINDER</span>
          <span className="mt-1.5 flex items-end justify-between gap-3">
            <span className="story-display text-[15px] leading-[1.35]">{language === "ja" ? "自分に合う包丁を探す" : "Find your knife"}</span>
            <span aria-hidden="true" className="pb-0.5 text-[16px] transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section role="dialog" aria-modal="true" aria-label={language === "ja" ? "包丁診断" : "Knife finder"} className="relative flex max-h-[88svh] w-full max-w-[420px] flex-col overflow-y-auto bg-[#f7f5ef] px-7 pb-8 pt-7 text-[#292929] shadow-[0_-12px_40px_rgb(0_0_0_/_0.28)]">
            <div className="mb-7 flex items-start justify-between border-b border-black/15 pb-5">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[#8b6b31]">KAMA-ASA KNIFE FINDER</p>
                <p className="story-display mt-2 text-[25px] leading-none">{language === "ja" ? "あなたの一本を選ぶ" : "Choose your knife"}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={language === "ja" ? "閉じる" : "Close"} className="flex h-8 w-8 items-center justify-center border border-black/15 text-[18px] text-black/55">×</button>
            </div>

            {!finished ? (
              <div>
                <div className="mb-8 flex gap-1" aria-label={`${step + 1} / ${questions.length}`}>
                  {questions.map((_, index) => <span key={index} className={`h-[2px] flex-1 ${index <= step ? "bg-[#8b6b31]" : "bg-black/12"}`} />)}
                </div>
                <p className="text-[9px] font-semibold tracking-[0.2em] text-black/45">{questions[step].eyebrow}</p>
                <h2 className="story-display mt-3 text-[27px] leading-[1.4]">{questions[step].title[language]}</h2>
                <div className="mt-7 grid gap-2">
                  {questions[step].options.map((option, index) => (
                    <button key={option.label.en} type="button" onClick={() => choose(option)} className="group grid min-h-[52px] grid-cols-[34px_1fr_24px] items-center border border-black/15 bg-white/50 text-left transition-colors hover:border-black/35 hover:bg-white active:bg-black/5">
                      <span className="text-center text-[9px] text-[#8b6b31]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="border-l border-black/10 px-3 py-3 text-[12px] leading-[1.6]">{option.label[language]}</span>
                      <span aria-hidden="true" className="text-black/40 transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  ))}
                </div>
                {step > 0 && <button type="button" onClick={() => {setStep((current) => current - 1); setAnswers((current) => current.slice(0, -1));}} className="mt-6 text-[9px] font-semibold tracking-[0.15em] text-black/45">← {language === "ja" ? "前の質問へ" : "PREVIOUS QUESTION"}</button>}
              </div>
            ) : (
              <div>
                <p className="text-[9px] font-semibold tracking-[0.2em] text-[#8b6b31]">YOUR KNIFE</p>
                <h2 className="story-display mt-3 text-[29px] leading-[1.3]">{result.name[language]}</h2>
                <div className="relative my-6 h-40 border-y border-black/10 bg-white">
                  <Image src={result.image} alt="" fill sizes="(max-width: 420px) 100vw, 420px" className="object-contain p-5" />
                </div>
                <p className="text-[13px] leading-[1.9] text-black/70">{result.reason[language]}</p>
                <div className="mt-5 border-l-2 border-[#a5823d] bg-white/55 px-4 py-3 text-[11px] leading-[1.75] text-black/60">
                  {care === "self" && (language === "ja" ? "切れ味が落ちたら砥石で研ぎ直します。amaneの一枚鋼は、長く使っても安定した研ぎ心地が特徴です。" : "Sharpen with a whetstone when the edge begins to dull. amane's single-layer blade offers a stable sharpening feel over years of use.")}
                  {care === "service" && (language === "ja" ? "切れ味が落ちたら、釜浅商店の有料研ぎサービスへ依頼できます。普段は手洗いし、水分をよく拭き取ります。" : "When the edge dulls, you can use KAMA-ASA's paid sharpening service. Hand-wash and dry the knife thoroughly after daily use.")}
                  {care === "consult" && (language === "ja" ? "amane 三徳の標準仕様は右利き向けです。左利きの方は、購入前に刃付けや別の選択肢を店舗へ相談するのがおすすめです。" : "The standard amane Santoku is made for right-handed use. Left-handed cooks should ask KAMA-ASA about edge options before purchasing.")}
                </div>
                <a href={result.href[language]} hrefLang={language === "ja" ? "ja" : "en-US"} className="mt-6 flex items-center justify-between bg-[#1b1b1b] px-5 py-4 text-[10px] font-semibold tracking-[0.16em] text-white">
                  <span>{language === "ja" ? "商品を公式サイトで見る" : "VIEW ON THE OFFICIAL STORE"}</span><span aria-hidden="true">↗</span>
                </a>
                <button type="button" onClick={reset} className="mt-4 w-full py-2 text-[9px] font-semibold tracking-[0.15em] text-black/45">{language === "ja" ? "もう一度診断する" : "START AGAIN"}</button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
