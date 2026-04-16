const { test, expect } = require("../../utils/testBase");

test.describe("TC013 - Validation for Empty Password", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is blocked when password is empty", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.validEmail, "");

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Password is required");
  });
});
