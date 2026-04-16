const { test, expect } = require("../../utils/testBase");
const LoginPage = require("../../pages/loginPage");

test.describe("TC002 - CogentAI Logo Is Visible at the Top Center", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).navigate();
  });

  test("Verify login page shows CogentAI logo in the top-center area", async ({ page }) => {
    const loginPage = new LoginPage(page);
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
});
