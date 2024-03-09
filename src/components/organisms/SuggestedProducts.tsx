import React from "react";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

export const SuggestedProductsList = async () => {
	const orderBy = "DEFAULT";
	const orderDirection = "ASC";

	const products = await getProductsList(orderBy, orderDirection);

	// Shuffle the array of products
	const shuffledProducts = (
		products.data as unknown as ProductListItemFragmentFragment[]
	).sort(() => 0.5 - Math.random());

	// Get the first 4 items from the shuffled array
	const selectedProducts = shuffledProducts.slice(0, 4);

	return (
		<aside data-testid="related-products">
			<ProductList products={selectedProducts} />
		</aside>
	);
};
