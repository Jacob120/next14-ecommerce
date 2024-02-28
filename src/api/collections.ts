import { executeGraphql } from "@/api/graphqlApi";
import {
	CollectionGetByNameDocument,
	CollectionsGetListDocument,
} from "@/gql/graphql";

export const getCollectionsList = async (take: number) => {
	const collections = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: { take },
	});

	return collections.collections.data;
};

export const getCollectionByName = async (name: string) => {
	const collection = await executeGraphql({
		query: CollectionGetByNameDocument,
		variables: {
			slug: name,
		},
	});

	return collection.collection;
};
