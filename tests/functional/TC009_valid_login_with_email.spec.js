const { test, expect, requireValidCredentials } = require("../../utils/testBase");

test.describe("TC009 - Valid Login Using Email", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("@smoke Verify user can log in successfully with valid email and password", async ({ page, loginPage, testData }) => {
    test.setTimeout(120000);
    const data = testData;
    requireValidCredentials(test, data);

    await loginPage.login(data.validEmail, data.validPassword);
    await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: 110000 });
    await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: 110000 });
  });
});
