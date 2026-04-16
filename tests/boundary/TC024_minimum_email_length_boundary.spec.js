const { test, expect } = require("../../utils/testBase");

test.describe("TC024 - Boundary Check for Minimum Email Length", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate system behavior for login attempt with minimum-length valid email format", async ({ page, loginPage, testData }) => {
    const data = testData;
    
    await loginPage.login(data.minimumEmail, data.wrongPassword);
    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    expect(await loginPage.getUsernameField().inputValue()).toBe(data.minimumEmail);
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Please enter a valid email address");
  });
});
