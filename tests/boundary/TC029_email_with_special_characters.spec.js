const { test, expect } = require("../../utils/testBase");

test.describe("TC029 - Email Input Accepts Allowed Special Characters", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify email input accepts valid special-character email format", async ({ page, loginPage, testData }) => {
    const data = testData;
        await loginPage.getUsernameField().fill(data.specialCharacterEmail);

    await expect(loginPage.getUsernameField()).toHaveValue(data.specialCharacterEmail);
  });
});
