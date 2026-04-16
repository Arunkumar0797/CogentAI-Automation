const { test, expect } = require("../../utils/testBase");

test.describe("TC021 - Email or Username Retained After Failed Login", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify entered email or username remains in the field after failed login", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.wrongPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    await expect(loginPage.getUsernameField()).toHaveValue(data.nonExistentUser);
  });
});
