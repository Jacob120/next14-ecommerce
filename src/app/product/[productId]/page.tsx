import { type Metadata } from "next/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { type MutationCartAddItemInput } from "@/gql/graphql";

import { SuggestedProductsList } from "@/components/organisms/SuggestedProducts";
import {
	addProductToCart,
	createCart,
	getCartById,
} from "@/api/cart";
import { ButtonWideRectangle } from "@/components/atoms/ButtonWideRectangle";
import { formatCurrency } from "@/utils/formatCurrency";
import { getProductById } from "@/api/products";
import { ProductReviewsSection } from "@/components/organisms/ProductReviewsSection";
import { type Review } from "@/types";
import { cartChangeItemQuantity } from "@/app/cart/actions";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	if (!product) {
		notFound();
	}

	return {
		title: product.product?.name,
		description: product.product?.description,
		openGraph: {
			title: `${product.product?.name} - E-commerce Site`,
			images: [
				{
					url: product.product?.images[0]?.url ?? "",
					alt: product.product?.images[0]?.alt,
				},
			],
		},
	};
};

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);

	if (!product) {
		notFound();
	}

	async function getOrCreateCart() {
		"use server";
		const cartId = cookies().get("cartId")?.value;

		if (cartId) {
			const cart = await getCartById();
			if (cart) {
				return cart;
			}
		}

		const cart = await createCart(cartId || "", {});

		cookies().set("cartId", cart.id, {
			httpOnly: true,
			sameSite: "strict",
			// secure: true,
		});

		if (!cart) {
			throw new Error("Cart not found or created");
		}

		return cart;
	}

	async function addToCartAction(form: FormData) {
		"use server";
		const cart = await getOrCreateCart();

		if (!cart) {
			throw new Error("Cart not found or created");
		}

		const productId = form.get("productId") as string;
		const existingItem = cart.items.find(
			(item) => item.product.id === productId,
		);

		if (existingItem) {
			const updatedQuantity: number = existingItem.quantity
				? existingItem.quantity + 1
				: 1;

			await cartChangeItemQuantity(
				cart.id,
				productId,
				updatedQuantity,
			);

			revalidateTag("cart");
			return;
		} else {
			const newForm: MutationCartAddItemInput = {
				item: {
					productId: form.get("productId") as string,
					quantity: 1,
				},
			};
			await addProductToCart(cart.id, newForm);
		}

		revalidateTag("cart");
	}

	return (
		<div className="mx-auto flex max-w-7xl flex-grow flex-col">
			<section className="mx-auto grid max-w-7xl p-8">
				{product && product.product && (
					<article>
						<form
							action={addToCartAction}
							className="grid grid-cols-1 gap-4 sm:grid-cols-2"
						>
							<div className="overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
								{product.product.images[0]?.url && (
									<Image
										priority
										src={product.product.images[0]?.url}
										alt={product.product.name}
										className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
										width={420}
										height={420}
									/>
								)}
								<input
									type="hidden"
									name="productId"
									value={product.product.id}
								/>
							</div>
							<div className="px-6">
								<h1 className="flex-auto text-3xl font-bold tracking-tight text-slate-900">
									{product.product.name}
								</h1>
								<div className="mt-4 flex items-center">
									<p className="font-base small-caps text-lg text-slate-800">
										{formatCurrency(product.product.price)}
									</p>
								</div>
								<div className="mt-4 space-y-6">
									<p className="font-sans text-lg text-slate-500">
										{product.product.description}
									</p>
								</div>
								<div className="mt-8">
									<ButtonWideRectangle
										actionName="Add to Cart"
										testid="add-to-cart-button"
									/>
								</div>
							</div>
						</form>
					</article>
				)}
			</section>

			<div className="mt-5">
				<h2 className="mx-auto max-w-7xl text-xl font-semibold">
					Related Products
				</h2>
				<SuggestedProductsList />
			</div>

			<div>
				<ProductReviewsSection
					productId={product?.product?.id || ""}
					reviews={product.product?.reviews as unknown as Review[]}
				/>
			</div>
		</div>
	);
}
