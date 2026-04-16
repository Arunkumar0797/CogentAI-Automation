const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC031 - Reject Whitespace-Only Username and Password", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate login is rejected when both fields contain only whitespace", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.whitespaceOnly, data.whitespaceOnly);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });
});
