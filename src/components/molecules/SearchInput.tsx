"use client";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const SearchInput = () => {
	const router = useRouter();

	const [query, setQuery] = useState<string>("");

	const updateQuery = useCallback(
		(value: string) => {
			setQuery(value);
			router.push(`/search?query=${value}`);
		},
		[router],
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdateQuery = useCallback(
		debounce(updateQuery, 500),
		[updateQuery],
	);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setQuery(value);
			debouncedUpdateQuery(value);
		},
		[debouncedUpdateQuery],
	);

	return (
		<div>
			<label htmlFor="search" className="sr-only">
				Szukaj
			</label>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Search className="lucide lucide-search h-5 w-5 text-slate-300" />
				</div>
				<input
					id="search"
					placeholder="search"
					type="search"
					value={query}
					onChange={handleInputChange}
					className="w-full rounded-md border-0 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-800 ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
				/>
			</div>
		</div>
	);
};
