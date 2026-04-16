const { test, expect } = require("../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC018 - Credentials Case Sensitivity Check", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login behavior for credentials with different letter casing", async ({ page }) => {
    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = new LoginPage(page);
    const alteredUsername = data.validUsername.toUpperCase();
    const alteredPassword = data.validPassword.toLowerCase();

    await loginPage.login(alteredUsername, alteredPassword);
    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
