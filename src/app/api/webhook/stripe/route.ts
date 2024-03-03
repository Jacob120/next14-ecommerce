/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET_KEY,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed":
			console.log("Checkout session completed");
			event.data.object;
		case "payment_intent.succeeded":
			console.log("Payment intent succeeded");
			event.data.object;
	}

	return new Response("OK", { status: 200 });
}
