const { test, expect } = require("../../utils/testBase");

test.describe("TC004 - Email or Username Placeholder Is Displayed", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify Email or Username input displays a meaningful placeholder", async ({ page, loginPage, testData }) => {
        const placeholder = await loginPage.getUsernameField().getAttribute("placeholder");
    expect(placeholder || "").toMatch(/email|username/i);
  });
});
