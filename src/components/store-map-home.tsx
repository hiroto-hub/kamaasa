"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {ImageWithFallback} from "./image-with-fallback";

export interface MapProduct {
  id: string;
  slug: string;
  name: string;
  image?: string;
  /** 地図面に対する 0〜100 の相対座標。ピンの先端が指す位置 */
  x: number;
  y: number;
}

/** ピン先端からの見た目サイズ。座標計算とスタイルで共有する */
const PIN_WIDTH = 84;
const PIN_HEIGHT = 96;

function ProductPin({
  product,
  active
}: {
  product: MapProduct;
  active: boolean;
}) {
  return (
    <span
      className={`relative block transition-transform duration-300 ${
        active ? "scale-110" : ""
      }`}
      style={{width: PIN_WIDTH, height: PIN_HEIGHT}}
    >
      <svg
        viewBox="0 0 84 96"
        className="absolute inset-0 h-full w-full drop-shadow-[0_2px_3px_rgb(20_20_15_/_0.25)]"
        aria-hidden="true"
      >
        <path
          d="M42 93C28 72 9 59 9 37a33 33 0 1 1 66 0c0 22-19 35-33 56Z"
          fill={active ? "#a47c36" : "#ffffff"}
          stroke={active ? "#a47c36" : "#242424"}
          strokeWidth="2"
        />
      </svg>
      <span
        className={`absolute left-1/2 top-[10px] h-[56px] w-[56px] -translate-x-1/2 overflow-hidden rounded-full border-2 ${
          active ? "border-white bg-white" : "border-black/70 bg-white"
        }`}
      >
        {product.image ? (
          <ImageWithFallback
            src={product.image}
            alt=""
            width={68}
            height={68}
            sizes="56px"
            className="h-full w-full"
            imageClassName="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[24px] font-semibold tracking-normal text-ink">
            {product.name.slice(0, 1)}
          </span>
        )}
      </span>
    </span>
  );
}

export function StoreMapHome({
  products,
  locale
}: {
  products: MapProduct[];
  locale: string;
}) {
  const t = useTranslations("StoreMap");
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      aria-label={t("title")}
      className="relative h-svh min-h-[600px] overflow-hidden bg-kinari"
    >
      {/* 写実的な俯瞰マップ。ピンは画像に焼き込まず、既存UIを重ねる。 */}
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src="/images/kamaasa/store-map-portrait.png"
          alt={t("title")}
          fill
          priority
          sizes="(max-width: 639px) 100vw, 420px"
          className="absolute inset-0"
          imageClassName="object-cover object-center"
        />

        {/* 商品ピン */}
        <div aria-label={t("productsLabel")} role="group">
          {products.map((product) => {
            const active = product.id === selectedId;
            return (
              <button
                key={product.id}
                type="button"
                aria-label={`${t("openProduct")}: ${product.name}`}
                aria-pressed={active}
                onClick={() => {
                  // ピンを朱に灯してから、ものがたり画面へ遷移する
                  setSelectedId(product.id);
                  if (product.slug === "amane-santoku") {
                    router.push(`/products/${product.slug}`, {locale});
                  }
                }}
                className={`absolute flex flex-col items-center ${
                  active ? "z-20" : "z-10"
                }`}
                style={{
                  left: `${product.x}%`,
                  top: `${product.y}%`,
                  transform: `translate(-50%, -${PIN_HEIGHT}px)`
                }}
              >
                <ProductPin product={product} active={active} />
                <span
                  className={`mt-1 whitespace-nowrap border px-3 py-2 text-[12px] font-semibold tracking-[0.04em] shadow-[0_2px_8px_rgb(20_20_15_/_0.18)] ${
                    active
                      ? "border-[#a47c36] bg-[#a47c36] text-white"
                      : "border-black/70 bg-white text-ink"
                  }`}
                >
                  {product.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
