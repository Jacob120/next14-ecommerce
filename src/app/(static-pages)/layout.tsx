export default function StaticLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <div className="mx-auto max-w-md text-center">{children}</div>;
}
