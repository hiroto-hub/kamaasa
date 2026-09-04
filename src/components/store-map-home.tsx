"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {ImageWithFallback} from "./image-with-fallback";
import {LanguagePill} from "./site-header";

export interface MapProduct {
  id: string;
  slug?: string;
  href?: string;
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
  knifeProducts,
  toolProducts,
  locale
}: {
  knifeProducts: MapProduct[];
  toolProducts: MapProduct[];
  locale: string;
}) {
  const t = useTranslations("StoreMap");
  const router = useRouter();
  const [floor, setFloor] = useState<"knives" | "tools">("knives");
  const products = floor === "knives" ? knifeProducts : toolProducts;
  const [selectedId, setSelectedId] = useState<string | null>(
    knifeProducts[0]?.id ?? null
  );
  const isJapanese = locale === "ja";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("floor") !== "tools") return;
    setFloor("tools");
    setSelectedId(toolProducts[0]?.id ?? null);
  }, [toolProducts]);

  const changeFloor = (nextFloor: "knives" | "tools") => {
    const nextProducts = nextFloor === "knives" ? knifeProducts : toolProducts;
    setFloor(nextFloor);
    setSelectedId(nextProducts[0]?.id ?? null);
  };

  return (
    <section
      aria-label={t("title")}
      className="relative h-svh min-h-[600px] overflow-hidden bg-kinari"
      data-floor={floor}
    >
      {/* 写実的な俯瞰マップ。ピンは画像に焼き込まず、既存UIを重ねる。 */}
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src={
            floor === "knives"
              ? "/images/kamaasa/store-map-knives-v2.png"
              : "/images/kamaasa/store-map-cookware-v3.png"
          }
          alt={t("title")}
          fill
          priority
          sizes="(max-width: 639px) 100vw, 420px"
          className="absolute inset-0"
          imageClassName={`object-cover object-center transition-[filter,transform] duration-700 ${floor === "knives" ? "grayscale-[0.42] contrast-[1.06]" : "saturate-[0.82] sepia-[0.08]"}`}
        />

        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-colors duration-500 ${
            floor === "knives"
              ? "bg-[linear-gradient(145deg,rgb(19_24_27_/_0.2),transparent_52%,rgb(15_20_23_/_0.12))]"
              : "bg-[linear-gradient(145deg,rgb(155_120_57_/_0.1),transparent_52%,rgb(92_66_34_/_0.08))]"
          }`}
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
                  setSelectedId(product.id);
                  if (product.slug) {
                    router.push(`/products/${product.slug}?floor=${floor}`, {locale});
                  } else if (product.href) {
                    window.location.assign(product.href);
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
                  className={`absolute bottom-[calc(100%+7px)] left-1/2 grid min-h-[34px] w-[104px] -translate-x-1/2 grid-cols-[25px_1fr] overflow-hidden border text-left shadow-[0_2px_7px_rgb(0_0_0_/_0.14)] backdrop-blur-sm transition-colors duration-300 ${
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

      <div className="absolute left-3 top-3 z-30 flex overflow-hidden rounded-full border border-black/20 bg-white/90 p-1 shadow-[0_3px_16px_rgb(0_0_0_/_0.16)] backdrop-blur-md">
        <button
          type="button"
          aria-pressed={floor === "knives"}
          onClick={() => changeFloor("knives")}
          className={`rounded-full px-4 py-2 text-[9px] font-semibold tracking-[0.13em] transition-colors ${floor === "knives" ? "bg-[#1c2225] text-white" : "text-black/55"}`}
        >
          {isJapanese ? "包丁売場" : "KNIFE SHOP"}
        </button>
        <button
          type="button"
          aria-pressed={floor === "tools"}
          onClick={() => changeFloor("tools")}
          className={`rounded-full px-4 py-2 text-[9px] font-semibold tracking-[0.13em] transition-colors ${floor === "tools" ? "bg-[#8b6b31] text-white" : "text-black/55"}`}
        >
          {isJapanese ? "料理道具売場" : "COOKWARE SHOP"}
        </button>
      </div>

      <div className="absolute right-3 top-3 z-30 rounded-full bg-white/90 shadow-[0_2px_12px_rgb(0_0_0_/_0.16)] backdrop-blur-sm">
        <LanguagePill />
      </div>

      <div className={`pointer-events-none absolute bottom-4 left-4 z-20 max-w-[calc(100%-2rem)] rounded-sm border border-white/65 bg-[#f7f5ef]/90 px-4 py-3 text-[#171717] shadow-[0_4px_18px_rgb(0_0_0_/_0.18)] backdrop-blur-md transition-colors duration-500 ${floor === "knives" ? "border-l-[#30383c]" : "border-l-[#9b7737]"}`}>
        <p className={`text-[9px] font-semibold tracking-[0.24em] ${floor === "knives" ? "text-[#30383c]" : "text-[#8b6b31]"}`}>
          {floor === "knives" ? "KAMA-ASA KNIFE SHOP" : "KAMA-ASA COOKWARE SHOP"}
        </p>
        <p className="mt-1 font-serif text-[20px] tracking-[-0.03em]">
          {floor === "knives"
            ? (isJapanese ? "包丁を選ぶための売場" : "A floor for choosing a knife")
            : (isJapanese ? "料理道具を選ぶための売場" : "A floor for choosing cookware")}
        </p>
      </div>

    </section>
  );
}
