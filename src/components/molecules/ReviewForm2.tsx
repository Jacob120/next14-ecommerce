import { revalidateTag } from "next/cache";
import React from "react";
import { InputText } from "@/components/atoms/InputText";
import { InputTextArea } from "@/components/atoms/InputTextArea";

type ReviewFormProps = {
	productId: string;
};

export const ReviewForm = ({ productId }: ReviewFormProps) => {
	const handeAddReviewAction = async (formData: FormData) => {
		"use server";
		console.log("form data", formData);
		const data = {
			author: formData.get("name") as string,
			description: formData.get("content") as string,
			productId: productId,
			email: formData.get("email") as string,
			rating: Number(formData.get("rating")),
			title: formData.get("title") as string,
		};
		// await submitProductReview(
		// 	data.author,
		// 	data.description,
		// 	data.email,
		// 	data.productId,
		// 	data.rating,
		// 	data.title,
		// );
		revalidateTag("productReview");
	};

	return (
		<form action={handeAddReviewAction} data-testid="add-review-form">
			<InputText label="Review title" name="title" type="text" />
			<InputTextArea label="Review content" name="content" />
			<div className="my-2">
				<label>
					Rating
					<fieldset className="my-2 flex flex-row-reverse justify-end">
						{[5, 4, 3, 2, 1].map((value) => (
							<React.Fragment key={value}>
								<input
									className="mx-4 h-4 w-4"
									id={`rating-${value}`}
									type="radio"
									key={value}
									value={value}
									name="rating"
								/>
								<label
									htmlFor={`rating-${value}`}
									className="cursor-pointer"
								>
									{value}
								</label>
							</React.Fragment>
						))}
					</fieldset>
					<fieldset className="flex flex-row-reverse justify-end"></fieldset>
				</label>
			</div>
			<InputText label="Name" name="name" type="text" />
			<InputText label="Email" name="email" type="email" />
			<button
				type="submit"
				className="mt-4 w-full rounded-md bg-gradient-to-r from-gray-700 to-black py-2 text-center font-semibold text-white opacity-90 transition-all hover:bg-gray-800 hover:opacity-100"
			>
				Submit
			</button>
		</form>
	);
};
