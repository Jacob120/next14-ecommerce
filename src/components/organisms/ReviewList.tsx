import { type Review } from "@/types";

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
	return (
		<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
			<div className="-my-12 divide-y divide-gray-200">
				{reviews &&
					reviews?.map((review: Review, index) => (
						<div key={index} className="py-12">
							<div className="flex items-center">
								<h3 className="text-lg font-medium text-gray-900">
									{review.author}
								</h3>
								<div className="ml-4 flex items-center">
									<p className="text-sm text-gray-500">
										{review.rating}
									</p>
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
