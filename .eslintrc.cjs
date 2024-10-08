module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['react-refresh'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/no-multi-comp': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-object-type': ['error', { allowWithName: 'Props$' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
