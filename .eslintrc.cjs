module.exports = {
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
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
  },
};
