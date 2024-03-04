"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { ButtonWideRectangle } from "@/components/atoms/ButtonWideRectangle";
import { InputText } from "@/components/atoms/InputText";
import { InputTextArea } from "@/components/atoms/InputTextArea";
import { addReviewAction } from "@/app/product/[productId]/actions";
import { type Review } from "@/types";

type ReviewFormProps = {
	productId: string;
	// addReviewAction: (form: FormData) => Promise<void>;
	setOptimisticReview: (prev: Review[]) => void;
	reviews: Review[];
};

export const ReviewForm = ({
	productId,
	setOptimisticReview,
	reviews,
}: ReviewFormProps) => {
	const [rating, setRating] = useState<number>(0);
	const [hoverRating, setHoverRating] = useState(0);

	const handleRatingChange = (rate: number) => {
		setRating(rate);
	};

	const handleAddReview = async (form: FormData) => {
		const data: Review[] = [
			{
				productId: form.get("productId") as string,
				author: form.get("name") as string,
				description: form.get("content") as string,
				email: form.get("email") as string,
				rating: Number(form.get("rating")),
				title: form.get("headline") as string,
			},
			...reviews,
		];

		setOptimisticReview(data);

		await addReviewAction(form);
	};

	return (
		<form
			data-testid="add-review-form"
			className="mt-2 flex flex-col gap-y-2"
			action={handleAddReview}
		>
			<InputText
				label="Review title"
				name="headline"
				type="text"
				required={true}
			/>
			<InputTextArea label="Review content" name="content" />

			{/* Stars rating */}
			{/* Hidden input to store the rating value and productId */}

			<input type="hidden" name="productId" value={productId} />
			<div className="rating">
				<p className="mb-1 text-xs font-medium text-gray-700">
					Rating
				</p>
				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((index) => (
						<div key={index}>
							<input
								type="radio"
								id={`star_${index}`}
								name="rating"
								value={index}
								className="sr-only" // This class hides the radio button visually but keeps it accessible
								onChange={() => handleRatingChange(index)}
								checked={rating === index}
							/>
							<label
								htmlFor={`star_${index}`}
								className="cursor-pointer"
							>
								<Star
									className={`h-5 w-5 ${
										hoverRating >= index || rating >= index
											? "text-yellow-400"
											: "text-gray-400"
									}`}
									fill="currentColor"
									onMouseOver={() => setHoverRating(index)}
									onMouseOut={() => setHoverRating(0)}
								/>
							</label>
						</div>
					))}
				</div>
			</div>

			<InputText
				label="Name"
				name="name"
				type="text"
				required={true}
			/>
			<InputText
				label="Email"
				name="email"
				type="email"
				required={true}
			/>
			<div className="mt-2">
				<ButtonWideRectangle
					actionName="Submit review"
					testid="submit-review"
				/>
			</div>
		</form>
	);
};
