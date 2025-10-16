import eslintPluginAstro from 'eslint-plugin-astro';
import perfectionist from 'eslint-plugin-perfectionist';
import tsParser from '@typescript-eslint/parser';

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    ...perfectionist.configs['recommended-natural'],
    rules: {
      'perfectionist/sort-imports': ['error'],
    },
  },
];
