const testData = require("../test-data/testData.json");

function getTestData() {
  return {
    ...testData,
    validEmail: process.env.VALID_EMAIL || testData.validEmail,
    validUsername: process.env.VALID_USERNAME || testData.validUsername,
    validPassword: process.env.VALID_PASSWORD || testData.validPassword
  };
}

function requireValidCredentials(test, data) {
  const placeholders = ["CHANGE_ME_EMAIL", "CHANGE_ME_USERNAME", "CHANGE_ME_PASSWORD"];

  if (
    placeholders.includes(data.validEmail) ||
    placeholders.includes(data.validUsername) ||
    placeholders.includes(data.validPassword)
  ) {
    test.skip(true, "Set VALID_EMAIL / VALID_USERNAME / VALID_PASSWORD (or update test-data/testData.json).");
  }
}

module.exports = { getTestData, requireValidCredentials };
