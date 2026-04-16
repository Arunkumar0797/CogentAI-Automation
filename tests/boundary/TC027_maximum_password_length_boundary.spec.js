const { test, expect } = require("../../utils/testBase");
const { getTestData } = require("../../utils/testData");
const LoginPage = require("../../pages/loginPage");

test.describe("TC027 - Boundary Check for Maximum Password Length", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Validate password input field behavior for maximum-length password data", async ({ page }) => {
    const data = getTestData();
    const loginPage = new LoginPage(page);
    await loginPage.login(data.nonExistentUser, data.maximumPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Password must be less than 50 characters");
  });
});
