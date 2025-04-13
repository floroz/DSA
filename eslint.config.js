import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier"; 
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.log",
      "package-lock.json",
      "yarn.lock",
    ],
  },

  // Base ESLint recommended rules
  pluginJs.configs.recommended,
  // TypeScript configuration
  ...tseslint.configs.recommended, // Apply recommended TS rules

  // Prettier configuration (must be last)
  eslintConfigPrettier, // Disables rules that conflict with Prettier
  pluginPrettierRecommended, // Integrates Prettier rules

  // Custom rules and overrides for the project
  {
    languageOptions: {
      globals: {
        ...globals.node, // Add Node.js globals
        ...globals.es2021, // Add ES2021 globals
      },
    },
    rules: {
      "prettier/prettier": "warn", // Keep Prettier issues as warnings
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Keep unused var rule
    },
  },
];
