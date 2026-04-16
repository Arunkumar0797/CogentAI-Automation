const { test, expect } = require("../../utils/testBase");

test.describe("TC023 - Page Refresh Clears Login Fields", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify refreshing login page clears entered username and password values", async ({ page, loginPage, testData }) => {
    const data = testData;
    
    await loginPage.getUsernameField().fill(data.nonExistentUser);
    await loginPage.getPasswordField().fill(data.wrongPassword);
    await page.reload();

    await expect(loginPage.getUsernameField()).toHaveValue("");
    await expect(loginPage.getPasswordField()).toHaveValue("");
  });
});
