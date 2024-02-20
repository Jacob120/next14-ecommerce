import { notFound } from "next/navigation";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export default async function CategoryPage({
	params,
}: {
	params: { categoryName: string; pageNumber: string };
}) {
	console.log(params);
	const products = await getProductsByCategorySlug(
		params.categoryName,
	);

	if (!products) {
		return notFound();
	}

	return (
		<section className="mx-auto min-h-screen max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
