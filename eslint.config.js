import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import securityPlugin from "eslint-plugin-security";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      security: securityPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        alias: {
          map: [
            ["@components", "./src/components"],
            ["@pages", "./src/pages"],
            ["@errors", "./src/pages/errors"],
            ["@hooks", "./src/hooks"],
            ["@metadata", "./src/metadata"],
            ["@validate", "./src/validate"],
            ["@services", "./src/services"],
            ["@utils", "./src/utils"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,

      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/prop-types": "warn",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".jsx", ".js", ".tsx"] },
      ],
      "react/react-in-jsx-scope": "off",

      "no-debugger": "warn",
      "prefer-const": "warn",
      "no-duplicate-imports": "error",
      "consistent-return": "error",
      "no-var": "error",

      "no-eval": "error",
      "no-new-func": "error",
      "security/detect-non-literal-regexp": "warn",

      "no-unused-expressions": "warn",
      "array-callback-return": "warn",

      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/no-absolute-path": "error",
      "import/no-cycle": "off",
      "prettier/prettier": "error",
    },
  },
];
