const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/order': null,
    'order/properties-order': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'color-hex-length': 'short',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
