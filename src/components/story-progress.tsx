"use client";

import {useEffect, useRef, useState} from "react";

const formatPage = (page: number) => String(page).padStart(2, "0");

export function StoryProgress() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const article = markerRef.current?.closest("article");
    if (!article) return;

    const pages = Array.from(article.querySelectorAll<HTMLElement>(":scope > section"));
    if (pages.length === 0) return;

    setTotalPages(pages.length);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const pageIndex = pages.indexOf(visible.target as HTMLElement);
        if (pageIndex >= 0) setCurrentPage(pageIndex + 1);
      },
      {root: article, threshold: [0.35, 0.55, 0.75]}
    );

    pages.forEach((page) => observer.observe(page));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={markerRef} className="story-progress" aria-label={`${currentPage} / ${totalPages}`} aria-live="polite">
      <span>{formatPage(currentPage)}</span>
      <i aria-hidden="true">/</i>
      <span>{formatPage(totalPages)}</span>
    </div>
  );
}
