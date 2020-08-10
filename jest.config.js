module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest',
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],

  setupFiles: ['<rootDir>/src/jest.setup.ts'],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
}
