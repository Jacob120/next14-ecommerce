"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";

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
