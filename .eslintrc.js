module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')], // umi默认eslint规则
  globals: {
    BASE_URL: true,
    BASE_PREFIX: true,
    IS_APP: true,
    APP_MARK: true,
    PRODUCT_NAME: true,
  },
  rules: {
    'no-return-await': 0,
    'no-void': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }], // console.log 报警告,不会报错
    'react/jsx-curly-newline': 0, // react规则禁用,不会报错
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
    'no-useless-escape': 0,
    'no-underscore-dangle': ['error', { allow: ['_eventCallbackMap'] }],
  },
};
