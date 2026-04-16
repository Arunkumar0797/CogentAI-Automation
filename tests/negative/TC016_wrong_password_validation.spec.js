const { test, expect } = require("../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC016 - Validation for Wrong Password", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login is rejected when password is incorrect", async ({ page }) => {
    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = new LoginPage(page);
    await loginPage.login(data.validEmail, data.wrongPassword);
    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
