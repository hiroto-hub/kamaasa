"use client";

import {useEffect, useRef, type CSSProperties} from "react";

/**
 * スクロールで画面に入るたび .is-revealed を付け直す。
 * 動き自体は globals.css の .reveal が持つ（ゆっくり下から立ち上がる）。
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  style
}: {
  children: React.ReactNode;
  /** 連続する要素を少しずつ遅らせるための ms */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          element.classList.add("is-revealed");
        } else if (!entry.isIntersecting) {
          element.classList.remove("is-revealed");
        }
      },
      {threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px"}
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{...style, ...(delay ? {transitionDelay: `${delay}ms`} : {})}}
    >
      {children}
    </div>
  );
}
