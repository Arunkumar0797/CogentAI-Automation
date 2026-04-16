const { test, expect, requireValidCredentials } = require("../../utils/testBase");

test.describe("TC016 - Validation for Wrong Password", () => {
  test.beforeEach(async ({ page, loginPage, testData }) => {
    await loginPage.navigate();
  });

  test("Validate login is rejected when password is incorrect", async ({ page, loginPage, testData }) => {
    const data = testData;
    requireValidCredentials(test, data);

    await loginPage.login(data.validEmail, data.wrongPassword);
    const state = await loginPage.waitForLoginAttemptResult();
    expect(state).not.toMatch(/^success_/);
    await expect(loginPage.getUsernameField()).toBeVisible();
  });
});
