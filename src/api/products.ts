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
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);
	return graphqlResponse.products;
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

	return product;
};

export const getProductsByPage = async (
	take: number,
	skip: number,
) => {
	const products = await executeGraphql(ProductsGetListDocument, {
		take,
		skip,
	});

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

export const getProductsByCollectionId = async (
	collectionId: string,
) => {
	const products = await executeGraphql(
		ProductsGetByCollectionIdDocument,
		{
			collectionId: collectionId,
		},
	);

	return products.collection?.products;
};

export const getProductsBySearchInput = async (
	searchInput: string,
) => {
	const products = await executeGraphql(
		ProductsGetBySearchInputDocument,
		{
			slug: searchInput,
		},
	);

	return products.products.data;
};
