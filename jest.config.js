module.exports = {
    moduleNameMapper:{
    "\\.(css)$":"<rootDir>/src/mocks/styleMock.js"
    },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};

