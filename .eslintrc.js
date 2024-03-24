const ERROR = 'error';
const OFF = 'off';
module.exports = {
  parser: '@typescript-eslint/parser',
  // TODO: switch on asap
  // https://typescript-eslint.io/linting/typed-linting/
  // parserOptions: {
  //   project: true,
  //   tsconfigRootDir: __dirname,
  // },
  extends: [
    'next/core-web-vitals',
    'plugin:storybook/recommended',

    'airbnb',
    'airbnb/hooks',

    'plugin:vitest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:testing-library/react',
    'plugin:import/recommended',
    'plugin:import/typescript',

    // TODO: switch on asap
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // should be last to override others
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'import', 'jsx-a11y', 'vitest', 'testing-library', '@typescript-eslint'],
  rules: {
    //  ============= GENERAL RULES SECTION ==============
    'no-alert': ERROR,
    'no-console': ERROR,
    'no-underscore-dangle': [
      ERROR,
      {
        enforceInMethodNames: false,
        allowAfterThis: true,
      },
    ],
    'class-methods-use-this': OFF,
    // we need @typescript-eslint/no-shadow instead below
    'no-shadow': OFF,
    // we need @typescript-eslint/no-unused-vars instead below
    'no-unused-vars': OFF,
    // 'max-lines': [
    //   ERROR,
    //   {
    //     max: 200,
    //     skipBlankLines: true,
    //     skipComments: true,
    //   },
    // ],

    // to be able to create empty functions, not sure about this. Maybe we should just have one noop function and use it
    'no-empty-function': [ERROR, { allow: ['arrowFunctions'] }],
    // opinionated but I think this is ok
    'no-plusplus': OFF,
    'padding-line-between-statements': [
      ERROR,
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: 'export',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: 'function',
        next: '*',
      },
    ],
    'prefer-arrow-callback': [ERROR, { allowNamedFunctions: true }],
    'sort-imports': [
      ERROR,
      {
        ignoreCase: false,
        // Sorting the import declarations is done by the `import/order` rule.
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    //  ============= PRETTIER RULES SECTION ==============
    'prettier/prettier': ERROR,

    //  ============= IMPORT RULES SECTION ==============
    // to let eslint know that these don't require extension in path
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // to let eslint know that test files can use devDependencies
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          'next.config.js',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.stories.tsx',
          '**/__tests__/**.ts',
          'vite.config.ts',
          'src/vitest-setup.ts',
          'src/test-utils/**',
          'src/storybook-utils/**',
          '.storybook/**',
          '**/*.stories.ts?(x)',
          // TODO: remove this line, organise all mocks one way
          'src/lib/repositories/MockedWalletBackend.ts',
        ],
      },
    ],
    // we agreed to use only named export
    'import/prefer-default-export': OFF,
    'import/no-default-export': ERROR,
    'import/no-unused-modules': [
      ERROR,
      {
        unusedExports: true,
        ignoreExports: [
          //
          './src/app/global-error.ts?(x)',
          './src/app/**/error.ts?(x)',
          './src/app/**/layout.ts?(x)',
          './src/app/**/page.ts?(x)',

          //   config
          'vite.config.ts',
          'src/vitest-setup.ts',

          'typings.d.ts',
          'svgr-template.js',

          //   tests
          './src/**/*.test.ts',

          // stories
          './src/**/*.stories.ts?(x)',
          './.storybook/main.ts',
          './.storybook/preview.ts?(x)',
        ],
      },
    ],
    'import/order': [
      ERROR,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/context',
            group: 'external',
          },
          {
            pattern: '@/config',
            group: 'external',
          },
          {
            pattern: '@/lib',
            group: 'external',
          },
          {
            pattern: '@/app/app/components',
            group: 'external',
          },
          {
            pattern: '@/app/components',
            group: 'external',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    //  ============= REACT RULES SECTION ==============
    // to enable for tsx
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // because next provides it during build
    'react/react-in-jsx-scope': OFF,
    // this is usefull for component decoration
    // premature optimization
    'react/jsx-no-constructed-context-values': OFF,
    'react/jsx-props-no-spreading': OFF,
    // I would prefer destructuring right after signature, but if this can be enforced automatically - we better enforce
    'react/destructuring-assignment': [ERROR, 'always', { destructureInSignature: 'always' }],
    // needed for old versions of react with class components
    'react/require-default-props': OFF,
    'react/jsx-no-bind': OFF,

    //  ============= NEXT RULES SECTION ==============
    // not valid for app router
    '@next/next/no-before-interactive-script-outside-document': OFF,

    // switching off for now, since we don't know how to use it properly
    '@next/next/no-img-element': OFF,

    //  ============= TS RULES SECTION ==============
    // since with ts usual one is not working
    '@typescript-eslint/no-shadow': OFF,

    // allow desctructuring to remove unneeded fields from object
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    //  ============= VITEST RULES SECTION ==============
    'vitest/no-focused-tests': ERROR,
  },
  overrides: [
    // for config files and pages, storybook
    {
      files: [
        'vite.config.ts',
        'typings.d.ts',
        'next.config.js',
        '**/*.stories.tsx',
        '.storybook/main.ts',
        '.storybook/preview.ts?(x)',
        '.storybook/main.ts',
        // next app router convention files:
        '**/layout.ts?(x)',
        '**/page.ts?(x)',
        '**/error.ts?(x)',
        'src/app/global-error.ts?(x)',
      ],
      rules: {
        'import/no-default-export': OFF,
      },
    },
    {
      files: ['.lintstagedrc.js', 'next.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
  ],
};
