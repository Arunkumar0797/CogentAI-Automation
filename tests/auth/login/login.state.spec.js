const { test, expect, getTestData, openLoginPage, annotateCase } = require("./loginTestSupport");

test.describe("Authentication - Login State and Password UX", () => {
  test("TC019 should keep password input masked by default @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC019", tags: ["auth", "password", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    await expect(loginPage.getPasswordField()).toHaveAttribute("type", "password");
  });

  test("TC020 should toggle password visibility using eye icon @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC020", tags: ["auth", "password", "ui"], priority: "P2" });

    const loginPage = await openLoginPage(page);
    const passwordField = loginPage.getPasswordField();

    await expect(passwordField).toHaveAttribute("type", "password");
    await loginPage.togglePasswordVisibility();
    await expect(passwordField).toHaveAttribute("type", "text");
  });

  test("TC021 should retain username after failed login attempt @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC021", tags: ["auth", "negative", "state"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.wrongPassword);

    await expect(loginPage.getUsernameField()).toHaveValue(data.nonExistentUser);
  });

  test("TC022 should preserve password field behavior after failed login per current policy @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC022", tags: ["auth", "negative", "state"], priority: "P3" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.wrongPassword);

    const currentPasswordValue = await loginPage.getPasswordField().inputValue();
    expect(currentPasswordValue).toBe(data.wrongPassword);
  });

  test("TC023 should clear username and password fields after page refresh @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC023", tags: ["auth", "state", "ui"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);

    await loginPage.getUsernameField().fill(data.nonExistentUser);
    await loginPage.getPasswordField().fill(data.wrongPassword);
    await page.reload();

    await expect(loginPage.getUsernameField()).toHaveValue("");
    await expect(loginPage.getPasswordField()).toHaveValue("");
  });
});


