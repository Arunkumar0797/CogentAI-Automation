const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC006 - Password Visibility Icon Is Present", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify password field contains an eye or eye-slash visibility icon", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.getEyeToggle()).toBeVisible();
  });
});
