import { executeGraphql } from "@/api/graphqlApi";

import {
	ProductGetByIdDocument,
	type ProductListItemFragmentFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";

export type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	images: {
		url: string;
		alt: string;
	};
	longDescription: string;
};

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);
	return graphqlResponse.products;
	// return graphqlResponse.products.data.map((product) => ({
	// 	id: product.id,
	// 	name: product.name,
	// 	price: product.price,
	// 	category: product.categories[0]?.name,
	// 	images: {
	// 		url: product.images[0]?.url,
	// 		alt: product.images[0]?.alt,
	// 	},
	// 	description: "",
	// }));
};

export const getProductById = async (
	productId: ProductListItemFragmentFragment["id"],
) => {
	const product = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product.product) {
		return null;
	}

	// const { id, name, description, price, categories, images } =
	// 	product.product;

	return product;
};

export const getProductsByPage = async () => {
	const products = await executeGraphql(ProductsGetListDocument, {});

	return products.products.data;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
) => {
	const categories = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{
			slug: categorySlug,
		},
	);

	const products = categories.category?.products;

	return products;
};
