const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC034 - Placeholder Behavior While Typing", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify placeholder no longer appears as user starts typing in input field", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const field = loginPage.getUsernameField();
    await field.fill("u");
    await expect(field).toHaveValue("u");
  });
});
