const { test, expect } = require("../../utils/testBase");

test.describe("TC006 - Password Visibility Icon Is Present", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify password field contains an eye or eye-slash visibility icon", async ({ page, loginPage, testData }) => {
        await expect(loginPage.getEyeToggle()).toBeVisible();
  });
});
