import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { getOrdersByEmail } from "@/api/orders";

export default async function OrderPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;

	if (!email) {
		return <div>User does not have email</div>;
	}

	const orders = await getOrdersByEmail(email);

	if (!orders) {
		return <div>Error getting orders</div>;
	}

	return (
		<div>
			<h1>{user.firstName}&rsquo;s Orders</h1>

			{orders.length === 0 ? (
				<div>No orders found</div>
			) : (
				<ul>
					{orders.map((order) => (
						<li key={order.id}>
							{order.id} - {order.totalAmount} - {order.status}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
