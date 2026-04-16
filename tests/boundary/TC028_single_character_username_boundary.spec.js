const { test, expect } = require("../../utils/testBase");

test.describe("TC028 - Boundary Check for Single-Character Username", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate system behavior for login attempt with one-character username input", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.singleCharacterUsername, data.wrongPassword);

    await expect(loginPage.getDashboardElement()).not.toBeVisible({ timeout: 4000 });
    await expect(loginPage.getUsernameField()).toHaveValue(data.singleCharacterUsername);
  });
});
