import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {ProductHowToGuide} from "./how-to-use-guide";
import {KnifeFinder} from "./knife-finder";
import {Reveal} from "./reveal";
import {SocialShare} from "./social-share";
import {StoryProgress} from "./story-progress";

type Language = "ja" | "en";

const copy = {
  ja: {
    back: "商品一覧",
    eyebrow: "KAMA-ASA ORIGINAL",
    title: "amane 三徳 175mm",
    lead: "毎日の料理に、迷わず選べる一本",
    dailyKicker: "FOR EVERYDAY COOKING",
    dailyTitle: "肉も 魚も 野菜も",
    dailyBody: "肉・魚・野菜の下ごしらえを一本で。初めての方にも、毎日使う方にもなじむ三徳包丁です。",
    fitKicker: "IS THIS FOR YOU?",
    fitTitle: "この包丁が合う人",
    fitItems: [
      ["01", "右利きの方", "表裏7対3の刃付けで、右手から扱いやすい設計です"],
      ["02", "普段の料理をする方", "肉・魚・野菜を一本で切りたい方に向いています"],
      ["03", "長く使いたい方", "切れ味が落ちたら研ぎ直しながら育てられます"]
    ],
    detailKicker: "POINT",
    detailTitle: "切れ味と握り心地",
    detailBody: "薄く仕上げたVG10ステンレス鋼が、軽い切れ味を生みます。丸い木柄は手になじみ、長い下ごしらえも快適です。",
    craft: "岐阜県関市の藤竹と共同開発し、一本ずつ仕上げています。",
    careKicker: "CARE",
    careTitle: "研いで 長く使う",
    careBody: "切れ味が落ちたら砥石で研ぎ直せます。使用後は手洗いし、水分をよく拭き取ってください。",
    careNote: "骨・硬い種・冷凍食品には使用しないでください",
    relatedKicker: "RELATED KNIVES",
    relatedTitle: "次の一本を選ぶ",
    relatedBody: "刃の長さや用途から、自分に合うamaneを選べます。",
    store: "公式オンラインストアで見る",
    finder: "自分に合う包丁を探す",
    related: ["amane 牛刀", "amane ペティナイフ", "amane 筋引"]
  },
  en: {
    back: "TOOLS",
    eyebrow: "KAMA-ASA ORIGINAL",
    title: "amane Santoku 175mm",
    lead: "One dependable knife for everyday cooking",
    dailyKicker: "FOR EVERYDAY COOKING",
    dailyTitle: "Meat fish and vegetables",
    dailyBody: "One Santoku for meat, fish and vegetables. Easy to use from your first meal onward.",
    fitKicker: "IS THIS FOR YOU?",
    fitTitle: "Who this knife is for",
    fitItems: [
      ["01", "Right-handed cooks", "A 7:3 edge is shaped for comfortable right-handed use"],
      ["02", "Everyday cooking", "One knife for preparing meat, fish and vegetables"],
      ["03", "Long-term use", "Sharpen the edge as it dulls and keep using it for years"]
    ],
    detailKicker: "POINT",
    detailTitle: "Edge and comfort",
    detailBody: "A thin VG10 stainless edge cuts smoothly. The rounded wood handle stays comfortable through longer preparation.",
    craft: "Developed with Fujitake in Seki, Gifu, and finished one knife at a time.",
    careKicker: "CARE",
    careTitle: "Sharpen and keep",
    careBody: "Sharpen when the edge begins to feel dull. Hand-wash and dry thoroughly after use.",
    careNote: "Do not use on bones, hard seeds or frozen food",
    relatedKicker: "RELATED KNIVES",
    relatedTitle: "Choose your next knife",
    relatedBody: "Choose the amane blade length and shape that fits your cooking.",
    store: "VIEW ON THE OFFICIAL STORE",
    finder: "FIND YOUR KNIFE",
    related: ["amane Chef Knife", "amane Utility Knife", "amane Sujihiki"]
  }
} satisfies Record<Language, Record<string, unknown>>;

const relatedLinks = [
  "https://kama-asa.co.jp/en-us/products/amane-gyuto?country=US",
  "https://kama-asa.co.jp/en-us/products/amane-petli?country=US",
  "https://kama-asa.co.jp/en-us/products/amane-sujihiki?country=US"
];

const relatedImages = [
  "/images/kamaasa/generated/v3/amane-gyuto.png",
  "/images/kamaasa/generated/v3/amane-petty.png",
  "/images/kamaasa/generated/v3/amane-sujihiki.png"
];

export function RichProductStory({locale}: {locale: string}) {
  const language: Language = locale === "ja" ? "ja" : "en";
  const text = copy[language];

  return (
    <article className="amane-story" lang={language}>
      <Link href="/" locale={locale} className="amane-story__back" aria-label={language === "ja" ? "商品一覧へ戻る" : "Back to products"}>
        <span aria-hidden="true">←</span><span>{text.back as string}</span>
      </Link>
      <StoryProgress />

      <section className="amane-scene amane-scene--hero">
        <Image src="/images/kamaasa/generated/v2/amane-daily.jpg" alt="" fill priority sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
        <div className="amane-scene__wash amane-scene__wash--hero" />
        <Reveal className="amane-scene__copy amane-scene__copy--top">
          <p>{text.eyebrow as string}</p>
          <h1>{text.title as string}</h1>
          <span>{text.lead as string}</span>
        </Reveal>
        <span className="amane-story__scroll">SCROLL&nbsp;&nbsp;↓</span>
      </section>

      <section className="amane-scene amane-scene--daily">
        <Image src="/images/kamaasa/generated/v1/amane-santoku.png" alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
        <div className="amane-scene__wash amane-scene__wash--bottom" />
        <Reveal className="amane-scene__copy amane-scene__copy--bottom amane-scene__copy--light">
          <p>{text.dailyKicker as string}</p>
          <h2>{text.dailyTitle as string}</h2>
          <span>{text.dailyBody as string}</span>
        </Reveal>
      </section>

      <ProductHowToGuide locale={locale} slug="amane" />

      <section className="amane-fit">
        <Image src="/images/kamaasa/generated/v3/amane-fit-everyday-cook.png" alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="amane-fit__background object-cover object-center" />
        <div className="amane-fit__wash" />
        <Reveal className="amane-fit__heading">
          <p>{text.fitKicker as string}</p>
          <h2>{text.fitTitle as string}</h2>
        </Reveal>
        <div className="amane-fit__list">
          {(text.fitItems as string[][]).map(([number, title, body], index) => (
            <Reveal key={number} delay={120 + index * 120} className="amane-fit__item">
              <span>{number}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="amane-scene amane-scene--detail">
        <Image src="/images/kamaasa/generated/v2/amane-detail.jpg" alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
        <div className="amane-scene__wash amane-scene__wash--top" />
        <Reveal className="amane-scene__copy amane-scene__copy--top">
          <p>{text.detailKicker as string}</p>
          <h2>{text.detailTitle as string}</h2>
          <span>{text.detailBody as string}</span>
          <small>{text.craft as string}</small>
        </Reveal>
      </section>

      <section className="amane-scene amane-scene--care">
        <Image src="/images/kamaasa/generated/v2/amane-care.jpg" alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
        <div className="amane-scene__wash amane-scene__wash--top" />
        <Reveal className="amane-scene__copy amane-scene__copy--top">
          <p>{text.careKicker as string}</p>
          <h2>{text.careTitle as string}</h2>
          <span>{text.careBody as string}</span>
          <small>{text.careNote as string}</small>
        </Reveal>
      </section>

      <section className="amane-related">
        <Image
          src="/images/kamaasa/generated/v4/amane-related-background-v1.png"
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, 640px"
          className="product-editorial__related-background object-cover object-center"
        />
        <div className="product-editorial__related-wash" />
        <Reveal className="amane-related__intro">
          <p className="amane-related__kicker">{text.relatedKicker as string}</p>
          <h2 style={language === "ja" ? {whiteSpace: "nowrap"} : undefined}>{text.relatedTitle as string}</h2>
          <p className="amane-related__body">{text.relatedBody as string}</p>
        </Reveal>

        <div className="product-editorial__related-grid product-editorial__related-grid--3">
          {(text.related as string[]).map((name, index) => (
            <Reveal key={name} delay={120 + index * 110} className="product-editorial__related-item">
              <a href={relatedLinks[index]} hrefLang="en-US">
                <span className="product-editorial__related-image">
                  <Image src={relatedImages[index]} alt="" fill sizes="(max-width: 639px) 31vw, 190px" className="object-cover object-center" />
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </span>
                <span className="product-editorial__related-name"><strong>{name}</strong><i aria-hidden="true">↗</i></span>
              </a>
            </Reveal>
          ))}
        </div>

        <SocialShare locale={locale} title={text.title as string} />
        <KnifeFinder locale={locale} />
      </section>
    </article>
  );
}
