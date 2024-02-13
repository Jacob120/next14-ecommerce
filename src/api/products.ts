import { type ProductItemType } from "@/components/types";

export type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductsList = async () => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];

	const products = productsResponse.map((product) =>
		productItemResponseToProductItemType(product),
	);

	return products;
};

export const getProductById = async (id: string) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productResponse = (await res.json()) as ProductResponseItem;

	return productItemResponseToProductItemType(productResponse);
};

export const getProductsByPage = async (take = 20, offset = 1) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];

	const products = productsResponse.map((product) =>
		productItemResponseToProductItemType(product),
	);

	return products;
};

const productItemResponseToProductItemType = (
	product: ProductResponseItem,
): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		price: product.price,
		category: product.category,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
		description: product.description,
	};
};
