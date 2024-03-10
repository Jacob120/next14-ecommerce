import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl">
			<div className="mx-auto w-full py-10">
				<SignUp />
			</div>
		</div>
	);
}
