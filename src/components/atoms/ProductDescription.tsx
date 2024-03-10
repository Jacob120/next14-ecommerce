import React from "react";
import { Star } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductDescriptionProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductDescription = ({
	product: { name, categories, price, rating },
}: ProductDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between p-4 text-sm">
			<div>
				<h2 className="font-semibold text-gray-700">{name}</h2>
				<p className="mt-1 text-gray-500">
					<span className="sr-only">Category:</span>
					{categories[0]?.name || "No category"}
				</p>
			</div>
			<div>
				<p className=" font-semibold text-gray-900">
					<span className="mr-1">Price:</span>
					<span data-testid="product-price">
						{formatCurrency(price)}
					</span>
				</p>
				<div className="mt-1 flex items-center justify-between gap-1">
					<div data-testid="product-rating">
						{rating?.toFixed(1) || "N/A"}/5
					</div>
					<div className="flex">
						{[1, 2, 3, 4, 5].map((index) => (
							<Star
								key={index}
								className={`h-4 w-4 ${
									rating && index <= rating
										? "text-yellow-400"
										: "text-gray-400"
								}`}
								fill="currentColor"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
