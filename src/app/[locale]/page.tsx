import {StoreMapHome, type MapProduct} from "@/components/store-map-home";
import {setRequestLocale} from "next-intl/server";

/**
 * ピンの座標（地図面に対する 0〜100）。棚の縦アイルに沿わせる。
 * 参考画像の 6 ピンの構図に合わせている。
 */
const mapProducts: MapProduct[] = [
  {id: "amane", slug: "amane-santoku", name: "amane Santoku", image: "/images/kamaasa/amane/amane-santoku.jpg", x: 28, y: 25},
  {id: "cutting-board", slug: "", name: "Cutting Board", x: 68, y: 25},
  {id: "frying-pan", slug: "", name: "Iron Frying Pan", x: 28, y: 46},
  {id: "rice-pot", slug: "", name: "Rice Cooking Pot", x: 69, y: 46},
  {id: "charcoal-grill", slug: "", name: "Charcoal Grill", x: 28, y: 68},
  {id: "steamer", slug: "", name: "Chinese Steamer", x: 69, y: 68}
];

export default async function MapHomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    // ヘッダー(64px)は layout 側。マップ区画が残りの高さを全て使う
    <main className="bg-kinari">
      <StoreMapHome locale={locale} products={mapProducts} />
    </main>
  );
}
