"use client";

import {useLocale, useTranslations} from "next-intl";
import {usePathname, Link} from "@/i18n/navigation";
import type {Locale} from "@/types/content";
import {Chevron, SealDot} from "./glyphs";

const languageOptions: {locale: Locale; label: string; short: string}[] = [
  {locale: "ja", label: "日本語", short: "JA"},
  {locale: "en", label: "English", short: "EN"},
  {locale: "zh-CN", label: "简体中文", short: "CN"},
  {locale: "zh-TW", label: "繁體中文", short: "TW"},
  {locale: "ko", label: "한국어", short: "KO"},
  {locale: "fr", label: "Français", short: "FR"}
];

/**
 * 言語選択画面の代わりに置く切替ピル。
 * 「🌐 日本語 ▼」を押すとその場でドロップダウンが開き、
 * 現在のページのまま locale だけ差し替える。
 */
export function LanguagePill() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const current =
    languageOptions.find((option) => option.locale === locale) ??
    languageOptions[0];

  return (
    <details className="language-pill relative">
      <summary
        aria-label={t("changeLanguage")}
        className="flex items-center gap-1.5 rounded-full border border-rule-strong bg-washi text-ink"
      >
        <span>
          {current.short}
        </span>
        <Chevron size={8} direction="down" />
      </summary>

      <ul
        aria-label={t("changeLanguage")}
        className="language-pill__menu absolute right-0 top-[calc(100%+8px)] z-50 w-[168px] border border-rule-strong bg-washi py-1 shadow-[0_10px_28px_rgb(20_20_15_/_0.16)]"
      >
        {languageOptions.map((option) => {
          const selected = option.locale === locale;
          return (
            <li key={option.locale}>
              <Link
                href={pathname}
                locale={option.locale}
                hrefLang={option.locale}
                aria-current={selected ? "page" : undefined}
                className="flex min-h-11 w-full items-center gap-2.5 px-4 text-left"
              >
                <span className="w-[5px] flex-none">
                  {selected && <SealDot />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mincho block text-[13px] tracking-jp-tight text-ink">
                    {option.label}
                  </span>
                </span>
                <span className="text-[8px] uppercase tracking-latin text-muted">
                  {option.short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

/**
 * 2画面共通のヘッダー。左に筆書きの「かたりべ」ロゴ（ホームへ戻る）、
 * 右に言語切替ピル。参考画像の構図をそのまま持つ。
 */
export function SiteHeader() {
  const t = useTranslations("Common");

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-kinari">
      <div className="flex h-[64px] items-center justify-between gutter">
        <Link href="/" aria-label={t("brand")} className="block">
          <span className="fude block text-[26px] leading-none text-kogane">
            かたりべ
          </span>
          <span className="mincho mt-1 block text-[8px] uppercase tracking-[0.42em] text-kogane/80">
            Kataribe
          </span>
        </Link>
        <LanguagePill />
      </div>
    </header>
  );
}
