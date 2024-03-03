"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { getCartById } from "@/api/cart";

export const cartChangeItemQuantity = async (
	cartId: string,
	productId: string,
	quantity: number,
): Promise<void> => {
	await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			cartId,
			productId,
			quantity,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	revalidateTag("cart");
};

export const removeProductFromCart = async (
	cartId: string,
	productId: string,
) => {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			cartId: cartId,
			productId: productId,
		},
		cache: "no-store",
	});
};

export async function handlePaymentAction() {
	const cart = await getCartById();

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}
	if (!cart) {
		throw new Error("Cart not found");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
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
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/cancel`,
	});

	if (!checkoutSession.url) {
		throw new Error("Checkout session url not found");
	}
	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
