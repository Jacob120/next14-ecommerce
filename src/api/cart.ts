import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	type MutationCartAddItemInput,
	type MutationCartFindOrCreateInput,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getCartById = async (cartId: string) => {
	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			slug: cartId,
		},
		cache: "no-store",
	});

	return cart.cart;
};

export const createCart = async (
	cartId: string | undefined,
	slug: MutationCartFindOrCreateInput,
) => {
	const cart = await executeGraphql({
		query: CartCreateDocument,
		variables: {
			slug: slug,
			cartId: cartId as string,
		},
		cache: "no-store",
	});

	return cart.cartFindOrCreate;
};

export const addProductToCart = async (
	cartId: string,
	input: MutationCartAddItemInput,
) => {
	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			slug: cartId,
		},
		cache: "no-store",
	});

	if (!cart) {
		return;
	}

	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			cartId: cartId,
			input: input,
		},
	});
};
