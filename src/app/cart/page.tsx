import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCartById } from "@/api/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChangeQuantity } from "@/components/molecules/ChangeQuantity";
import { ButtonRemove } from "@/components/atoms/ButtonRemove";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const cart = await getCartById(cartId);

	if (!cart) {
		redirect("/");
	}

	async function handlePaymentAction() {
		"use server";
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("Stripe secret key not found");
		}
		if (!cart) {
			throw new Error("Cart not found");
		}
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card", "blik", "p24"],
			metadata: {
				cartId: cart.id,
			},
			line_items: cart.items.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.product?.name,
					},
					unit_amount: item.product.price,
				},
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
		});
		if (!checkoutSession.url) {
			throw new Error("Checkout session url not found");
		}
		cookies().set("cartId", "");
		redirect(checkoutSession.url);
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.items.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td>
									<ChangeQuantity
										cartId={cart.id}
										itemId={item.product.id}
										quantity={item.quantity}
									/>
								</td>
								<td>{formatCurrency(item.product?.price)}</td>
								<td>
									<ButtonRemove
										cartId={cartId}
										productId={item.product.id}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form action={handlePaymentAction}>
				<div className="w-1/3 p-6">
					<button
						type="submit"
						className="w-full rounded bg-blue-500 p-3 text-white"
					>
						Checkout
					</button>
				</div>
			</form>
		</div>
	);
}
