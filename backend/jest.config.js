module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
    testMatch: [
        "**/__tests__/*.ts?(x)"
    ],
    // transform: {
    //   '^.+\\.(ts|tsx)?$': 'ts-jest',
    //   "^.+\\.(js|jsx)$": "babel-jest",
    // }
  };