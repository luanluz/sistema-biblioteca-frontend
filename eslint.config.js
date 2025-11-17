// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-plugin-prettier');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        plugins: {
            import: importPlugin,
            prettier,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            // Prettier
            'prettier/prettier': 'warn',
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            indent: ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'space-infix-ops': ['error', { int32Hint: false }],
            'no-var': 'error',
            'space-before-function-paren': ['error', 'never'],
            eqeqeq: ['error', 'always'],
            'block-spacing': ['error', 'always'],
            'func-names': ['error', 'always'],
            'vars-on-top': 'error',
            camelcase: 'error',
            'no-implicit-globals': 'error',
            'no-unused-labels': 'error',
            'no-unreachable': 'error',
            'prefer-arrow-callback': 'warn',
            'arrow-body-style': ['error', 'as-needed'],

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-floating-promises': 'off',

            // Angular (Cleaned for Angular 20 Standalone)
            '@angular-eslint/component-class-suffix': 'off',
            '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
            '@angular-eslint/no-empty-lifecycle-method': 'warn',
            '@angular-eslint/contextual-lifecycle': 'warn',

            // Import Sorting
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: '@angular/**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '**/*.module',
                            group: 'internal',
                            position: 'before',
                        },
                    ],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                },
            ],

            'import/no-unresolved': 'error',
            'import/no-duplicates': 'error',
            'import/first': 'error',
            'import/newline-after-import': ['warn', { count: 1 }],

            // General
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
);
