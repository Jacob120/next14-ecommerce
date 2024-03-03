import { getCartById } from "@/api/cart";
import { Overlay } from "@/components/atoms/Overlay";

export default async function ModalCart() {
	const cart = await getCartById();
	console.log("modal cart", cart);
	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<ul>
					{cart?.items.map((item) => (
						<li key={item.product.id}>{item.product?.name}</li>
					))}
				</ul>
				<a href="/cart">Details</a>
			</div>
		</>
	);
}
