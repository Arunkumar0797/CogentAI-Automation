const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC028 - Boundary Check for Single-Character Username", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate system behavior for login attempt with one-character username input", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.singleCharacterUsername, data.wrongPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    await expect(loginPage.getUsernameField()).toHaveValue(data.singleCharacterUsername);
  });
});
