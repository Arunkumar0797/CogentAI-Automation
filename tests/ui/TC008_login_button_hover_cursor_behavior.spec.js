const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC008 - Cursor Behavior on Login Button Hover", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify hovering on Login button shows clickable cursor behavior", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const button = loginPage.getLoginButton();
    await button.hover();
    const cursor = await button.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor).toBe("pointer");
  });
});
