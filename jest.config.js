module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/src/tests/**/*.test.js'
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js']
};