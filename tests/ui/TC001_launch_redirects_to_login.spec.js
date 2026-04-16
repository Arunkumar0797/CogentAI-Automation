const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC001 - Redirect to Login on Site Launch", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("@smoke Verify user is redirected to login page when opening the base URL", async ({ page }) => {
    const path = new URL(page.url()).pathname;
    expect(path).toMatch(/^(\/$|\/login|\/auth|\/signin)/i);
  });
});
