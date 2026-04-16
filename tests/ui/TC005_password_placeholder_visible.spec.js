const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC005 - Password Placeholder Is Displayed", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify Password input displays a meaningful placeholder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const placeholder = await loginPage.getPasswordField().getAttribute("placeholder");
    expect(placeholder || "").toMatch(/password/i);
  });
});
