const { test, expect, requireValidCredentials } = require("../../utils/testBase");

test.describe("TC011 - Redirect to Start New Chat Workspace After Successful Login", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("@smoke Verify successful login redirects the user to Start workspace for initiating a new chat", async ({ page, loginPage, testData }) => {
    test.setTimeout(120000);
    const data = testData;
    requireValidCredentials(test, data);

    await loginPage.login(data.validEmail, data.validPassword);
    await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: 110000 });
    await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: 110000 });
    await expect(page).not.toHaveURL(/login|auth|signin/i);
  });
});
