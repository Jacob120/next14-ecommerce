import { executeGraphql } from "@/api/graphqlApi";

import {
	ProductGetByIdDocument,
	type ProductListItemFragmentFragment,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductsGetByCollectionIdDocument,
	ProductsGetBySearchInputDocument,
	ProductAddReviewDocument,
	type ProductSortBy,
	type SortDirection,
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

export const getProductsList = async (
	orderBy: ProductSortBy,
	order: SortDirection,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			orderBy: orderBy,
			order: order,
		},
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
	orderBy: ProductSortBy,
	order: SortDirection,
) => {
	const products = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			take,
			skip,
			orderBy,
			order,
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

export const productAddReview = async (
	productId: string,
	author: string,
	description: string,
	email: string,
	rating: number,
	title: string,
) => {
	const review = await executeGraphql({
		query: ProductAddReviewDocument,
		variables: {
			productId,
			author,
			description,
			email,
			rating,
			title,
		},
	});

	return review;
};
