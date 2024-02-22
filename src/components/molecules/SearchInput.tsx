"use client";
import debounce from "lodash.debounce";
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
		<input
			placeholder="search"
			type="search"
			value={query}
			onChange={handleInputChange}
			className="hidden md:block"
		/>
	);
};
