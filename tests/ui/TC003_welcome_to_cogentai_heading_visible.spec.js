const { test, expect } = require("../../utils/testBase");

test.describe("TC003 - Welcome Heading Is Displayed", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test('Verify login page displays the heading "Welcome to CogentAI"', async ({ page, loginPage, testData }) => {
        await expect(loginPage.heading).toBeVisible();
  });
});
