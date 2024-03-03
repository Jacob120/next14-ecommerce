import { Star } from "lucide-react";
import { useState } from "react";

export const StarRatingIcon = async () => {
	const [hover, setHover] = useState(null);

	return (
		<div className="flex">
			{[...Array<number>(5)].map((_, index) => {
				const ratingValue: number = index + 1;

				return (
					<label key={ratingValue}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => onChange(ratingValue)}
							className="hidden"
						/>
						<Star
							className={`cursor-pointer transition-colors ${
								ratingValue <= (hover || rating)
									? "text-yellow-500"
									: "text-gray-400"
							}`}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
							size={24}
						/>
					</label>
				);
			})}
		</div>
	);
};
