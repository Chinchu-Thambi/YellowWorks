module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!./contentful/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/public/**',
    '!./tests/**',
    '!**/vendor/**',
  ],
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/cypress/',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/file-mock.js',
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'cypress'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: [
    '<rootDir>/jest-loadershim.js',
    './tests/__mocks__/client.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: [
    "node_modules",
    ".stories.js",
    ".spec.js"
],
};
