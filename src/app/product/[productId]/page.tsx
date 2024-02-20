import { type Metadata } from "next/types";
import { notFound } from "next/navigation";
import { ProductGetByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

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
			<div className="max-w-xs">
				<h1>{product.name}</h1>
				<p>{product.description}</p>
			</div>
		</div>
	);
}
