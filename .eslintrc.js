module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'Forbidden non-null assertion': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'comma-spacing': 'off'
  },
  ignorePatterns: ['build', 'node_modules', 'coverage','tests']
}
