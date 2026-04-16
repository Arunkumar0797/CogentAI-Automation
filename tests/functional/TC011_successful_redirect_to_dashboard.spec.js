const { test, expect } = require("../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC011 - Redirect to Start New Chat Workspace After Successful Login", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("@smoke Verify successful login redirects the user to Start workspace for initiating a new chat", async ({ page }) => {
    test.setTimeout(120000);
    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = new LoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: 110000 });
    await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: 110000 });
    await expect(page).not.toHaveURL(/login|auth|signin/i);
  });
});
