import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier"; // Used for disabling conflicting rules
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // Enables the plugin and recommended rules

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.log",
      "package-lock.json",
      "yarn.lock",
      "eslint.config.js", // Ignore the config file itself
    ],
  },

  // Base ESLint recommended rules
  pluginJs.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended, // Apply recommended TS rules

  // React configuration
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"], // Apply React rules broadly
    ...pluginReactConfig, // Apply recommended React rules
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Keep JSX feature enabled
      },
      globals: {
        ...globals.browser, // Add browser globals
      },
    },
    settings: {
      react: {
        version: "detect", // Keep React version detection
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off", // Keep this off for new JSX transform
      "react/prop-types": "off", // Keep this off as using TS
    },
  },

  // React Hooks configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Apply hooks rules to relevant files
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // Prettier configuration (must be last)
  eslintConfigPrettier, // Disables rules that conflict with Prettier
  pluginPrettierRecommended, // Integrates Prettier rules

  // Custom rules and overrides for the project
  {
    languageOptions: {
      globals: {
        ...globals.node, // Add Node.js globals
        ...globals.es2021, // Add ES2021 globals
        ...globals.jest, // Add Jest globals
      },
    },
    rules: {
      "prettier/prettier": "warn", // Keep Prettier issues as warnings
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Keep unused var rule
      // Add any other project-specific rule overrides here
    },
  },
];
