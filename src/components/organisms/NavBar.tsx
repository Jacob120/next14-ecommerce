import React from "react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { getCategoriesList } from "@/api/categories";
import { SearchInput } from "@/components/molecules/SearchInput";

export const NavBar = async () => {
	const categories = await getCategoriesList();

	return (
		<nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-6 py-10">
			<ul className="mx-auto my-2 flex w-full justify-center sm:py-4">
				<li>
					<ActiveLink href="/">Home</ActiveLink>
				</li>
				<li>
					<ActiveLink href="/products">All</ActiveLink>
				</li>
				{categories.map((category) => {
					return (
						<li key={category.id}>
							<ActiveLink
								href={`/categories/${category.name.toLowerCase()}/1`}
							>
								{category.name}
							</ActiveLink>
						</li>
					);
				})}
			</ul>
			<SearchInput />
		</nav>
	);
};
