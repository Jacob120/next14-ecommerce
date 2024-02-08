import React from "react";
import { type ProductItemType } from "@/components/types";
import { formatCurrency } from "@/utils/formatCurrency";

type ProductDescriptionProps = {
	product: ProductItemType;
};

export const ProductDescription = ({
	product: { name, category, price },
}: ProductDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between p-4">
			<div>
				<h3 className=" font-semibold text-gray-700">{name}</h3>
				<p className=" text-gray-500">
					<span className="sr-only">Category:</span>
					{category}
				</p>
			</div>
			<p className=" font-semibold text-gray-900">
				<span className="mr-1">Price:</span>
				{formatCurrency(price)}
			</p>
		</div>
	);
};
