"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { ButtonWideRectangle } from "@/components/atoms/ButtonWideRectangle";
import { InputText } from "@/components/atoms/InputText";
import { InputTextArea } from "@/components/atoms/InputTextArea";

type ReviewFormProps = {
	productId: string;
	addReviewAction: (form: FormData) => Promise<void>;
};

export const ReviewForm = ({ addReviewAction }: ReviewFormProps) => {
	const [rating, setRating] = useState<number>(0);
	const [hoverRating, setHoverRating] = useState(0);

	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const handleMouseOver = (rate: number) => {
		setHoverRating(rate);
	};

	const handleMouseLeave = () => {
		setHoverRating(0);
	};

	return (
		<form
			data-testid="add-review-form"
			className="mt-2 flex flex-col gap-y-2"
			action={addReviewAction}
		>
			<InputText label="Review title" name="title" type="text" />
			<InputTextArea label="Review content" name="description" />

			{/* Stars rating */}
			{/* Hidden input to store the rating value */}
			<input type="hidden" name="rating" value={rating} />
			<div onMouseLeave={handleMouseLeave}>
				<p className="mb-1 text-xs font-medium text-gray-700">
					Rating
				</p>
				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((index) => (
						<Star
							key={index}
							className={`h-5 w-5 cursor-pointer ${
								(hoverRating || rating) >= index
									? "text-yellow-400"
									: "text-gray-400"
							}`}
							fill="currentColor"
							onMouseOver={() => handleMouseOver(index)}
							onClick={() => handleRating(index)}
							onBlur={handleMouseLeave}
						/>
					))}
				</div>
			</div>

			<InputText label="Name" name="author" type="text" />
			<InputText label="Email" name="email" type="email" />
			<div className="mt-2">
				<ButtonWideRectangle actionName="Submit review" />
			</div>
		</form>
	);
};
