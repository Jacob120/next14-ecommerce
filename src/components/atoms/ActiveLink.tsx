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
	const urlObject = useMemo(() => ({ pathname: href }), [href]);

	const isActive = useMemo(() => {
		// Normalize and remove query parameters for comparison
		const path = pathname.split("?")[0];
		const normalizedPath = pathname.endsWith("/")
			? pathname.slice(0, -1)
			: path;
		const normalizedHref = href.endsWith("/")
			? href.slice(0, -1)
			: href;

		if (normalizedHref === "") {
			return normalizedPath === "";
		}
		return (
			normalizedPath === normalizedHref ||
			normalizedPath?.startsWith(`${normalizedHref}/`)
		);
	}, [pathname, href]);

	return (
		<Link
			href={urlObject}
			aria-current={isActive ? "page" : undefined}
			className={clsx(
				"mx-2",
				"flex h-full w-full  items-center justify-center border-b-2 px-1 py-2 text-center text-sm font-medium text-slate-500 transition duration-150 ease-in-out hover:border-slate-300 hover:text-slate-900  focus:text-slate-900 focus:outline-none",
				{
					"border-transparent": !isActive,
					"border-blue-500": isActive,
				},
			)}
		>
			{children}
		</Link>
	);
};
