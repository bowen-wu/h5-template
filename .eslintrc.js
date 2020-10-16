module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    BASE_URL: true,
    BASE_PREFIX: true,
    IS_APP: true,
    APP_MARK: true,
    PRODUCT_NAME: true,
  },
  rules: {
    'no-void': 0,
    'no-console': ['error', { allow: ['warn'] }],
    'react/jsx-curly-newline': 0,
    'prefer-object-spread': 0,
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true },
    ],
    'react/jsx-no-bind': [
      'error',
      { allowBind: true, allowArrowFunctions: true },
    ],
  },
};
