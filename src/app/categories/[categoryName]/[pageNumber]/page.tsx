import { notFound } from "next/navigation";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export default async function CategoryPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategorySlug(params.category);

	if (!products) {
		return notFound();
	}

	return (
		<section className="mx-auto min-h-screen max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
