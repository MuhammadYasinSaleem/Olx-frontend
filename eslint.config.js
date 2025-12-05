import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/coverage/**',
      '**/.vite/**',
    ],
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      import: pluginImport,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': pluginTs,
    },
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],

      'no-console': 'warn',
      'no-undef': 'error',
      'consistent-return': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/'],
            [
              '^@components',
              '^@assets',
              '^@utils',
              '^@types',
              '^@store',
              '^@hooks',
              '^@services',
            ],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTs,
      parserOptions: { project: './tsconfig.json' },
    },
  },
];
