"use client";
import { useRouter } from "next/navigation";
import { Select } from "@/components/molecules/Select";

export const ProductListHeader = ({}: {}) => {
	const router = useRouter();

	const handleSortChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const [orderBy, orderDirection] = e.target.value.split("-");
		router.push(
			`/products/1?orderBy=${orderBy}&orderDirection=${orderDirection}`,
		);
	};

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-7xl px-8">
				<div className="mx-auto py-8">
					<div className="flex flex-row items-center justify-between">
						<h2>Product List</h2>
						<Select handleSortChange={handleSortChange} />
					</div>
				</div>
			</div>
		</div>
	);
};
