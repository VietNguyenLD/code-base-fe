// eslint.config.mjs
import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default defineConfig([
  // Base config của Next.js (tương đương "next/core-web-vitals")
  ...next,

  // TypeScript + React + Tailwind cho file code chính
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TS rules
      // "@typescript-eslint/no-explicit-any": "off",

      // React hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Ignore thư mục build
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
