"use client";

import { useOptimistic } from "react";
import { cartChangeItemQuantity } from "@/app/cart/actions";

export function ChangeQuantity({
	cartId,
	itemId,
	quantity,
}: {
	cartId: string;
	itemId: string;
	quantity: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex">
			<button
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					// check if quantity is 0
					if (optimisticQuantity === 0) {
						return;
					}
					setOptimisticQuantity(optimisticQuantity - 1);
					await cartChangeItemQuantity(
						cartId,
						itemId,
						optimisticQuantity - 1,
					);
				}}
			>
				-
			</button>
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await cartChangeItemQuantity(
						cartId,
						itemId,
						optimisticQuantity + 1,
					);
				}}
			>
				+
			</button>
		</form>
	);
}
