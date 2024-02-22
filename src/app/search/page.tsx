import { getProductsBySearchInput } from "@/api/products";
import { ProductList } from "@/components/organisms/ProductList";

export default async function SearchResultPage({
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) {
	const query = searchParams.query || "";
	const products = await getProductsBySearchInput(query);

	return (
		<section className="mx-auto min-h-screen max-w-7xl">
			<h1 className="pb-20 text-4xl font-extrabold first-letter:uppercase">
				Search Results
			</h1>
			{products.length === 0 ? (
				<p className="pb-20 text-2xl font-extrabold first-letter:uppercase">
					No results found
				</p>
			) : (
				<ProductList products={products} />
			)}
		</section>
	);
}
