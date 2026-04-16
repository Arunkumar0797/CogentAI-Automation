const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC012 - Validation for Empty Username", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login is blocked when username is empty", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login("", data.validPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
  });
});
