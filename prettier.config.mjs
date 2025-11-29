export default {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^@components/(.*)$', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
