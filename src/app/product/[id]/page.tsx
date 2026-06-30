import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  catalog,
  getProductById,
  getRelatedProducts,
  getReviews,
} from "@/lib/data";
import { ProductDetail } from "@/components/product/product-detail";

export function generateStaticParams() {
  return catalog.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found — MAISON" };
  return {
    title: `${product.name} — MAISON`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const reviews = getReviews(product);
  const related = getRelatedProducts(product, 4);

  return (
    <ProductDetail product={product} reviews={reviews} related={related} />
  );
}
