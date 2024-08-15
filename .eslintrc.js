module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecamFeatures: {
      jsx: true,
    },
    ecmaVersion: 14,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "object", "type"],
        pathGroups: [
          {
            pattern:
              "@{app,contants,services,slices,interfaces,selectors,components,common,hooks,utils,enums}/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@{movie,auth,admin,system}/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "import/prefer-default-export": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  overrides: [
    {
      files: ["**/*Slice.*"],
      rules: {
        "no-param-reassign": "off",
      },
    },
    {
      files: ["**/Components/Form/**/*"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  ignorePatterns: ["**/*.d.ts", "**/*.test.*", "node_modules/", "build/", "dist/", "*rc.js", "*config.js"],
};
