"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { CartSetProductQuantityDocument } from "@/gql/graphql";

export const cartChangeItemQuantity = async (
	cartId: string,
	productId: string,
	quantity: number,
): Promise<void> => {
	await executeGraphql(CartSetProductQuantityDocument, {
		cartId,
		productId,
		quantity,
	});
};
