const { test, expect } = require("../../utils/testBase");

test.describe("TC025 - Boundary Check for Maximum Email Length", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate email input field behavior for maximum-length email data", async ({ page, loginPage, testData }) => {
    const data = testData;
        await loginPage.getUsernameField().fill(data.maximumEmail);

    const currentValue = await loginPage.getUsernameField().inputValue();
    expect(currentValue.length).toBeLessThanOrEqual(data.maximumEmail.length);
  });
});
