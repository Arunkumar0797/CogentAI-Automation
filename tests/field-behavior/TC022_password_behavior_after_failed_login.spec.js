const { test, expect } = require("../../utils/testBase");

test.describe("TC022 - Password Field Behavior After Failed Login", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate password field behavior after failed login according to app policy", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.wrongPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const currentPasswordValue = await loginPage.getPasswordField().inputValue();
    expect(currentPasswordValue).toBe(data.wrongPassword);
  });
});
