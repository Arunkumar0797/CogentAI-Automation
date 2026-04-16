const { test, expect } = require("../../utils/testBase");

test.describe("TC008 - Cursor Behavior on Login Button Hover", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Verify hovering on Login button shows clickable cursor behavior", async ({ page, loginPage, testData }) => {
        const button = loginPage.getLoginButton();
    await button.hover();
    const cursor = await button.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor).toBe("pointer");
  });
});
