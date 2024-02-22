import { executeGraphql } from "@/api/graphqlApi";
import {
	CategoriesGetListDocument,
	CategoryGetByNameDocument,
} from "@/gql/graphql";

export const getCategoriesList = async () => {
	const categories = await executeGraphql(
		CategoriesGetListDocument,
		{},
	);

	return categories.categories.data;
};

export const getCategoryByName = async (name: string) => {
	const category = await executeGraphql(CategoryGetByNameDocument, {
		slug: name,
	} as { slug: string });

	return category?.category;
};
