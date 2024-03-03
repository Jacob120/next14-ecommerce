import { ImageResponse } from "next/og";
import Image from "next/image";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const alt = "Product Details";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	const categoryName =
		product?.product?.categories[0]?.name ?? "Category";
	const productName = product?.product?.name ?? "Product Name";
	const productDescription =
		product?.product?.description ?? "Product Description";
	const imageUrl = product?.product?.images[0]?.url ?? "";

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: size.width + "px",
					height: size.height + "px",
					color: "white",
					background: `
                        linear-gradient(
                            90deg,
                            rgb(6,172,214) 0%,
                            rgb(0,0,0) 20%,
                            rgb(0,0,0) 80%,
                            rgb(6,71,255) 100%
                        )`,
				}}
			>
				<h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
					{productName}
				</h1>
				<p style={{ fontSize: "24px", marginBottom: "20px" }}>
					{productDescription}
				</p>
				<p style={{ fontSize: "24px", marginBottom: "20px" }}>
					{categoryName}
				</p>
				<Image
					src={imageUrl}
					alt="Product Image"
					style={{ maxWidth: "100%", maxHeight: "200px" }}
				/>
			</div>
		),
	);
}
