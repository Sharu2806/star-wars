module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "node_modules/axios/.+\\.(j|t)sx?$": "ts-jest",
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
},
  transformIgnorePatterns: [
    "node_modules/(?!axios/.*)"
  ]
}
