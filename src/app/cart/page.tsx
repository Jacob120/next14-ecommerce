import { redirect } from "next/navigation";
import Image from "next/image";
import { getCartById } from "@/api/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChangeQuantity } from "@/components/molecules/ChangeQuantity";
import { ButtonRemove } from "@/components/atoms/ButtonRemove";
import { handlePaymentAction } from "@/app/cart/actions";
import { ButtonWideRectangle } from "@/components/atoms/ButtonWideRectangle";

export default async function CartPage() {
	const cart = await getCartById();

	if (!cart) {
		redirect("/");
	}

	const cartTotal = cart.items.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	);

	return (
		<div className="flex flex-grow flex-col">
			<section className="mx-auto w-full max-w-7xl p-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						Your Shopping Cart
					</h1>
				</div>
				<ul
					role="list"
					className="mt-10 divide-y divide-gray-200 border-b border-t border-gray-200"
				>
					{cart.items.map((item) => (
						<li className="flex py-4" key={item.product.id}>
							<div className="flex-shrink-0 rounded-md border bg-slate-50">
								{item.product.images[0] && (
									<Image
										src={item.product.images[0]?.url}
										alt={item.product.images[0]?.alt}
										width={100}
										height={100}
									/>
								)}
							</div>
							<div className="relative ml-4 flex flex-1 flex-col justify-between">
								<div>
									<div className="flex justify-between">
										<div className="pr-6">
											<h3 className="font-medium text-slate-700">
												{item.product.name}
											</h3>
											<p className="mt-1 text-sm text-slate-500">
												{item.product.categories[0]?.name}
											</p>
										</div>
										<p className="small-caps p-4  text-right font-semibold text-slate-900">
											{formatCurrency(
												item.product.price * item.quantity,
											)}
										</p>
									</div>
									<div className="mt-4">
										<div className="flex justify-between">
											<ChangeQuantity
												cartId={cart.id}
												itemId={item.product.id}
												quantity={item.quantity}
											/>
											<div className="px-4">
												<ButtonRemove
													cartId={cart.id}
													productId={item.product.id}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
				<div className="mt-6 bg-gray-100 p-4 text-sm">
					{" "}
					<div className="flex items-center justify-between py-4">
						<div>
							<div className="text-slate-900">Order total</div>
							<p className="mt-1 text-sm text-slate-500">
								Shipping and taxes will be calculated at the next step
							</p>
						</div>
						<div className="text-lg font-medium text-slate-900">
							{" "}
							{formatCurrency(cartTotal)}
						</div>
					</div>
				</div>

				<form action={handlePaymentAction}>
					<div className="w-1/3 py-6">
						<ButtonWideRectangle
							actionName="Checkout"
							testid="checkout-button"
						/>
					</div>
				</form>
			</section>
		</div>
	);
}
