import {FeaturedProductsHome} from "@/components/featured-products-home";
import {setRequestLocale} from "next-intl/server";

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-[#ede8df]">
      <FeaturedProductsHome locale={locale} />
    </main>
  );
}
