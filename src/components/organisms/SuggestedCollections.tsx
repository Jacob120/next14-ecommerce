import { type UrlObject } from "url";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";
import { formatNameToUrl } from "@/utils/formatNameToUrl";

export const SuggestedCollections = async () => {
	const take = 3;
	const collections = await getCollectionsList(take);
	return (
		<section className="bg-gray-100">
			<div className="pt-16 sm:pt-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pt-32">
				<div className="flex items-center justify-between px-4 sm:px-6 lg:px-0"></div>

				<div className="relative mt-8">
					<div className="relative w-full overflow-x-auto">
						<ul
							data-testid="collections-list"
							role="list"
							className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 md:gap-y-0 lg:grid-cols-4 lg:gap-x-8"
						>
							{collections.map((collection) => (
								<li
									key={collection.id}
									className="mx-auto inline-flex w-64 flex-col text-center lg:w-auto"
								>
									<div className="group relative">
										<div className="mt-6">
											<h3 className="mt-1 text-3xl font-semibold text-zinc-900">
												<Link
													href={
														`/collections/${formatNameToUrl(collection.name)}` as unknown as UrlObject
													}
												>
													{collection.name}
												</Link>
											</h3>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};
