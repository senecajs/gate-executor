module.exports = {
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest",{sourcemap:true}]
  },
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  watchPathIgnorePatterns: ['.*.js$'],
};
