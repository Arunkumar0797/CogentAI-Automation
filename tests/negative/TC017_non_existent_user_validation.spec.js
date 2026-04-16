const { test, expect } = require("../../utils/testBase");

test.describe("TC017 - Validation for Non-Existent User", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is rejected for a non-existent user account", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.validPassword);

    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
