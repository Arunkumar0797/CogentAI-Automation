const { test, expect } = require("../../utils/testBase");

test.describe("TC019 - Password Is Masked by Default", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify password input remains masked before user toggles visibility", async ({ page, loginPage, testData }) => {
        await expect(loginPage.getPasswordField()).toHaveAttribute("type", "password");
  });
});
