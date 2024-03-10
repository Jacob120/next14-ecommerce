export const Footer = () => {
	return (
		<footer className=" mx-auto mt-8 flex min-h-[200px] w-full bg-gray-100 sm:py-4">
			<p className="mx-auto">
				© {new Date().getFullYear()} Next.js, Inc.
			</p>
		</footer>
	);
};
