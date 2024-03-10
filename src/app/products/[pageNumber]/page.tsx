import React from "react";
import { getProductsByPage, getProductsList } from "@/api/products";
// import { ProductList } from "@/components/organisms/ProductList";
import {
	type ProductSortBy,
	type SortDirection,
} from "@/gql/graphql";
import { ProductList } from "@/components/organisms/ProductList";

// export async function generateStaticParams() {
// 	const orderBy = "DEFAULT";
// 	const orderDirection = "ASC";
// 	const products = await getProductsList(orderBy, orderDirection);

// 	const numOfPages = Math.ceil(products.data.length / 20);
// 	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
// 	return pages.map((page) => ({ params: { page: page.toString() } }));
// }

const PRODUCTS_PER_PAGE = 8;

const countPages = (length: number) =>
	Math.ceil(length / PRODUCTS_PER_PAGE);

export async function generateStaticParams() {
	const orderBy = "DEFAULT";
	const orderDirection = "ASC";
	const products = await getProductsList(orderBy, orderDirection);
	const pagesCount = countPages(products.data.length);

	return Array.from(Array(pagesCount)).map((_, idx) => ({
		pageNumber: `${idx + 1}`,
	}));
}

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: {
		pageNumber: string;
	};
	searchParams: {
		orderBy: ProductSortBy;
		orderDirection: SortDirection;
	};
}) {
	const take = 10;
	const skip = (Number(params.pageNumber) - 1) * take;

	const orderBy = searchParams.orderBy || "DEFAULT";
	const orderDirection = searchParams.orderDirection || "ASC";
	const products = await getProductsByPage(
		take,
		skip,
		orderBy,
		orderDirection,
	);

	return (
		<>
			<ProductList products={products} />;{" "}
		</>
	);
}
