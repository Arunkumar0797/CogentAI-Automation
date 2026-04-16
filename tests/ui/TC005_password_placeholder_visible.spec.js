const { test, expect } = require("../../utils/testBase");

test.describe("TC005 - Password Placeholder Is Displayed", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify Password input displays a meaningful placeholder", async ({ page, loginPage, testData }) => {
        const placeholder = await loginPage.getPasswordField().getAttribute("placeholder");
    expect(placeholder || "").toMatch(/password/i);
  });
});
