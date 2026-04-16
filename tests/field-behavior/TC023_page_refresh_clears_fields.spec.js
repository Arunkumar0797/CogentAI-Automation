const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC023 - Page Refresh Clears Login Fields", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify refreshing login page clears entered username and password values", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);

    await loginPage.getUsernameField().fill(data.nonExistentUser);
    await loginPage.getPasswordField().fill(data.wrongPassword);
    await page.reload();

    await expect(loginPage.getUsernameField()).toHaveValue("");
    await expect(loginPage.getPasswordField()).toHaveValue("");
  });
});
