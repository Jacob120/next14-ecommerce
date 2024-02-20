import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductDescriptionProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductDescription = ({
	product: { name, categories, price },
}: ProductDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between p-4">
			<div>
				<h1 className=" font-semibold text-gray-700">{name}</h1>
				<p className=" text-gray-500">
					<span className="sr-only">Category:</span>
					{categories[0]?.name || "No category"}
				</p>
			</div>
			<p className=" font-semibold text-gray-900">
				<span className="mr-1">Price:</span>
				{formatCurrency(price)}
			</p>
		</div>
	);
};
