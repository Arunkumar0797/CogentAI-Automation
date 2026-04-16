const { test, expect } = require("../../utils/testBase");

test.describe("TC032 - Keyboard Navigation Using Tab", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify Tab key moves focus forward through login controls in logical order", async ({ page, loginPage, testData }) => {
        await loginPage.getUsernameField().focus();
    await page.keyboard.press("Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(loginPage.getLoginButton()).toBeFocused();
  });
});
