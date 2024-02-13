import { getProductsList } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const products = await getProductsList();
	const numOfPages = Math.ceil(products.length / 20);
	return (
		<>
			<section>{children}</section>
			<Pagination totalPages={numOfPages} currentPage={0} />
		</>
	);
}
