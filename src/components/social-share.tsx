"use client";

import {useEffect, useState} from "react";
import {Share2} from "lucide-react";

export function SocialShare({locale, title}: {locale: string; title: string}) {
  const language = locale === "ja" ? "ja" : "en";
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareFromDevice = async () => {
    if (navigator.share) {
      try {
        await navigator.share({title, url});
        return;
      } catch {
        return;
      }
    }

    await copyUrl();
  };

  const copyUrl = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="social-share">
      <p>{language === "ja" ? "この道具をシェア" : "SHARE THIS TOOL"}</p>
      <div className="social-share__links">
        <a
          className="social-share__button social-share__button--instagram"
          href="https://www.instagram.com/kamaasa_tokyo/"
          target="_blank"
          rel="noreferrer"
          aria-label={language === "ja" ? "釜浅商店の公式Instagramを見る" : "View KAMA-ASA on Instagram"}
        >
          <svg className="social-share__instagram-logo" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.4" cy="6.8" r="1.15" fill="currentColor" />
          </svg>
        </a>
        <a
          className="social-share__button social-share__button--x"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label={language === "ja" ? "Xでシェア" : "Share on X"}
        >
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            <path fill="currentColor" d="M18.2 2h3.4l-7.4 8.5L23 22h-6.9l-5.4-7-6.1 7H1.2l7.9-9L.7 2h7.1l4.8 6.4L18.2 2Zm-1.2 18h1L6.8 3.9H4.9L17 20Z" />
          </svg>
        </a>
        <a
          className="social-share__button social-share__button--line"
          href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          aria-label={language === "ja" ? "LINEでシェア" : "Share on LINE"}
        >
          <svg className="social-share__line-logo" viewBox="0 0 32 32" width="29" height="29" aria-hidden="true">
            <path fill="currentColor" d="M16 4.2c-6.8 0-12.3 4.5-12.3 10.1 0 5 4.4 9.1 10.3 9.9l-.2 2.9c0 .7.8 1.1 1.4.7l4.2-3.2c5.2-1.2 8.9-5.2 8.9-10.3C28.3 8.7 22.8 4.2 16 4.2Z" />
            <text x="16" y="16.7" fill="#06ad4d" fontFamily="Arial, Helvetica, sans-serif" fontSize="7.1" fontWeight="800" textAnchor="middle">LINE</text>
          </svg>
        </a>
        <button
          type="button"
          className="social-share__button social-share__button--native"
          onClick={shareFromDevice}
          aria-label={language === "ja" ? "共有メニューを開く" : "Open share menu"}
        >
          <Share2 size={15} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <span className="social-share__status" aria-live="polite">
        {copied ? (language === "ja" ? "リンクをコピーしました" : "LINK COPIED") : "\u00a0"}
      </span>
    </div>
  );
}
