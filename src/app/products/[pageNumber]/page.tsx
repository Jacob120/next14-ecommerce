import React from "react";
import { getProductsByPage, getProductsList } from "@/api/products";
import { ProductList } from "@/components/organisms/ProductList";

export async function generateStaticParams() {
	const products = await getProductsList();
	const numOfPages = Math.ceil(products.length / 20);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}
export default async function ProductsPage({
	params,
}: {
	params: { pageNumber: string };
}) {
	const take = 20;
	const offset = (Number(params.pageNumber) - 1) * take;
	const products = await getProductsByPage(take, offset);

	return (
		<div>
			<ProductList products={products} />;
		</div>
	);
}
