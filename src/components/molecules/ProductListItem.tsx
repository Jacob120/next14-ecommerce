import React from "react";
import { ProductDescription } from "@/components/atoms/ProductDescription";
import { ProductImage } from "@/components/atoms/ProductImage";
import { type ProductItemType } from "@/components/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li className="transform bg-slate-50 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md  ">
			<article>
				<ProductImage src={product.coverImage.src} alt={product.coverImage.alt} />
				<ProductDescription product={product} />
			</article>
		</li>
	);
};
