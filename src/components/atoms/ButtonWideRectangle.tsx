"use client";

import { useFormStatus } from "react-dom";

type ButtonWideRectangleProps = {
	actionName: string;
};

export const ButtonWideRectangle = ({
	actionName,
}: ButtonWideRectangleProps) => {
	const formStatus = useFormStatus();

	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white disabled:cursor-wait disabled:bg-slate-300"
		>
			{actionName}
		</button>
	);
};
