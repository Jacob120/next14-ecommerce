import React from "react";

import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

import { ActiveLink } from "@/components/atoms/ActiveLink";
import { getCategoriesList } from "@/api/categories";
import { SearchInput } from "@/components/molecules/SearchInput";
import { CartCounter } from "@/components/molecules/CartCounter";
import { getCartById } from "@/api/cart";

export const NavBar = async () => {
	const categories = await getCategoriesList();

	const cart = await getCartById();

	const cartItemsQuantity = cart?.items.reduce((acc, item) => {
		acc += item.quantity;
		return acc;
	}, 0);

	return (
		<header className="sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
				<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
					<nav className="scrolling-touch scroll-shadows -mx-2 flex gap-3 overflow-x-scroll lg:mx-0 lg:h-16 lg:overflow-x-auto">
						<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
							<li className="h-full">
								<ActiveLink href="/">Home</ActiveLink>
							</li>
							<li className="h-full">
								<ActiveLink href="/products">All</ActiveLink>
							</li>
							{categories.map((category) => {
								return (
									<li key={category.id} className="h-full">
										<ActiveLink
											href={`/categories/${category.name.toLowerCase()}/1`}
										>
											{category.name}
										</ActiveLink>
									</li>
								);
							})}
						</ul>
					</nav>
					<div className="flex h-full flex-1 items-center px-2 lg:ml-6 lg:h-16 lg:justify-end">
						<SearchInput />
						<CartCounter quantity={cartItemsQuantity || 0} />
						<div className="font-meidum text-slate-500">
							<SignedIn>
								<UserButton />
							</SignedIn>
							<SignedOut>
								<SignInButton />
							</SignedOut>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
