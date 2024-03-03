import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!searchParams.session_id) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.session_id,
	);

	return (
		<>
			<h2 className="container mx-auto my-10 h-screen text-lg font-semibold">
				Test payment status: {session.payment_status}
			</h2>
		</>
	);
}
