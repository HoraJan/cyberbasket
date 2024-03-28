module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['generated', 'vite*.*', 'temp'],
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: [
          './tsconfig.json',
        ],
      },
    },
  },
  globals: {
    React: true,
    context: true,
    JSX: true,
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'react-hooks',
    'unused-imports',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', 'tsx'] }],
    'import/extensions': [1, {
      tsx: 'never',
    }],
    'import/prefer-default-export': 0,
    'object-curly-spacing': ['warn', 'always'],
    'react/function-component-definition': 0,
    quotes: [1, 'single'],
    'max-len': [1, { code: 150 }],
    'react/jsx-props-no-spreading': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-key': 'error',
    'arrow-body-style': 0,
    'react/jsx-boolean-value': 0,
    'object-curly-newline': [2, { consistent: true }],
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    'react/require-default-props': 0,
    'jsx-a11y/label-has-associated-control': 1,
    'operator-linebreak': ['warn'],
    'consistent-return': ['off'],
    'react-hooks/exhaustive-deps': 2,
  },
  overrides: [
    {
      files: [
        '**/test/**/*.?(ts|tsx)',
      ],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: [
        '**/*.js',
      ],
      rules: {
        'no-unused-vars': 1,
      },
    },
  ],
};
