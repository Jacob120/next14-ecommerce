import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/organisms/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				<section className=" mx-auto">{children}</section>
				<footer className=" mx-auto flex w-full bg-gray-100 sm:py-4">
					<p className="mx-auto">
						© {new Date().getFullYear()} Next.js, Inc.
					</p>
				</footer>
			</body>
		</html>
	);
}
