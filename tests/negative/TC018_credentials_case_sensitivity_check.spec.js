const { test, expect, requireValidCredentials } = require("../../utils/testBase");

test.describe("TC018 - Credentials Case Sensitivity Check", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login behavior for credentials with different letter casing", async ({ page, loginPage, testData }) => {
    const data = testData;
    requireValidCredentials(test, data);

        const alteredUsername = data.validUsername.toUpperCase();
    const alteredPassword = data.validPassword.toLowerCase();

    await loginPage.login(alteredUsername, alteredPassword);
    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
