const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC033 - Reverse Keyboard Navigation Using Shift+Tab", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify Shift+Tab moves focus backward through login controls", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.getLoginButton().focus();
    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getUsernameField()).toBeFocused();
  });
});
