import React from "react";
import { getProductsByPage, getProductsList } from "@/api/products";
import { ProductList } from "@/components/organisms/ProductList";

export async function generateStaticParams() {
	const products = await getProductsList();

	const numOfPages = Math.ceil(products.data.length / 20);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function ProductsPage({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	params,
}: {
	params: { pageNumber: string };
}) {
	const take = 10;
	const skip = (Number(params.pageNumber) - 1) * take;
	const products = await getProductsByPage(take, skip);

	return (
		<>
			<ProductList products={products} />;
		</>
	);
}
