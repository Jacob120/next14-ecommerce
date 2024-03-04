import { getCartById } from "@/api/cart";
import { Overlay } from "@/components/atoms/Overlay";

export default async function ModalCart() {
	const cart = await getCartById();

	return (
		<>
			<Overlay />
			<div className="absolute bottom-0 right-0 top-0 z-40 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="flex-1 overflow-y-auto px-4 sm:px-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium text-slate-900">
							Shopping cart
						</h3>
						<a href="/cart">Details</a>
					</div>
				</div>
				<ul>
					{cart?.items.map((item) => (
						<li key={item.product.id}>{item.product?.name}</li>
					))}
				</ul>
			</div>
		</>
	);
}
