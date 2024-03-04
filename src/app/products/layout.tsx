import { getProductsList } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductListHeader } from "@/components/molecules/ProductListHeader";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const orderBy = "DEFAULT";
	const orderDirection = "ASC";
	const products = await getProductsList(orderBy, orderDirection);
	const numOfPages = Math.ceil(products.data.length / 20);

	return (
		<>
			<ProductListHeader />
			<section>{children}</section>
			<Pagination totalPages={numOfPages} currentPage={0} />
		</>
	);
}
