const { test, expect } = require("../../utils/testBase");

test.describe("TC015 - Validation for Invalid Email Format", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is rejected when email format is invalid", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.invalidEmailFormat, data.validPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 3000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Please enter a valid email address");
  });
});
