const LoginPage = require("../../../pages/loginPage");
const { test, expect } = require("../../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../../utils/testData");

const AUTH_TIMEOUT_MS = 110000;
const LOGIN_REJECTION_TIMEOUT_MS = 90000;

async function openLoginPage(page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  return loginPage;
}

function annotateCase(testInfo, { id, tags = [], priority = "P2" }) {
  testInfo.annotations.push({ type: "test_case", description: id });
  testInfo.annotations.push({ type: "priority", description: priority });

  for (const tag of tags) {
    testInfo.annotations.push({ type: "tag", description: tag });
  }
}

async function expectAuthenticated(loginPage, timeoutMs = AUTH_TIMEOUT_MS) {
  await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: timeoutMs });
  await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: timeoutMs });
}

async function expectRejected(loginPage, timeoutMs = LOGIN_REJECTION_TIMEOUT_MS) {
  const state = await loginPage.waitForLoginAttemptResult(timeoutMs);
  expect(state).not.toMatch(/^success_/);
  await expect(loginPage.getUsernameField()).toBeVisible();
}

module.exports = {
  test,
  expect,
  getTestData,
  requireValidCredentials,
  openLoginPage,
  annotateCase,
  expectAuthenticated,
  expectRejected
};
