import { notFound } from "next/navigation";
import { ProductList } from "@/components/organisms/ProductList";
import { getProductsList } from "@/api/products";

export default async function ProductsPage() {
	const products = await getProductsList();

	if (!products) {
		return notFound();
	}

	return <ProductList products={products.data} />;
}
