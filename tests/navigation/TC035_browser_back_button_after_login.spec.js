const { test, expect } = require("../../utils/testBase");
const { getTestData, requireValidCredentials } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC035 - Browser Back Button Behavior After Login", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("@smoke Verify browser back does not expose unsecured login state after successful login", async ({ page }) => {
    test.setTimeout(120000);
    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = new LoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expect(loginPage.getDashboardElement()).toBeVisible({ timeout: 110000 });
    await expect(loginPage.getNewChatInputElement()).toBeVisible({ timeout: 110000 });

    await page.goBack();
    await expect(page).not.toHaveURL(/login|auth|signin/i);
  });
});
