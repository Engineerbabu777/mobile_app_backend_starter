module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'refactor', 'test', 'style', 'add'],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
  },
};
