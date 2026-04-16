const { test, expect } = require("../../utils/testBase");

test.describe("TC033 - Reverse Keyboard Navigation Using Shift+Tab", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify Shift+Tab moves focus backward through login controls", async ({ page, loginPage, testData }) => {
        await loginPage.getLoginButton().focus();
    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getUsernameField()).toBeFocused();
  });
});
