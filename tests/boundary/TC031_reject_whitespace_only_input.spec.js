const { test, expect } = require("../../utils/testBase");

test.describe("TC031 - Reject Whitespace-Only Username and Password", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is rejected when both fields contain only whitespace", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.whitespaceOnly, data.whitespaceOnly);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });
});
