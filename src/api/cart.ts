import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	type MutationCartAddItemInput,
	type MutationCartFindOrCreateInput,
} from "@/gql/graphql";

export const getCartById = async (cartId: string) => {
	const cart = await executeGraphql(CartGetByIdDocument, {
		slug: cartId,
	} as { slug: string });

	return cart.cart;
};

export const createCart = async (
	cartId: string | undefined,
	slug: MutationCartFindOrCreateInput,
) => {
	const cart = await executeGraphql(CartCreateDocument, {
		slug: slug,
		cartId: cartId as string,
	});

	return cart.cartFindOrCreate;
};

export const addProductToCart = async (
	cartId: string,
	input: MutationCartAddItemInput,
) => {
	const cart = await executeGraphql(CartGetByIdDocument, {
		slug: cartId,
	});

	if (!cart) {
		return;
	}

	await executeGraphql(CartAddProductDocument, {
		cartId: cartId,
		input: input,
	});
};
