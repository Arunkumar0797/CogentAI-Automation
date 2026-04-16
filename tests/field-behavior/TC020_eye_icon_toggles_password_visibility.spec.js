const { test, expect } = require("../../utils/testBase");

test.describe("TC020 - Eye Icon Toggles Password Visibility", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify clicking eye icon toggles password between masked and visible states", async ({ page, loginPage, testData }) => {
        const passwordField = loginPage.getPasswordField();

    await expect(passwordField).toHaveAttribute("type", "password");
    await loginPage.togglePasswordVisibility();
    await expect(passwordField).toHaveAttribute("type", "text");
  });
});
