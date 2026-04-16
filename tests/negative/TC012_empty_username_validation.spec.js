const { test, expect } = require("../../utils/testBase");

test.describe("TC012 - Validation for Empty Username", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is blocked when username is empty", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login("", data.validPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
  });
});
