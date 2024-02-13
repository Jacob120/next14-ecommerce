"use client";
import { useState } from "react";

export const ProductCounter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount((prev) => prev + 1)}>+</button>
			<input readOnly value={count} />
			<button onClick={() => setCount((prev) => prev - 1)}>-</button>
		</div>
	);
};
