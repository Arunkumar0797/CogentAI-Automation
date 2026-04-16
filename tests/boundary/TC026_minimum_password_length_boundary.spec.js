const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC026 - Boundary Check for Minimum Password Length", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate system behavior for login attempt with minimum-length password", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.nonExistentUser, data.minimumPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Password must be at least 6 characters");
  });
});
