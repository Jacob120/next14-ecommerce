"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";

export const ActiveLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	const urlObject = useMemo(() => ({ pathname: href }), [href]);

	return (
		<Link
			href={urlObject}
			aria-current={isActive ? "page" : undefined}
			className={clsx("mx-2", { underline: isActive })}
		>
			{children}
		</Link>
	);
};
