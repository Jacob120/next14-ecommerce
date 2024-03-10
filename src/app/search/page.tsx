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
	const products =
		query.length > 1 ? await getProductsBySearchInput(query) : [];

	return (
		<section className="mx-auto min-h-screen ">
			<div className="w-full bg-gray-100">
				<div className="mx-auto  max-w-7xl">
					<h2 className="mx-auto py-8 text-lg font-semibold">
						Search Results
					</h2>
				</div>
			</div>
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
