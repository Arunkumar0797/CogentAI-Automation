const { test, expect } = require("../../utils/testBase");

test.describe("TC027 - Boundary Check for Maximum Password Length", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate password input field behavior for maximum-length password data", async ({ page, loginPage, testData }) => {
    const data = testData;
    await loginPage.login(data.nonExistentUser, data.maximumPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Password must be less than 50 characters");
  });
});
