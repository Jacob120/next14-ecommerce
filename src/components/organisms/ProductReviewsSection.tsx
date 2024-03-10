"use client";
import { useOptimistic } from "react";
import { Star } from "lucide-react";
import { ReviewForm } from "@/components/molecules/ReviewForm";
import { type Review } from "@/types";
import { ReviewList } from "@/components/organisms/ReviewList";

export const ProductReviewsSection = ({
	productId,
	reviews,
	rating,
}: {
	productId: string;
	reviews: Review[];
	rating: number;
}) => {
	// const [optimisticReview, setOptimisticReview] = useOptimistic(
	// 	reviews,
	// 	(_state, newReview: Review[]) => newReview,
	// );

	const [optimisticReviews, setOptimisticReviews] =
		useOptimistic<Review[]>(reviews);

	return (
		<div className="mmx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-16">
			{/* Left column*/}
			<div className="lg:col-span-4">
				<h2 className=" text-2xl font-bold tracking-tight text-gray-900">
					Customer Reviews
				</h2>
				<div className="mt-3 flex items-center ">
					{[1, 2, 3, 4, 5].map((index) => (
						<Star
							key={index}
							className={`h-5 w-5 ${
								rating && index <= rating
									? "text-yellow-400"
									: "text-gray-400"
							}`}
							fill="currentColor"
						/>
					))}
					<p className="ml-3 font-medium text-slate-600">
						Based on {reviews.length} reviews{" "}
					</p>
				</div>
				<div className="mt-10">
					<h3 className="text-lg font-medium text-gray-900">
						Share your thoughts
					</h3>
					<p className="mt-1 text-sm font-medium text-gray-900 ">
						If you’ve used this product, share your thoughts with
						other customers
					</p>
					<div className="mt-2">
						<ReviewForm
							productId={productId || ""}
							setOptimisticReview={setOptimisticReviews}
							reviews={optimisticReviews}
						/>
					</div>
				</div>
			</div>

			{/* Right column */}
			<ReviewList reviews={optimisticReviews} />
		</div>
	);
};
