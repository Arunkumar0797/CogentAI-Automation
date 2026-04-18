const { test, expect, getTestData, openLoginPage, annotateCase } = require("./loginTestSupport");

test.describe("Authentication - Login Boundary and Input Rules", () => {
  test("TC024 should accept minimum-length valid email format @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC024", tags: ["auth", "boundary", "validation"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);

    await loginPage.login(data.minimumEmail, data.wrongPassword);
    await expect(loginPage.getUsernameField()).toHaveValue(data.minimumEmail);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Please enter a valid email address");
  });

  test("TC025 should enforce maximum email length constraints @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC025", tags: ["auth", "boundary", "validation"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.getUsernameField().fill(data.maximumEmail);

    const currentValue = await loginPage.getUsernameField().inputValue();
    expect(currentValue.length).toBeLessThanOrEqual(data.maximumEmail.length);
  });

  test("TC026 should allow minimum accepted password length without min-length validation error @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC026", tags: ["auth", "boundary", "validation"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.minimumPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Password must be at least 6 characters");
  });

  test("TC027 should reject over-limit password lengths @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC027", tags: ["auth", "boundary", "validation"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.maximumPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Password must be less than 50 characters");
  });

  test("TC028 should process one-character username input without client-side crash @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC028", tags: ["auth", "boundary", "stability"], priority: "P3" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.singleCharacterUsername, data.wrongPassword);

    await expect(loginPage.getUsernameField()).toHaveValue(data.singleCharacterUsername);
  });

  test("TC029 should accept valid special characters in email input @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC029", tags: ["auth", "boundary", "validation"], priority: "P2" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.getUsernameField().fill(data.specialCharacterEmail);

    await expect(loginPage.getUsernameField()).toHaveValue(data.specialCharacterEmail);
  });

  test("TC030 should process special-character-only passwords without min-length validation error @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC030", tags: ["auth", "boundary", "validation"], priority: "P3" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.nonExistentUser, data.specialCharacterOnlyPassword);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).not.toContain("Password must be at least 6 characters");
  });

  test("TC031 should reject whitespace-only credentials @smoke @regression", async ({ page }) => {
    annotateCase(test.info(), { id: "TC031", tags: ["auth", "validation", "negative"], priority: "P1" });

    const data = getTestData();
    const loginPage = await openLoginPage(page);
    await loginPage.login(data.whitespaceOnly, data.whitespaceOnly);

    const errors = await loginPage.getInlineValidationMessages();
    expect(errors).toContain("Email or Username is required");
    expect(errors).toContain("Password is required");
  });
});


