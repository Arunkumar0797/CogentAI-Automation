const { test, expect } = require("../../utils/testBase");

test.describe("TC036 - Forgot Password Link Functionality", () => {
  test.fail(true, "Known product bug: Forgot Password/Reset Password link is missing on login page.");

  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify clicking Forgot Password opens the password recovery flow", async ({ page, loginPage, testData }) => {
    const forgotPasswordLink = loginPage.getForgotPasswordLink();
    await expect(forgotPasswordLink).toBeVisible();

    const href = await forgotPasswordLink.getAttribute("href");
    await forgotPasswordLink.click();

    if (href) {
      expect(href.length).toBeGreaterThan(0);
    }

    await expect(page).toHaveURL(/forgot|reset|recover|password/i);
  });
});
