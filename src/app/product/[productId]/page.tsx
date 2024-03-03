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
import { getProductById, productAddReview } from "@/api/products";
import { ReviewForm } from "@/components/molecules/ReviewForm";

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

		const newForm: MutationCartAddItemInput = {
			item: {
				productId: form.get("productId") as string,
				quantity: parseInt(form.get("quantity") as string),
			},
		};

		await addProductToCart(cart.id, newForm);

		revalidateTag("cart");
	}

	async function addReviewAction(form: FormData) {
		"use server";
		console.log("Review added formData", form);

		const data = {
			productId: product?.product?.id,
			author: form.get("author"),
			description: form.get("description"),
			email: form.get("email"),
			rating: form.get("rating"),
			title: form.get("title"),
		};
		console.log("data", data);
		await productAddReview(
			data.productId as string,
			data.author as string,
			data.description as string,
			data.email as string,
			Number(data.rating) as unknown as number,
			data.title as string,
		);
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
										data-testid="add-to-cart-button"
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

			{/* Reviews */}
			<div className="mmx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-16">
				{/* Left column*/}
				<div className="lg:col-span-4">
					<h2 className=" text-2xl font-bold tracking-tight text-gray-900">
						Customer Reviews
					</h2>
					<div className="mt-3 flex items-center">
						<div className="flex items-center">Stars</div>
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
								addReviewAction={addReviewAction}
								productId={product.product?.id || ""}
							/>
						</div>
					</div>
				</div>

				{/* Right column */}
				<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
					Reviews
				</div>
			</div>
		</div>
	);
}
