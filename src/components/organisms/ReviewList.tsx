import { Star } from "lucide-react";
import { type Review } from "@/types";

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
	return (
		<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
			<div className="-my-12 divide-y divide-gray-200">
				{reviews &&
					reviews?.map((review: Review, index) => (
						<div key={index} className="py-12">
							<div className="flex flex-col font-medium">
								<h3 className="text-lg  text-gray-900">
									{review.author}
								</h3>
								<div className=" mt-1 flex items-center gap-3">
									<p className="text-sm text-gray-500">
										{review.rating}/5
									</p>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((index) => (
											<Star
												key={index}
												className={`h-4 w-4 ${
													review.rating && index <= review.rating
														? "text-yellow-400"
														: "text-gray-400"
												}`}
												fill="currentColor"
											/>
										))}
									</div>
								</div>
							</div>
							<div className="mt-2 space-y-4 lg:grid lg:grid-cols-12 lg:gap-x-8">
								<p className="text-sm text-gray-500 lg:col-span-5">
									{review.description}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
