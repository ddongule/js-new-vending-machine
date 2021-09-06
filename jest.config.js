// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};

module.exports = config;
