import { ProductList } from "@/components/organisms/ProductList";
import { products } from "@/data/products";

export default function Home() {
	return (
		<main className="container mx-auto flex min-h-screen w-full">
			<section className="mx-auto w-full  sm:py-4">
				<ProductList products={products} />
			</section>
		</main>
	);
}
