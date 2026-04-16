const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC029 - Email Input Accepts Allowed Special Characters", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify email input accepts valid special-character email format", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.getUsernameField().fill(data.specialCharacterEmail);

    await expect(loginPage.getUsernameField()).toHaveValue(data.specialCharacterEmail);
  });
});
