import { type Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getCollectionByName } from "@/api/collections";
import { getProductsByCollectionId } from "@/api/products";
import { ProductList } from "@/components/organisms/ProductList";

export async function generateMetadata({
	params,
}: {
	params: { collection: string };
}): Promise<Metadata> {
	const collection = await getCollectionByName(params.collection);

	return {
		title: collection?.name,
		openGraph: {
			title: collection?.name,
		},
	};
}

export default async function CollectionPage({
	params,
}: {
	params: { collection: string };
}) {
	const collection = await getCollectionByName(params.collection);

	if (!collection) {
		return notFound();
	}

	const productsInCollection =
		(await getProductsByCollectionId(collection.id)) || [];

	return (
		<main className="mx-auto min-h-screen">
			<div className="w-full bg-gray-100">
				<div className="mx-auto  max-w-7xl">
					<h2 className="mx-auto py-8 text-lg font-semibold">
						{collection.name}
					</h2>
				</div>
			</div>
			<ProductList products={productsInCollection} />
		</main>
	);
}
