type InputTextAreaProps = {
	label: string;
	name: string;
};

export const InputTextArea = ({
	label,
	name,
}: InputTextAreaProps) => {
	return (
		<label htmlFor={name}>
			<span className="text-xs font-medium text-gray-700">
				{label}
			</span>
			<textarea
				name={name}
				className="mt-1 block w-full rounded-md border border-gray-300 px-1 py-2 font-light shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
			/>
		</label>
	);
};
