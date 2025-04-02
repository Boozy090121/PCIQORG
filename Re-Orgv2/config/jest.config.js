module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/serviceWorker.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@core/(.*)$': '<rootDir>/src/components/Core/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/UI/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true,
}; 