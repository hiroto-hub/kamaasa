import {FeaturedProductsHome} from "@/components/featured-products-home";
import {setRequestLocale} from "next-intl/server";

export default async function FeaturedProductsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <FeaturedProductsHome locale={locale} />;
}
