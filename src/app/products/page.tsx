import { getProductsList } from "@/api/products";
import { ProductList } from "@/components/organisms/ProductList";

export default async function ProductsPage() {
	const products = await getProductsList();
	console.log(products);

	return <ProductList products={products} />;
}
