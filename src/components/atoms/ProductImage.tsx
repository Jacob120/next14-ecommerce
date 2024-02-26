import React from "react";
import Image from "next/image";

export const ProductImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="aspect-square w-full overflow-hidden rounded-md ">
			<Image
				priority
				src={src}
				alt={alt}
				width={420}
				height={420}
				className="h-full w-full transform object-cover object-center p-4 transition duration-300 ease-in-out  hover:scale-105"
			/>
		</div>
	);
};
