import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,
	schema: "https://graphql.hyperfunctor.com/graphql",
	documents: [
		"src/graphql/**/*.graphql",
		"src/{app, ui, api, lib}/**/*.{ts,tsx}",
	],
	generates: {
		"src/gql/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				skipTypename: true,
				documentMode: "string",
			},
		},
	},
};

// eslint-disable-next-line import/no-default-export
export default config;
