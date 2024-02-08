import { type ProductItemType } from "@/components/types";

export const products: ProductItemType[] = [
	{
		id: "1",
		category: "Category 1",
		name: "Product 1",
		price: 100,
		coverImage: {
			src: "/assets/products/t-shirts/t-shirt_1.jpg",
			alt: "Placeholder Image",
		},
	},
	{
		id: "2",
		category: "Category 2",
		name: "Product 2",
		price: 200,
		coverImage: {
			src: "/assets/products/t-shirts/t-shirt_2.jpg",
			alt: "Placeholder Image",
		},
	},
	{
		id: "3",
		category: "Category 3",
		name: "Product 3",
		price: 300,
		coverImage: {
			src: "/assets/products/t-shirts/t-shirt_3.jpg",
			alt: "Placeholder Image",
		},
	},
	{
		id: "4",
		category: "Category 4",
		name: "Product 4",
		price: 400,
		coverImage: {
			src: "/assets/products/t-shirts/t-shirt_4.jpg",
			alt: "Placeholder Image",
		},
	},
];
