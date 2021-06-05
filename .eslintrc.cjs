module.exports = {
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    "jest/globals": true,
  },
  plugins: ["jest", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: [0, "double"],
    "comma-dangle": [0],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
