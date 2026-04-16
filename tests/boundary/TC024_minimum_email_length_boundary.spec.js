const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC024 - Boundary Check for Minimum Email Length", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate system behavior for login attempt with minimum-length valid email format", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);

    await loginPage.login(data.minimumEmail, data.wrongPassword);
    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    expect(await loginPage.getUsernameField().inputValue()).toBe(data.minimumEmail);
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Please enter a valid email address");
  });
});
