const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC025 - Boundary Check for Maximum Email Length", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate email input field behavior for maximum-length email data", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.getUsernameField().fill(data.maximumEmail);

    const currentValue = await loginPage.getUsernameField().inputValue();
    expect(currentValue.length).toBeLessThanOrEqual(data.maximumEmail.length);
  });
});
