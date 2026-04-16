const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC003 - Welcome Heading Is Displayed", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test('Verify login page displays the heading "Welcome to CogentAI"', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();
  });
});
