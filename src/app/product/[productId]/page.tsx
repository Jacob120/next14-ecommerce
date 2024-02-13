import { type Metadata } from "next/types";
import { getProductById } from "@/api/products";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `${product.name} - E-commerce Site`,
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
				<p>{product.description}</p>
				{/* <ProductImage
					src={product.coverImage.src}
					alt={product.coverImage.alt}
				/> */}
				{/* <ProductDescription product={product} /> */}
			</div>
			{/* <aside>
				<Suspense>
					<SuggestedProductsList />
				</Suspense>
			</aside> */}
		</div>
	);
}
