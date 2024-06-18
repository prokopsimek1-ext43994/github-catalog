module.exports = {
  ignorePatterns: [".eslintrc.js", "tailwind.config.js", "postcss.config.js", "next.config.js"],
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "tailwindcss/enforces-shorthand": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        whitelist: [
          "^(font)\\-(heading|semi\\-bold)",
          "^(bg)-(background-dark)",
          "^(bg)-(background-light)",
          "^(text)-(muted\\-foreground)",
          "^(bg)-(accent)",
          "text-accent-foreground",
          "^(animate)-(fadeIn)"
        ]
      }
    ],
    "prettier/prettier": [
      "warn",
      {},
      {
        usePrettierrc: true
      }
    ]
  }
}