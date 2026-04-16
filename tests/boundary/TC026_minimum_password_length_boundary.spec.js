const { test, expect } = require("../../utils/testBase");

test.describe("TC026 - Boundary Check for Minimum Password Length", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate system behavior for login attempt with minimum-length password", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.minimumPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Password must be at least 6 characters");
  });
});
