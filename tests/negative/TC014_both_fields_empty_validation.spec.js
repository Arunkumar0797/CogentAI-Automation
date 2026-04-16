const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC014 - Validation for Both Fields Empty", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login is blocked when both username and password are empty", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("", "");

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });
});
