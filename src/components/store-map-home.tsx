"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {ImageWithFallback} from "./image-with-fallback";
import {LanguagePill} from "./site-header";

export interface MapProduct {
  id: string;
  slug: string;
  name: string;
  image?: string;
  /** 地図面に対する 0〜100 の相対座標。ピンの先端が指す位置 */
  x: number;
  y: number;
}

/** 最初のデザイン案に合わせた、建築図面の注釈のような小さな丸型マーカー */
const PIN_SIZE = 36;
const PIN_IMAGE_SIZE = PIN_SIZE - 3;
const PIN_LINE_LENGTH = 16;

function ProductPin({
  product,
  active,
  number
}: {
  product: MapProduct;
  active: boolean;
  number: number;
}) {
  return (
    <span
      className="relative block"
      style={{width: PIN_SIZE, height: PIN_SIZE + 19}}
    >
      <span
        className={`relative flex items-center justify-center rounded-full border-[0.75px] border-[#171717] bg-[#f7f5ef] text-[12px] font-medium leading-none transition-[box-shadow,transform] duration-300 ${
          active
            ? "scale-105 shadow-[0_0_0_1.5px_#a5823d,0_3px_9px_rgb(0_0_0_/_0.26)]"
            : "shadow-[0_2px_6px_rgb(0_0_0_/_0.24)]"
        }`}
        style={{width: PIN_SIZE, height: PIN_SIZE}}
      >
        {product.image ? (
          <span
            className="overflow-hidden rounded-full bg-[#f7f5ef] ring-[0.5px] ring-black/10"
            style={{width: PIN_IMAGE_SIZE, height: PIN_IMAGE_SIZE}}
          >
            <ImageWithFallback
              src={product.image}
              alt=""
              width={PIN_IMAGE_SIZE}
              height={PIN_IMAGE_SIZE}
              sizes={`${PIN_IMAGE_SIZE}px`}
              className="h-full w-full"
              imageClassName="h-full w-full object-contain"
            />
          </span>
        ) : (
          number
        )}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 w-[0.5px] -translate-x-1/2 bg-[#171717] shadow-[0_0_1px_rgb(255_255_255_/_0.45)]"
        style={{top: PIN_SIZE, height: PIN_LINE_LENGTH}}
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#171717] shadow-[0_0_1px_rgb(255_255_255_/_0.45)]"
        style={{top: PIN_SIZE + PIN_LINE_LENGTH}}
      />
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
  const [selectedId, setSelectedId] = useState<string | null>(
    products[0]?.id ?? null
  );

  return (
    <section
      aria-label={t("title")}
      className="relative h-svh min-h-[600px] overflow-hidden bg-kinari"
    >
      {/* 写実的な俯瞰マップ。ピンは画像に焼き込まず、既存UIを重ねる。 */}
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src="/images/kamaasa/store-map-portrait-v2.png"
          alt={t("title")}
          fill
          priority
          sizes="(max-width: 639px) 100vw, 420px"
          className="absolute inset-0"
          imageClassName="object-cover object-center"
        />

        {/* 商品ピン */}
        <div aria-label={t("productsLabel")} role="group">
          {products.map((product, index) => {
            const active = product.id === selectedId;
            return (
              <button
                key={product.id}
                type="button"
                aria-label={`${t("openProduct")}: ${product.name}`}
                aria-pressed={active}
                onClick={() => {
                  // 選択したマーカーを真鍮色にしてから、ものがたり画面へ遷移する
                  setSelectedId(product.id);
                  if (product.slug === "amane-santoku") {
                    router.push(`/products/${product.slug}`, {locale});
                  }
                }}
                className={`absolute flex touch-manipulation flex-col items-center transition-[filter] duration-150 ease-out active:brightness-[0.78] ${
                  active ? "z-20" : "z-10"
                }`}
                style={{
                  left: `${product.x}%`,
                  top: `${product.y}%`,
                  transform: "translate(-50%, -100%)"
                }}
              >
                <ProductPin
                  product={product}
                  active={active}
                  number={index + 1}
                />
                <span
                  className={`absolute bottom-[calc(100%+7px)] left-1/2 grid min-h-[34px] w-[116px] -translate-x-1/2 grid-cols-[28px_1fr] overflow-hidden border text-left shadow-[0_2px_7px_rgb(0_0_0_/_0.14)] backdrop-blur-sm transition-colors duration-300 ${
                    active
                      ? "border-[#171717] bg-[#171717]/95 text-white"
                      : "border-black/35 bg-[#f7f5ef]/95 text-[#171717]"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center border-r text-[8px] font-medium tracking-[0.08em] ${
                      active
                        ? "border-white/20 text-[#d4b16b]"
                        : "border-black/15 text-[#8c6b2e]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center px-2 py-1.5 text-[9px] font-medium leading-[1.25] tracking-[0.015em]">
                    {product.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute right-3 top-3 z-30 rounded-full bg-white/90 shadow-[0_2px_12px_rgb(0_0_0_/_0.16)] backdrop-blur-sm">
        <LanguagePill />
      </div>

    </section>
  );
}
