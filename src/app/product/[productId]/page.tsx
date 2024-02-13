import { Suspense } from "react";
import { type Metadata } from "next/types";
import { getProductById } from "@/api/products";
import { ProductDescription } from "@/components/atoms/ProductDescription";
import { ProductImage } from "@/components/atoms/ProductImage";
import { SuggestedProductsList } from "@/components/organisms/SuggestedProducts";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product.name} - E-commerce Site`,
		description: product.description,
		openGraph: {
			title: `${product.name} - E-commerce Site`,
			description: product.description || undefined,
			images: [
				{
					url: product.coverImage.src,
					alt: product.coverImage.alt,
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
	const product = await getProductById(params.productId);
	return (
		<div>
			<div className="max-w-xs">
				<h1>{product.name}</h1>
				<ProductImage
					src={product.coverImage.src}
					alt={product.coverImage.alt}
				/>
				<ProductDescription product={product} />
			</div>
			<aside>
				<Suspense>
					<SuggestedProductsList />
				</Suspense>
			</aside>
		</div>
	);
}
