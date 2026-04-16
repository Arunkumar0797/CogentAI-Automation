const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC007 - Login Button Is Visible", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("@smoke Verify login page displays a visible Login button", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.getLoginButton()).toBeVisible();
  });
});
