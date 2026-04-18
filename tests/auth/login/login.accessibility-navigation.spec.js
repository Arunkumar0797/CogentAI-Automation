const {
  test,
  expect,
  getTestData,
  requireValidCredentials,
  openLoginPage,
  annotateCase,
  expectAuthenticated
} = require("./loginTestSupport");

test.describe("Authentication - Login Accessibility and Navigation", () => {
  test("TC032 should move focus forward with Tab in logical order @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC032", tags: ["auth", "accessibility", "keyboard"], priority: "P2" });

    const loginPage = await openLoginPage(page);

    await loginPage.getUsernameField().focus();
    await page.keyboard.press("Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(loginPage.getLoginButton()).toBeFocused();
  });

  test("TC033 should move focus backward with Shift+Tab @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC033", tags: ["auth", "accessibility", "keyboard"], priority: "P2" });

    const loginPage = await openLoginPage(page);

    await loginPage.getLoginButton().focus();
    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getPasswordField()).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(loginPage.getUsernameField()).toBeFocused();
  });

  test("TC034 should keep typed content and effectively replace placeholder UX @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC034", tags: ["auth", "ui", "usability"], priority: "P3" });

    const loginPage = await openLoginPage(page);
    const usernameField = loginPage.getUsernameField();

    await usernameField.fill("u");
    await expect(usernameField).toHaveValue("u");
  });

  test("TC035 should prevent returning to unsecured login state after successful login via browser back @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC035", tags: ["auth", "navigation", "security"], priority: "P1" });
    test.setTimeout(120000);

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expectAuthenticated(loginPage);

    await page.goBack();
    await expect(page).not.toHaveURL(/login|auth|signin/i);
  });

  test("TC036 should open forgot/reset password recovery flow (known bug) @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC036", tags: ["auth", "recovery", "known-issue"], priority: "P2" });
    test.fail(true, "Known product bug: Forgot Password/Reset Password link is missing on login page.");

    const loginPage = await openLoginPage(page);
    const forgotPasswordLink = loginPage.getForgotPasswordLink();

    await expect(forgotPasswordLink).toBeVisible();
    const href = await forgotPasswordLink.getAttribute("href");
    await forgotPasswordLink.click();

    if (href) {
      expect(href.length).toBeGreaterThan(0);
    }

    await expect(page).toHaveURL(/forgot|reset|recover|password/i);
  });
});


