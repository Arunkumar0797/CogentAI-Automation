const { test, expect } = require("../../utils/testBase");

test.describe("TC034 - Placeholder Behavior While Typing", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify placeholder no longer appears as user starts typing in input field", async ({ page, loginPage, testData }) => {
        const field = loginPage.getUsernameField();
    await field.fill("u");
    await expect(field).toHaveValue("u");
  });
});
