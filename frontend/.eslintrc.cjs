module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "quotes": ["error", "double"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": 0,
    "require-jsdoc": 0,
    "max-len": 0
  },
}
