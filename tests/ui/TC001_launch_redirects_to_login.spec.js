const { test, expect } = require("../../utils/testBase");

test.describe("TC001 - Redirect to Login on Site Launch", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("@smoke Verify user is redirected to login page when opening the base URL", async ({ page, loginPage, testData }) => {
    const path = new URL(page.url()).pathname;
    expect(path).toMatch(/^(\/$|\/login|\/auth|\/signin)/i);
  });
});
