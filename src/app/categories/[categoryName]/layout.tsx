import { getCategoryByName } from "@/api/categories";

export default async function CategoryLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { categoryName: string };
}) {
	const category = await getCategoryByName(params.categoryName);

	return (
		<section className="mx-auto flex flex-col">
			<div className="w-full bg-gray-100">
				<div className="mx-auto  max-w-7xl">
					<h2 className="mx-auto py-8 text-lg font-semibold">
						{category?.name}
					</h2>
				</div>
			</div>
			<main className="mx-auto">{children}</main>
		</section>
	);
}
