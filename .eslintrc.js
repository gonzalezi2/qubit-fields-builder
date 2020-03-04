module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      'standard',
      'standard-jsx',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    env: {
      browser: true,
      node: true,
      es6: true
    },
    plugins: ['@typescript-eslint', 'react'],
    settings: {
      "react": {
        "pragma": "h"
      }
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module' // Allows for the use of imports
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      "react/jsx-no-bind": ["error", {
        "allowArrowFunctions": true,
        "allowBind": false,
        "ignoreRefs": true
      }],
      "react/no-did-update-set-state": "error",
      "react/react-in-jsx-scope": "error",
      "standard/no-callback-literal": "off",
      "prefer-promise-reject-errors": ["error", {"allowEmptyReject": true}]
    },
    overrides: [
      // Override some TypeScript rules just for .js files
      {
        files: ['*.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off'
        }
      }
    ]
  };