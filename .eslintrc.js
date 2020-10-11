module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'padding-line-between-statements': [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
    ],
    'no-else-return': "error",
    'no-lonely-if': "error",
    'no-mixed-operators': "error",
    'eqeqeq': "error",
    'no-nested-ternary': "error",
    'default-case': "error",
    'switch-colon-spacing': "error",
    'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 1 }],
    'arrow-body-style': ["error", "as-needed"],
    'consistent-return': "error",
    'no-shadow': 'error',
    'object-shorthand': 'error',
    'no-param-reassign': 'error',
    'no-unneeded-ternary': 'error',
    'max-len': [
      'error',
      {
        code: 150,
        ignoreComments: true,
        ignoreUrls: true,
        ignorePattern: 'd="([\\s\\S]*?)"', // SVG path d=
      },
    ],
    'function-paren-newline': ["error", "multiline"],
    'prefer-template': 'error',
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "{}": {
            "message": "Do not use empty object this way, if the content is unknown please use Record<string, unknown>",
            "fixWith": "Record<string, unknown>"
          }
        }
      }
    ],
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      },
    }],
    "@typescript-eslint/array-type": ["error", { "default": "array" }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
