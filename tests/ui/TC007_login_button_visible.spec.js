const { test, expect } = require("../../utils/testBase");

test.describe("TC007 - Login Button Is Visible", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("@smoke Verify login page displays a visible Login button", async ({ page, loginPage, testData }) => {
        await expect(loginPage.getLoginButton()).toBeVisible();
  });
});
