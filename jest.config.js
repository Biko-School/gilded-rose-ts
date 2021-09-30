module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/blueprint-templates/"],
  collectCoverageFrom: ["app/gilded-rose.ts"],
  collectCoverage: true,
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};
