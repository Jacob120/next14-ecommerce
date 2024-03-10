import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { getCategoryByName } from "@/api/categories";

export const generateMetadata = async ({
	params,
}: {
	params: { categoryName: string };
}): Promise<Metadata> => {
	const category = await getCategoryByName(params.categoryName);

	if (!category) {
		notFound();
	}

	return {
		title: category.name,
		description: category.description,
		openGraph: {
			title: `${category.name} `,
		},
	};
};

export default async function CategoryPage({
	params,
}: {
	params: { categoryName: string; pageNumber: string };
}) {
	const category = await getCategoryByName(params.categoryName);
	const products = await getProductsByCategorySlug(
		params.categoryName,
	);

	if (!products || !category) {
		return notFound();
	}

	const numOfPages = Math.ceil(products.length / 20);

	return (
		<>
			<ProductList products={products} />
			<Pagination
				totalPages={numOfPages}
				currentPage={params.pageNumber}
			/>
		</>
	);
}
