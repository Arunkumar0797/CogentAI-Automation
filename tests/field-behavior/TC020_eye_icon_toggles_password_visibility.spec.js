const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC020 - Eye Icon Toggles Password Visibility", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify clicking eye icon toggles password between masked and visible states", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const passwordField = loginPage.getPasswordField();

    await expect(passwordField).toHaveAttribute("type", "password");
    await loginPage.togglePasswordVisibility();
    await expect(passwordField).toHaveAttribute("type", "text");
  });
});
