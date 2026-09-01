import type {Metadata} from "next";
import {headers} from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "127.0.0.1:3011";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("127.0.0.1") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og-featured.png`;
  const description = "釜浅商店の選び抜かれた道具と、その背景をたどるモバイルストーリーガイド";

  return {
    title: "KAMA-ASA Story Guide",
    description,
    openGraph: {
      title: "KAMA-ASA Story Guide",
      description,
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: "KAMA-ASA Story Guide",
      description,
      images: [ogImage]
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
