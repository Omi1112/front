// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint"
  },
  extends: [
    "prettier",
    "prettier/standard",
    'plugin:vue/essential',
    "plugin:vue/recommended"
  ],
  plugins: ["vue", "prettier"],
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
      }
    }],
    // "generator-star-spacing": "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "properties": "always",
    // "ignoreDestructuring": false,
    // "prettier/prettier": [
    //   "error",
    //   {
    //     trailingComma: "none",
    //     singleQuote: true,
    //     semi: false,
    //     printWidth: 120,
    //   }
    // ]
  }
};
