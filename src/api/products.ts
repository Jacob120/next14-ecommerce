import { executeGraphql } from "@/api/graphqlApi";

import {
	ProductGetByIdDocument,
	type ProductListItemFragmentFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetByCollectionIdDocument,
	ProductsGetBySearchInputDocument,
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
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {},
		next: {
			revalidate: 60,
		},
	});

	return graphqlResponse.products;
};

export const getProductById = async (
	productId: ProductListItemFragmentFragment["id"],
) => {
	const product = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});

	if (!product.product) {
		return;
	}

	return product;
};

export const getProductsByPage = async (
	take: number,
	skip: number,
) => {
	const products = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			take,
			skip,
		},
	});

	return products.products.data;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
) => {
	const categories = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
		},
	});

	const products = categories.category?.products;

	return products;
};

export const getProductsByCollectionId = async (
	collectionId: string,
) => {
	const products = await executeGraphql({
		query: ProductsGetByCollectionIdDocument,
		variables: {
			collectionId: collectionId,
		},
	});

	return products.collection?.products;
};

export const getProductsBySearchInput = async (
	searchInput: string,
) => {
	const products = await executeGraphql({
		query: ProductsGetBySearchInputDocument,
		variables: {
			slug: searchInput,
		},
	});

	return products.products.data;
};
