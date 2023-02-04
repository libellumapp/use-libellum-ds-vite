module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(t|j)s(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  testMatch: [
    '<rootDir>/src/**/*.test.(t|j)sx',
    '<rootDir>/src/**/*.test.(t|j)s',
  ],
}
