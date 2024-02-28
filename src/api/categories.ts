import { executeGraphql } from "@/api/graphqlApi";
import {
	CategoriesGetListDocument,
	CategoryGetByNameDocument,
} from "@/gql/graphql";

export const getCategoriesList = async () => {
	const categories = await executeGraphql({
		query: CategoriesGetListDocument,
	});

	return categories.categories.data;
};

export const getCategoryByName = async (name: string) => {
	const category = await executeGraphql({
		query: CategoryGetByNameDocument,
		variables: {
			slug: name,
		},
	});

	return category?.category;
};
