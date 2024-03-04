export const Select = ({
	handleSortChange,
}: {
	handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
	return (
		<select
			onChange={handleSortChange}
			className="block w-48 cursor-pointer rounded-md border-gray-300 px-2 py-1 text-sm font-light shadow-sm outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 lg:mt-1"
		>
			<option value="DEFAULT-ASC">Name (A-Z)</option>
			<option value="DEFAULT-DESC">Name (Z-A)</option>
			<option value="PRICE-ASC" data-testid="sort-by-price">
				Price Low to High
			</option>
			<option value="PRICE-DESC" data-testid="sort-by-price">
				Price High to Low
			</option>
			<option value="RATING-ASC" data-testid="sort-by-rating">
				Rating Low to High
			</option>
			<option value="RATING-DESC" data-testid="sort-by-rating">
				Rating High to Low
			</option>
		</select>
	);
};
