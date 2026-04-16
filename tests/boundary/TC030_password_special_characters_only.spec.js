const { test, expect } = require("../../utils/testBase");

test.describe("TC030 - Password with Special Characters Only", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login behavior for password containing only special characters", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.specialCharacterOnlyPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Password must be at least 6 characters");
  });
});
