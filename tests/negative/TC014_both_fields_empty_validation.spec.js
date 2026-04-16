const { test, expect } = require("../../utils/testBase");

test.describe("TC014 - Validation for Both Fields Empty", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is blocked when both username and password are empty", async ({ page, loginPage, testData }) => {
    await loginPage.login("", "");

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });
});
