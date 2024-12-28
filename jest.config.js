module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^src_root/(.*)$': '<rootDir>/src/$1',
    '^tests_root/(.*)$': '<rootDir>/tests/$1'
  }
};
