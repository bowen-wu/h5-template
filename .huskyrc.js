module.exports = {
  hooks: {
    'pre-commit': 'yarn lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
