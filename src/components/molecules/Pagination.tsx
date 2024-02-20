import { ActiveLink } from "@/components/atoms/ActiveLink";

type PaginationProps = {
	currentPage: number | string;
	totalPages: number;
};

export const Pagination = ({
	currentPage,
	totalPages,
}: PaginationProps) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav aria-label="pagination" className="flex justify-center">
			<ul className="m-0 flex list-none p-0">
				{pages.map((page) => (
					<li
						key={page}
						className={`mx-1 ${currentPage === page ? "text-red-500" : "text-blue-500"}`}
					>
						<ActiveLink href={`/products/${page}`}>{page}</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
