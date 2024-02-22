export const formatNameToUrl = (name: string) => {
	return name.toLowerCase().replace(/ /g, "-");
};
