const rootConfig = require('../../eslint.config.js');
const globals = require('globals');
const eslintPluginReact = require('eslint-plugin-react');

module.exports = [
  ...rootConfig,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: eslintPluginReact,
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['public/', 'dist/', 'build/', 'node_modules/', '.vite/'],
  },
];
