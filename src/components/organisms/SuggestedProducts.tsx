import React from "react";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsList } from "@/api/products";

export const SuggestedProductsList = async () => {
	const products = await getProductsList();

	return <ProductList products={products.slice(-4)} />;
};
