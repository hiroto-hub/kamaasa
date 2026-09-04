import {StoreMapHome, type MapProduct} from "@/components/store-map-home";
import {setRequestLocale} from "next-intl/server";

export default async function MapHomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const isJapanese = locale === "ja";

  const knifeProducts: MapProduct[] = [
    {
      id: "amane-santoku",
      slug: "amane",
      name: isJapanese ? "amane 三徳 175mm" : "amane Santoku 175mm",
      image: "/images/kamaasa/amane/amane-santoku.jpg",
      x: 34,
      y: 33
    },
    {
      id: "amane-utility",
      href: "https://kama-asa.co.jp/en-us/products/amane-petli",
      name: isJapanese ? "amane ペティナイフ" : "amane Utility Knife",
      image: "/images/kamaasa/related/amane-utility-knife.jpg",
      x: 66,
      y: 33
    },
    {
      id: "amane-chef",
      href: "https://kama-asa.co.jp/en-us/products/amane-gyuto?country=US",
      name: isJapanese ? "amane 牛刀" : "amane Chef Knife",
      image: "/images/kamaasa/related/amane-chef-knife.jpg",
      x: 34,
      y: 64
    },
    {
      id: "amane-sujihiki",
      href: "https://kama-asa.co.jp/en-us/products/amane-sujihiki?country=US",
      name: isJapanese ? "amane 筋引" : "amane Sujihiki",
      image: "/images/kamaasa/related/amane-sujihiki.png",
      x: 66,
      y: 64
    }
  ];

  const toolProducts: MapProduct[] = [
    {
      id: "cutting-board",
      slug: "knife-friendly-black-cutting-board",
      name: isJapanese ? "包丁にやさしいまな板 黒" : "Knife-friendly Black Cutting Board",
      image: "/images/kamaasa/pins/black-cutting-board-white.png",
      x: 34,
      y: 31
    },
    {
      id: "frying-pan",
      slug: "hammered-iron-frying-pan-26cm",
      name: isJapanese ? "釜浅の鉄打出しフライパン" : "Hammered Iron Frying Pan",
      image: "/images/kamaasa/pins/iron-frying-pan-v2.png",
      x: 66,
      y: 30
    },
    {
      id: "wok",
      slug: "yamada-hammered-carbon-steel-wok",
      name: isJapanese ? "打出し中華鍋" : "Hammered Carbon Steel Wok",
      image: "/images/kamaasa/featured/peking-wok-cropped.png",
      x: 34,
      y: 57
    },
    {
      id: "egg-pan",
      slug: "brass-handle-copper-egg-roll-pan",
      name: isJapanese ? "真鍮取手玉子焼器" : "Brass-handle Egg Roll Pan",
      image: "/images/kamaasa/pins/brass-egg-pan-white.png",
      x: 66,
      y: 57
    },
    {
      id: "rice-pot",
      slug: "cast-iron-rice-cooking-pot",
      name: isJapanese ? "釜浅のごはん釜" : "Cast Iron Rice Cooking Pot",
      image: "/images/kamaasa/featured/rice-pot.jpg",
      x: 50,
      y: 77
    }
  ];

  return (
    <main className="bg-kinari">
      <StoreMapHome locale={locale} knifeProducts={knifeProducts} toolProducts={toolProducts} />
    </main>
  );
}
