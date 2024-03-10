import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl">
			<div className="mx-auto py-10">
				<SignIn />;
			</div>
		</div>
	);
}
