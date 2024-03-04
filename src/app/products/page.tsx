// import { notFound } from "next/navigation";
// import { ProductList } from "@/components/organisms/ProductList";
// import { getProductsList } from "@/api/products";

// export default async function ProductsPage() {
// 	const orderBy = "DEFAULT";
// 	const orderDirection = "ASC";
// 	const products = await getProductsList(orderBy, orderDirection);

// 	if (!products) {
// 		return notFound();
// 	}

// 	return <ProductList products={products.data} />;
// }
