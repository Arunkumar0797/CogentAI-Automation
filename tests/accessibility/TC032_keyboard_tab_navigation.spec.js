const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC032 - Keyboard Navigation Using Tab", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify Tab key moves focus forward through login controls in logical order", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.getUsernameField().focus();
    await page.keyboard.press("Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(loginPage.getLoginButton()).toBeFocused();
  });
});
