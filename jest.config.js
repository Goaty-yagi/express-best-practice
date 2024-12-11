module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Matches test files with .test.ts or .spec.ts
  moduleFileExtensions: ["ts", "js"], // Recognizes .ts and .js extensions
  roots: ["<rootDir>/tests"], // Where Jest will look for test files
  verbose: true, // Enables detailed test reports
  collectCoverage: true, // Enables coverage reporting
  coverageDirectory: "coverage", // Specifies the directory for coverage reports
};
