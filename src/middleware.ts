import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/categories/(.*)",
		"/collections/(.*)",
		"/product/(.*)",
		"/products/(.*)",
	],
});
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
