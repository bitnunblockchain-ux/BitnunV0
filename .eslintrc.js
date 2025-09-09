module.exports = {
  extends: ["next/core-web-vitals", "@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Allow unescaped entities that are already properly escaped
    "react/no-unescaped-entities": "error",
    // Allow unused vars with underscore prefix
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // Allow any type when necessary
    "@typescript-eslint/no-explicit-any": "warn",
    // Allow empty interfaces for extending
    "@typescript-eslint/no-empty-interface": "warn",
    // Disable some overly strict rules for development
    "react-hooks/exhaustive-deps": "warn",
    // Allow console logs for debugging
    "no-console": "warn",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
