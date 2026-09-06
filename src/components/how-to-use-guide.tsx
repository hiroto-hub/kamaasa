import Image from "next/image";
import {Reveal} from "./reveal";

type Guide = {
  images: readonly string[];
  ja: {title: string; body: string; steps: readonly (readonly [string, string])[]};
  en: {title: string; body: string; steps: readonly (readonly [string, string])[]};
};

const guides: Record<string, Guide> = {
  amane: {
    images: [
      "/images/kamaasa/generated/v3/amane-howto-grip-v2.png",
      "/images/kamaasa/generated/v3/amane-howto-cut-v2.png",
      "/images/kamaasa/generated/v3/amane-howto-finish-v2.png"
    ],
    ja: {title: "三つの動きで使いこなす", body: "握り方と刃の動きを知れば 毎日の下ごしらえが軽やかに", steps: [["握る", "力まず柄をやさしく握る"], ["切る", "刃を前へ滑らせて切る"], ["仕上げる", "均一な切り口に整える"]]},
    en: {title: "Three movements for every day", body: "A relaxed grip and smooth motion make preparation effortless", steps: [["Grip", "Hold the handle gently"], ["Cut", "Guide the blade smoothly forward"], ["Finish", "Create clean even pieces"]]}
  }
};

export function ProductHowToGuide({locale, slug}: {locale: string; slug: string}) {
  const language = locale === "ja" ? "ja" : "en";
  const guide = guides[slug];
  if (!guide) return null;
  const text = guide[language];

  return (
    <section className="product-howto" lang={language}>
      <Reveal className="product-howto__intro">
        <p>HOW TO USE</p>
        <h2>{text.title}</h2>
        <span>{text.body}</span>
      </Reveal>
      <div className="product-howto__flow">
        {text.steps.map(([title, body], index) => (
          <Reveal key={title} delay={240 + index * 100} className="product-howto__step">
            <span className="product-howto__step-visual">
              <Image src={guide.images[index]} alt="" fill sizes="(max-width: 639px) calc(100vw - 56px), 364px" />
            </span>
            <span className="product-howto__step-shade" aria-hidden="true" />
            <i aria-hidden="true">{index + 1}</i>
            <span className="product-howto__step-copy"><h3>{title}</h3><p>{body}</p></span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
