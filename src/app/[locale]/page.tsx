import {StoreMapHome, type MapProduct} from "@/components/store-map-home";
import {setRequestLocale} from "next-intl/server";

/**
 * ピンの座標（地図面に対する 0〜100）。棚の縦アイルに沿わせる。
 * 参考画像の 6 ピンの構図に合わせている。
 */
const mapProducts: MapProduct[] = [
  {
    id: "amane",
    slug: "amane-santoku",
    name: "amane Santoku 175mm",
    image: "/images/kamaasa/amane/amane-santoku.jpg",
    x: 34,
    y: 32
  },
  {
    id: "steamer",
    slug: "",
    name: "Chinese Steamer",
    image: "/images/kamaasa/pins/chinese-steamer-v2.png",
    x: 66,
    y: 32
  },
  {
    id: "frying-pan",
    slug: "",
    name: "Iron Frying Pan",
    image: "/images/kamaasa/pins/iron-frying-pan-v2.png",
    x: 34,
    y: 63
  },
  {
    id: "cutting-board",
    slug: "",
    name: "Cutting Board",
    image: "/images/kamaasa/pins/cutting-board-v2.png",
    x: 66,
    y: 63
  }
];

export default async function MapHomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    // ヘッダーを置かず、マップ区画が画面全体を使う
    <main className="bg-kinari">
      <StoreMapHome locale={locale} products={mapProducts} />
    </main>
  );
}
