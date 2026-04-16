const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC004 - Email or Username Placeholder Is Displayed", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify Email or Username input displays a meaningful placeholder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const placeholder = await loginPage.getUsernameField().getAttribute("placeholder");
    expect(placeholder || "").toMatch(/email|username/i);
  });
});
