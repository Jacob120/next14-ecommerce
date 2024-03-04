"use server";

import { productAddReview } from "@/api/products";

export const addReviewAction = async (form: FormData) => {
	const data = {
		productId: form.get("productId") as string,
		author: form.get("author"),
		description: form.get("description"),
		email: form.get("email"),
		rating: form.get("rating"),
		title: form.get("title"),
	};

	await productAddReview(
		data.productId,
		data.author as string,
		data.description as string,
		data.email as string,
		Number(data.rating) as unknown as number,
		data.title as string,
	);
};
