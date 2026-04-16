const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC022 - Password Field Behavior After Failed Login", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate password field behavior after failed login according to app policy", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.nonExistentUser, data.wrongPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    const currentPasswordValue = await loginPage.getPasswordField().inputValue();
    expect(currentPasswordValue).toBe(data.wrongPassword);
  });
});
