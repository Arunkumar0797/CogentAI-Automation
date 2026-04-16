const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC017 - Validation for Non-Existent User", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login is rejected for a non-existent user account", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.nonExistentUser, data.validPassword);

    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
