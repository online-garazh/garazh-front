const project = ['tsconfig.eslint.json'];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project,
  },
  plugins: ['import', 'jsx-a11y', 'react-hooks', '@typescript-eslint', '@tanstack/query', 'mui-unused-classes'],
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:valtio/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project,
      },
    },
    'import/internal-regex': '^~/',
    'import/ignore': ['qs'],
  },
  rules: {
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/jsx-boolean-value': 'error',
    'react/no-string-refs': 'error',
    'react/display-name': ['error'],
    'react/jsx-newline': ['error', { prevent: true, allowMultilines: true }],
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'if', next: 'if' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['expression', 'function'], next: '*' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      { blankLine: 'always', prev: 'import', next: 'export' },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],
    'prefer-destructuring': 'error',
    'no-negated-condition': 'error',
    'no-use-before-define': 'error',
    'no-nested-ternary': 'error',
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: ['Object'],
        area: ['Area'],
        'input[type="image"]': ['InputImage'],
      },
    ],
    'object-shorthand': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'debug', 'info'],
      },
    ],
    'max-len': ['error', 160],
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: 'error',
    curly: ['error', 'multi', 'consistent'],
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type'],
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/indent': 'off',
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img'],
        img: ['Image'], // import Image from 'next/image'
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'mui-unused-classes/unused-classes': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@tanstack/query/exhaustive-deps': 'error',
    'valtio/state-snapshot-rule': 'error',
    'valtio/avoid-this-in-proxy': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'import/no-anonymous-default-export': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        alphabetize: { order: 'asc' },
      },
    ],
  },
  overrides: [
    {
      files: ['*.+(js|spec.ts|spec.tsx)'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',

        'import/no-unresolved': ['error', { commonjs: true }],
      },
    },
  ],
};
