export default async function CategoryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="mx-auto flex flex-col">
			<main className="mx-auto">{children}</main>
		</section>
	);
}
