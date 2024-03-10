/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Image from "next/image";
import { getCartById } from "@/api/cart";
import { Overlay } from "@/components/atoms/Overlay";
import { formatCurrency } from "@/utils/formatCurrency";
import { handlePaymentAction } from "@/app/cart/actions";
import { ButtonWideRectangle } from "@/components/atoms/ButtonWideRectangle";

export default async function ModalCart() {
	const cart = await getCartById();

	return (
		<>
			<Overlay />
			<div className="animation-slide-in-from-right absolute bottom-0 right-0 top-0 z-40 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium text-slate-900">
							Shopping cart
						</h3>
						<a href="/cart" className="text-sm text-blue-500">
							Open full view
						</a>
					</div>
					<ul className="mt-3 divide-y divide-gray-200">
						{cart?.items.map((item) => (
							<li key={item.product.id} className="flex py-6">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									{item.product.images[0]?.url && (
										<Image
											src={item.product.images[0]?.url}
											alt={item.product.name}
											width={200}
											height={200}
										/>
									)}
								</div>
								<div className="ml-4 flex h-full flex-1 flex-col justify-between">
									<div className="flex justify-between text-base font-medium text-slate-900">
										<h3>{item.product?.name}</h3>
										<p className="small-caps ml-4">
											{formatCurrency(item.product.price)}
										</p>
									</div>
									<p className="mt-1 text-sm text-slate-500">
										{item.product.categories[0]?.name}
									</p>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="font-bold text-slate-500">
											Quantity: {item.quantity}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<form action={handlePaymentAction}>
						<div className=" p-6">
							<ButtonWideRectangle
								actionName="Checkout"
								testid="checkout-button"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
