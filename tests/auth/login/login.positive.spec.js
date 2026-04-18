const {
  test,
  expect,
  getTestData,
  requireValidCredentials,
  openLoginPage,
  annotateCase,
  expectAuthenticated
} = require("./loginTestSupport");

test.describe("Authentication - Login Positive Paths", () => {
  test("TC009 should authenticate with valid email and password @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC009", tags: ["auth", "positive", "smoke"], priority: "P1" });
    test.setTimeout(120000);

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expectAuthenticated(loginPage);
  });

  test("TC010 should authenticate with valid username and password @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC010", tags: ["auth", "positive", "smoke"], priority: "P1" });
    test.setTimeout(120000);

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validUsername, data.validPassword);
    await expectAuthenticated(loginPage);
  });

  test("TC011 should redirect away from login route after successful authentication @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC011", tags: ["auth", "positive", "routing"], priority: "P1" });
    test.setTimeout(120000);

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validEmail, data.validPassword);
    await expectAuthenticated(loginPage);

    await expect(page).not.toHaveURL(/login|auth|signin/i);
  });
});


