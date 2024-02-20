import React from "react";
import Link from "next/link";
import { ProductDescription } from "@/components/atoms/ProductDescription";
import { ProductImage } from "@/components/atoms/ProductImage";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

export const ProductListItem = ({
	product,
}: {
	product: ProductListItemFragmentFragment;
}) => {
	return (
		<li className="transform bg-slate-50 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md  ">
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductImage
						src={product.images[0]?.url ?? ""}
						alt={product.images[0]?.alt ?? ""}
					/>
					<ProductDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
