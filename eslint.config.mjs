import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  // {
  //   rules: {
  //     '@typescript-eslint/no-explicit-any': 'off', // allows using "any"
  //   },
  // },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['.node_modules/*', 'dist/*', 'coverage/*', '*.test.ts', 'tests/**/*.spec.ts'],
  },
];
