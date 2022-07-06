module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
  ],
  ignorePatterns: ['build', 'node_modules', 'coverage','tests', '.github'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
   'max-params': [1, 6],
  },
};
