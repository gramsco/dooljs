module.exports = {
  extends: ["airbnb-base"],
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    "jest/globals": true,
  },
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: [0, "double"],
    "comma-dangle": [0],
  },
};
