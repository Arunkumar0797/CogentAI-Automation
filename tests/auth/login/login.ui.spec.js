const { test, expect, openLoginPage, annotateCase } = require("./loginTestSupport");

test.describe("Authentication - Login UI", () => {
  test("TC001 should redirect to a login route on application launch @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC001", tags: ["auth", "ui", "smoke"], priority: "P1" });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const path = new URL(page.url()).pathname;
    expect(path).toMatch(/^(\/$|\/login|\/auth|\/signin)/i);
  });

  test("TC002 should display the CogentAI logo in the top section of login page @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC002", tags: ["auth", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    await expect(loginPage.logo).toBeVisible();

    const box = await loginPage.logo.boundingBox();
    const viewport = page.viewportSize();

    if (box && viewport) {
      expect(box.y).toBeLessThan(viewport.height * 0.35);
      const logoCenterX = box.x + box.width / 2;
      const viewportCenterX = viewport.width / 2;
      expect(Math.abs(logoCenterX - viewportCenterX)).toBeLessThan(viewport.width * 0.3);
    }
  });

  test("TC003 should show the Welcome to CogentAI heading @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC003", tags: ["auth", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    await expect(loginPage.heading).toBeVisible();
  });

  test("TC004 should show a meaningful placeholder in email or username field @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC004", tags: ["auth", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    const placeholder = await loginPage.getUsernameField().getAttribute("placeholder");

    expect(placeholder || "").toMatch(/email|username/i);
  });

  test("TC005 should show a meaningful placeholder in password field @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC005", tags: ["auth", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    const placeholder = await loginPage.getPasswordField().getAttribute("placeholder");

    expect(placeholder || "").toMatch(/password/i);
  });

  test("TC006 should display password visibility toggle icon @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC006", tags: ["auth", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    await expect(loginPage.getEyeToggle()).toBeVisible();
  });

  test("TC007 should render a visible login button @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC007", tags: ["auth", "ui", "smoke"], priority: "P1" });

    const loginPage = await openLoginPage(page);
    await expect(loginPage.getLoginButton()).toBeVisible();
  });

  test("TC008 should show pointer cursor when hovering login button @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC008", tags: ["auth", "ui", "usability"], priority: "P3" });

    const loginPage = await openLoginPage(page);
    const button = loginPage.getLoginButton();

    await button.hover();
    const cursor = await button.evaluate((element) => getComputedStyle(element).cursor);
    expect(cursor).toBe("pointer");
  });
});


