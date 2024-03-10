import { type UrlObject } from "url";
import Link from "next/link";
import Image from "next/image";
import { getCollectionsList } from "@/api/collections";
import { formatNameToUrl } from "@/utils/formatNameToUrl";

export const SuggestedCollections = async () => {
	const take = 3;
	const collections = await getCollectionsList(take);
	return (
		<section className="w-full bg-gray-100">
			<div className="mx-auto max-w-7xl  py-4 lg:mx-auto lg:max-w-7xl lg:px-8">
				<div className="flex items-center justify-between px-4 sm:px-6 lg:px-0"></div>

				<div className="relative mx-auto mt-8">
					<div className="relative w-full ">
						<ul
							data-testid="collections-list"
							role="list"
							className=" lg:grid lg:grid-cols-3 lg:gap-x-6 "
						>
							{collections.map((collection, index) => (
								<li
									key={collection.id}
									className="mx-auto inline-flex w-64 flex-col text-center lg:w-auto"
								>
									<div>
										<Link
											href={
												`/collections/${formatNameToUrl(collection.name)}` as unknown as UrlObject
											}
										>
											<Image
												src={`/assets/collections/collection-${index + 1}.jpg`}
												alt={collection.name}
												width={300}
												height={300}
												className="h-64 w-full rounded-lg object-cover p-1 transition duration-300 ease-in-out hover:scale-105  lg:h-80"
											/>
											<h3 className="mt-1 text-2xl font-semibold text-zinc-900">
												{collection.name}
											</h3>
										</Link>
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
