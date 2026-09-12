import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {type FeaturedProductStory, type LocalizedCopy} from "@/data/featured-product-stories";
import {Reveal} from "./reveal";
import {SocialShare} from "./social-share";
import {StoryProgress} from "./story-progress";
import {LanguagePill} from "./site-header";

type ProductAssets = {
  hero: string;
  detail: string;
  specBackground: string;
  movieBackgrounds: string[];
  relatedItems: string[];
  relatedBackground?: string;
};

const assetsBySlug: Record<string, ProductAssets> = {
  "knife-friendly-black-cutting-board": {
    hero: "/images/kamaasa/generated/v2/board-use.jpg",
    detail: "/images/kamaasa/generated/v2/board-detail.jpg",
    specBackground: "/images/kamaasa/generated/v4/spec-board-texture.png",
    movieBackgrounds: [],
    relatedItems: [
      "/images/kamaasa/generated/v3/amane-petty.png",
      "/images/kamaasa/generated/v3/amane-gyuto.png",
      "/images/kamaasa/generated/v3/amane-santoku.png"
    ],
    relatedBackground: "/images/kamaasa/generated/v4/board-related-background-v1.png"
  },
  "hammered-iron-frying-pan-26cm": {
    hero: "/images/kamaasa/generated/v2/frying-pan-use.jpg",
    detail: "/images/kamaasa/generated/v2/frying-pan-detail.jpg",
    specBackground: "/images/kamaasa/generated/v4/spec-frying-pan-texture.png",
    movieBackgrounds: ["/images/kamaasa/generated/v3/movie-frying-fire.png"],
    relatedItems: [
      "/images/kamaasa/generated/v3/frying-20.png",
      "/images/kamaasa/generated/v3/frying-lid.png",
      "/images/kamaasa/generated/v3/frying-double.png"
    ],
    relatedBackground: "/images/kamaasa/generated/v4/frying-related-background-v1.png"
  },
  "yamada-hammered-carbon-steel-wok": {
    hero: "/images/kamaasa/generated/v2/wok-use.jpg",
    detail: "/images/kamaasa/generated/v2/wok-detail.jpg",
    specBackground: "/images/kamaasa/generated/v4/spec-wok-texture.png",
    movieBackgrounds: [
      "/images/kamaasa/generated/v3/movie-wok-fried-rice.png",
      "/images/kamaasa/generated/v3/movie-wok-care.png"
    ],
    relatedItems: [
      "/images/kamaasa/generated/v3/wok-round.png",
      "/images/kamaasa/generated/v3/wok-flat.png"
    ],
    relatedBackground: "/images/kamaasa/generated/v4/wok-related-background-v1.png"
  },
  "brass-handle-copper-egg-roll-pan": {
    hero: "/images/kamaasa/generated/v2/egg-pan-use.jpg",
    detail: "/images/kamaasa/generated/v2/egg-pan-detail.jpg",
    specBackground: "/images/kamaasa/generated/v4/spec-egg-pan-texture.png",
    movieBackgrounds: [
      "/images/kamaasa/generated/v3/movie-egg-roll.png",
      "/images/kamaasa/generated/v3/movie-egg-bento.png"
    ],
    relatedItems: [
      "/images/kamaasa/generated/v3/egg-kansai.png",
      "/images/kamaasa/generated/v3/egg-kanto.png",
      "/images/kamaasa/generated/v3/egg-lid.png"
    ],
    relatedBackground: "/images/kamaasa/generated/v4/egg-related-background-v1.png"
  },
  "cast-iron-rice-cooking-pot": {
    hero: "/images/kamaasa/generated/v2/rice-pot-use.jpg",
    detail: "/images/kamaasa/generated/v2/rice-pot-detail.jpg",
    specBackground: "/images/kamaasa/generated/v4/spec-rice-pot-texture.png",
    movieBackgrounds: [
      "/images/kamaasa/generated/v3/movie-rice-steam.png",
      "/images/kamaasa/generated/v3/movie-rice-care.png"
    ],
    relatedItems: [
      "/images/kamaasa/generated/v3/rice-ohitsu.png",
      "/images/kamaasa/generated/v3/rice-hangiri.png",
      "/images/kamaasa/generated/v3/rice-paddle.png"
    ],
    relatedBackground: "/images/kamaasa/generated/v4/rice-related-background-v1.png"
  }
};

const cleanHeading = (value: string) => value
  .replace(/[、，]/g, " ")
  .replace(/[。．.!！?？]+$/g, "")
  .replace(/\s+/g, " ")
  .trim();

const japaneseHeadingStyle = (value: string, max = 36) => {
  const units = Array.from(value).reduce((total, character) => {
    if (/\s/.test(character)) return total + 0.35;
    if (/[\x00-\xff]/.test(character)) return total + 0.55;
    return total + 1;
  }, 0);

  return {
    fontSize: `${Math.min(max, Math.max(20, 334 / Math.max(units, 1))).toFixed(1)}px`,
    whiteSpace: "nowrap" as const
  };
};

export function FeaturedProductStoryView({locale, story}: {locale: string; story: FeaturedProductStory}) {
  const language: keyof LocalizedCopy = locale === "ja" ? "ja" : "en";
  const assets = assetsBySlug[story.slug] ?? {hero: story.image, detail: story.image, specBackground: story.image, movieBackgrounds: [], relatedItems: []};
  const hero = story.pages[0];
  const videos = story.pages.filter((page) => page.videoId);
  const editorialPages = story.pages.filter((page, index) => index > 0 && !page.videoId && !page.related && !page.specs);
  const detail = editorialPages[0];
  const secondary = editorialPages.slice(1, 3);
  const specification = story.pages.find((page) => page.specs);
  const related = story.pages.find((page) => page.related);
  const relatedTitle = cleanHeading(related?.title[language] ?? (language === "ja" ? "次の道具を選ぶ" : "Choose your next tool"));

  return (
    <article className="product-editorial" lang={language}>
      <Link href="/" locale={locale} className="product-editorial__back" aria-label={language === "ja" ? "商品一覧へ戻る" : "Back to products"}>
        <span aria-hidden="true">←</span><span>{language === "ja" ? "商品一覧" : "TOOLS"}</span>
      </Link>
      <StoryProgress />
      <div className="product-language">
        <LanguagePill />
      </div>

      <section className="product-editorial__scene product-editorial__hero">
        <Image src={assets.hero} alt="" fill priority sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
        <div className="product-editorial__shade product-editorial__shade--bottom" />
        <Reveal className="product-editorial__copy product-editorial__copy--bottom product-editorial__copy--light">
          <p>{hero.kicker[language]}</p>
          <h1 style={language === "ja" ? japaneseHeadingStyle(cleanHeading(story.title.ja), 38) : undefined}>{cleanHeading(story.title[language])}</h1>
          <span>{hero.body[language]}</span>
        </Reveal>
        <span className="product-editorial__scroll">SCROLL&nbsp;&nbsp;↓</span>
      </section>

      {videos.map((page, index) => (
        <section key={page.videoId} className="product-editorial__movie">
          {assets.movieBackgrounds[index] && (
            <Image src={assets.movieBackgrounds[index]} alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="product-editorial__movie-background object-cover object-center" />
          )}
          <span className="product-editorial__movie-wash" aria-hidden="true" />
          <span className="product-editorial__movie-orbit" aria-hidden="true" />
          <Reveal className="product-editorial__movie-copy">
            <p>{page.kicker[language]}</p>
            <h2 style={language === "ja" ? japaneseHeadingStyle(cleanHeading(page.title.ja), 32) : undefined}>{cleanHeading(page.title[language])}</h2>
            <span>{page.body[language]}</span>
          </Reveal>
          <Reveal
            delay={170}
            className={`product-editorial__video ${story.slug === "brass-handle-copper-egg-roll-pan" && index === 1 ? "product-editorial__video--portrait" : ""}`}
          >
            <video
              src={`/videos/${page.videoId}.mp4`}
              aria-label={page.videoTitle?.[language] ?? page.title[language]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <span className="product-editorial__playing"><i aria-hidden="true" />AUTOPLAY FILM</span>
          </Reveal>
        </section>
      ))}

      {detail && (
        <section className="product-editorial__scene product-editorial__detail">
          <Image src={assets.detail} alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
          <div className="product-editorial__shade product-editorial__shade--top" />
          <Reveal className="product-editorial__copy product-editorial__copy--top">
            <p>{detail.kicker[language]}</p>
            <h2 style={language === "ja" ? japaneseHeadingStyle(cleanHeading(detail.title.ja), 34) : undefined}>{cleanHeading(detail.title[language])}</h2>
            <span>{detail.body[language]}</span>
          </Reveal>
        </section>
      )}

      {secondary.length > 0 && (
        <section className="product-editorial__scene product-editorial__points">
          <Image src={story.image} alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="object-cover object-center" />
          <div className="product-editorial__shade product-editorial__shade--top-strong" />
          <div className="product-editorial__point-list">
            {secondary.map((page, index) => (
              <Reveal key={page.kicker.en} delay={index * 150} className="product-editorial__point-item">
                <em>{String(index + 2).padStart(2, "0")}</em>
                <h2>{cleanHeading(page.title[language])}</h2>
                <p>{page.body[language]}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {specification?.specs && (
        <section className="product-editorial__spec">
          <Image src={assets.specBackground} alt="" fill sizes="(max-width: 639px) 100vw, 640px" className="product-editorial__spec-background object-cover object-center" />
          <span className="product-editorial__spec-wash" aria-hidden="true" />
          <span className="product-editorial__spec-mark" aria-hidden="true" />
          <Reveal>
            <p>{specification.kicker[language]}</p>
            <h2>{cleanHeading(specification.title[language])}</h2>
            <span>{specification.body[language]}</span>
          </Reveal>
          <Reveal delay={180} className="product-editorial__spec-list">
            <dl>
            {specification.specs.map((item) => (
              <div key={item.label.en}><dt>{item.label[language]}</dt><dd>{item.value[language]}</dd></div>
            ))}
            </dl>
          </Reveal>
        </section>
      )}

      <section className="product-editorial__related">
        {assets.relatedBackground && (
          <>
            <Image
              src={assets.relatedBackground}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, 640px"
              className="product-editorial__related-background object-cover object-center"
            />
            <div className="product-editorial__related-wash" />
          </>
        )}
        <Reveal className="product-editorial__related-intro">
          <p>{related?.kicker[language] ?? (language === "ja" ? "関連商品" : "RELATED PRODUCTS")}</p>
          <h2 style={language === "ja" ? japaneseHeadingStyle(relatedTitle, 34) : undefined}>{relatedTitle}</h2>
          {related && <span>{related.body[language]}</span>}
        </Reveal>

        <div className={`product-editorial__related-grid product-editorial__related-grid--${story.relatedProducts.length}`}>
          {story.relatedProducts.map((product, index) => (
            <Reveal key={product.href} delay={120 + index * 110} className="product-editorial__related-item">
              <a href={product.href} hrefLang="en-US">
                <span className="product-editorial__related-image">
                  <Image src={assets.relatedItems[index] ?? product.image} alt="" fill sizes="(max-width: 639px) 31vw, 190px" className="object-cover object-center" />
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </span>
                <span className="product-editorial__related-name"><strong>{product.name[language]}</strong><i aria-hidden="true">↗</i></span>
              </a>
            </Reveal>
          ))}
        </div>

        <SocialShare locale={locale} title={story.title[language]} />
      </section>
    </article>
  );
}
