import React from "react";
import { SuggestedProductsList } from "@/components/organisms/SuggestedProducts";
import { SuggestedCollections } from "@/components/organisms/SuggestedCollections";

export default function Home() {
	return (
		<section>
			<SuggestedCollections />
			<SuggestedProductsList />
		</section>
	);
}
