import { executeGraphql } from "@/api/graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export const getOrdersByEmail = async (email: string) => {
	const orders = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email: email,
		},
	});

	if (!orders) {
		return;
	}

	return orders.orders.data;
};
