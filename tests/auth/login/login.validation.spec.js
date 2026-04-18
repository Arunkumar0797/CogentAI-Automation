const {
  test,
  expect,
  getTestData,
  requireValidCredentials,
  openLoginPage,
  annotateCase,
  expectRejected
} = require("./loginTestSupport");

test.describe("Authentication - Login Validation and Negative Paths", () => {
  test("TC012 should block login when username is empty @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC012", tags: ["auth", "validation", "negative"], priority: "P1" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login("", data.validPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
  });

  test("TC013 should block login when password is empty @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC013", tags: ["auth", "validation", "negative"], priority: "P1" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validEmail, "");

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Password is required");
  });

  test("TC014 should block login when both username and password are empty @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC014", tags: ["auth", "validation", "negative"], priority: "P1" });

    const loginPage = await openLoginPage(page);
    await loginPage.login("", "");

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });

  test("TC015 should reject invalid email format @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC015", tags: ["auth", "validation", "negative"], priority: "P1" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.invalidEmailFormat, data.validPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Please enter a valid email address");
  });

  test("TC016 should reject login when password is incorrect @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC016", tags: ["auth", "negative", "security"], priority: "P1" });

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validEmail, data.wrongPassword);
    await expectRejected(loginPage);
  });

  test("TC017 should reject login for non-existent user @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC017", tags: ["auth", "negative", "security"], priority: "P1" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.validPassword);
    await expectRejected(loginPage);
  });

  test("TC018 should enforce credential case sensitivity @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC018", tags: ["auth", "negative", "security"], priority: "P2" });

    const data = getTestData();
    requireValidCredentials(test, data);

    const loginPage = await openLoginPage(page);
    await loginPage.login(data.validUsername.toUpperCase(), data.validPassword.toLowerCase());
    await expectRejected(loginPage);
  });
});


