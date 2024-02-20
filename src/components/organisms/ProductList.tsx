// components/organisms/ProductList.tsx
import { ProductListItem } from "@/components/molecules/ProductListItem";

import { type ProductListItemFragmentFragment } from "@/gql/graphql";

export const ProductList = ({
	products,
}: {
	products: ProductListItemFragmentFragment[];
}) => {
	return (
		<ul
			data-testid="products-list"
			className="grid w-full grid-cols-1 gap-x-6 gap-y-10 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
