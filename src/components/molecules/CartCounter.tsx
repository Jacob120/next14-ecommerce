import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const CartCounter = () => {
	return (
		<div className="ml-auto h-full lg:ml-4">
			<Link
				href="/cart"
				className="flex h-full w-16 items-center justify-center border-b-2 border-transparent px-2 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700"
			>
				<ShoppingBag />
				<div className="w-4">
					<span className="ml-2 text-sm font-medium ">0</span>
					<span className="sr-only">items in cart, view bag</span>
				</div>
			</Link>
		</div>
	);
};
