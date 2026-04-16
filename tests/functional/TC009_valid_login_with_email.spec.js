const { test, expect } = require("../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC009 - Valid Login Using Email", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("@smoke Verify user can log in successfully with valid email and password", async ({ page }) => {
    test.setTimeout(120000);
    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = new LoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: 110000 });
    await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: 110000 });
  });
});
