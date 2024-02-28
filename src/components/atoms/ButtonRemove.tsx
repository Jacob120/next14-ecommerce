"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProductFromCart } from "@/app/cart/actions";

export const ButtonRemove = ({
	cartId,
	productId,
}: {
	cartId: string;
	productId: string;
}) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			className="text-red-500 disabled:cursor-wait disabled:text-gray-500"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeProductFromCart(cartId, productId);
					router.refresh();
				})
			}
		>
			Remove
		</button>
	);
};
