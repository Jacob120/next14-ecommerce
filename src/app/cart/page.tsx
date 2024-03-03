import { redirect } from "next/navigation";
import { getCartById } from "@/api/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChangeQuantity } from "@/components/molecules/ChangeQuantity";
import { ButtonRemove } from "@/components/atoms/ButtonRemove";
import { handlePaymentAction } from "@/app/cart/actions";

export default async function CartPage() {
	const cart = await getCartById();

	if (!cart) {
		redirect("/");
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
										cartId={cart.id}
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
