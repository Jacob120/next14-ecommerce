import { type Metadata } from "next/types";
import { notFound } from "next/navigation";
import { ProductGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { SuggestedProductsList } from "@/components/organisms/SuggestedProducts";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `${product.name} - E-commerce Site`,
			images: [
				{
					url: product.images[0]?.url ?? "",
					alt: product.images[0]?.alt,
				},
			],
		},
	};
};

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: params.productId,
	});

	if (!product) {
		notFound();
	}

	return (
		<div>
			{" "}
			<h1 className="flex-auto text-3xl font-bold tracking-tight text-slate-900">
				{product.name}
			</h1>
			<div className="max-w-xs">
				<p>{product.description}</p>
			</div>
			<div className="mt-5">
				<h2 className="mx-auto max-w-7xl text-xl font-semibold">
					Related Products
				</h2>
				<SuggestedProductsList />
			</div>
		</div>
	);
}
