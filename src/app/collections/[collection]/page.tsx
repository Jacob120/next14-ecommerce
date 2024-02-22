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
		<main className="mx-auto min-h-screen max-w-7xl">
			<h1
				className="pb-20 text-4xl font-extrabold first-letter:uppercase"
				role="heading"
			>
				{collection.name}
			</h1>
			<ProductList products={productsInCollection} />
		</main>
	);
}
