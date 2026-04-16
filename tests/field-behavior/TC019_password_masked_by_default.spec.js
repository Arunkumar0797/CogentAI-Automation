const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC019 - Password Is Masked by Default", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify password input remains masked before user toggles visibility", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.getPasswordField()).toHaveAttribute("type", "password");
  });
});
