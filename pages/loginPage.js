class LoginPage {
  constructor(page) {
    this.page = page;

    this.logo = page.locator("div.mb-10 svg").first();

    this.heading = page.getByRole("heading", { name: /welcome to cogentai/i });

    this.usernameField = page.locator("#login-email");

    this.passwordField = page.locator("#login-password");

    this.loginButton = page.getByRole("button", { name: /^log in$|^logging in\.\.\.$/i });

    this.eyeToggleButton = page.locator("button[aria-label='Show password'], button[aria-label='Hide password']").first();

    this.errorMessage = page.locator("p.text-red-400").first();
    this.inlineErrorMessages = page.locator("p.text-red-400");
    this.toastContainer = page.locator("[data-rht-toaster]");

    this.forgotPasswordLink = page.getByRole("link", { name: /forgot password|reset password/i });
    this.authenticatedStartEntry = page
      .getByRole("button", { name: /^start$/i })
      .or(page.getByRole("link", { name: /^start$/i }))
      .or(page.getByText(/^start$/i))
      .first();
    this.authenticatedChatInput = page.getByPlaceholder(/ask anything/i);
  }

  async navigate() {
    await this.page.context().clearCookies();
    await this.page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await this.page
        .goto("/", { waitUntil: "domcontentloaded", timeout: 15000 })
        .catch(() => null);
      if (!response) {
        await this.page.waitForTimeout(1000);
        continue;
      }

      const loginFormVisibleAtRoot = await this.usernameField
        .waitFor({ state: "visible", timeout: 8000 })
        .then(() => true)
        .catch(() => false);
      if (loginFormVisibleAtRoot) {
        return;
      }

      await this.page.waitForTimeout(1000);
    }

    throw new Error("Login form did not become visible after navigation retries.");
  }

  async login(username, password) {
    await this.usernameField.fill(username ?? "", { timeout: 15000 });
    await this.passwordField.fill(password ?? "", { timeout: 15000 });
    await this.loginButton.click({ noWaitAfter: true, timeout: 10000 });
  }

  async getErrorMessage() {
    if (await this.errorMessage.isVisible().catch(() => false)) {
      return (await this.errorMessage.textContent())?.trim() || "";
    }

    if (await this.toastContainer.isVisible().catch(() => false)) {
      const toastText = (await this.toastContainer.textContent())?.trim() || "";
      if (toastText.length > 0) {
        return toastText;
      }
    }

    return "";
  }

  async getInlineValidationMessages() {
    const messages = await this.inlineErrorMessages.allTextContents();
    return messages.map((m) => m.trim()).filter(Boolean);
  }

  async isLogoVisible() {
    return this.logo.isVisible().catch(() => false);
  }

  async isHeadingVisible() {
    return this.heading.isVisible().catch(() => false);
  }

  async togglePasswordVisibility() {
    await this.eyeToggleButton.click();
  }

  getDashboardElement() {
    return this.authenticatedStartEntry;
  }

  getAuthenticatedHomeElement() {
    return this.authenticatedStartEntry.or(this.authenticatedChatInput).first();
  }

  getNewChatInputElement() {
    return this.authenticatedChatInput;
  }

  async waitForLoginAttemptResult(timeoutMs = 90000) {
    const start = Date.now();
    let sawBusyState = false;

    while (Date.now() - start < timeoutMs) {
      if (this.page.isClosed()) {
        return "timeout";
      }

      if (await this.authenticatedStartEntry.isVisible().catch(() => false)) {
        return "success_dashboard";
      }

      if (await this.authenticatedChatInput.isVisible().catch(() => false)) {
        return "success_home";
      }

      const errorText = await this.getErrorMessage();
      if (errorText) {
        return "error";
      }

      const isLoginVisible = await this.getLoginButton().isVisible().catch(() => false);
      const isLoginDisabled = await this.getLoginButton().isDisabled().catch(() => false);
      if (isLoginVisible && isLoginDisabled) {
        sawBusyState = true;
      }

      try {
        await this.page.waitForTimeout(250);
      } catch {
        return "timeout";
      }
    }

    return sawBusyState ? "timeout" : "idle";
  }

  getUsernameField() {
    return this.usernameField;
  }

  getPasswordField() {
    return this.passwordField;
  }

  getLoginButton() {
    return this.loginButton;
  }

  getEyeToggle() {
    return this.eyeToggleButton;
  }

  getForgotPasswordLink() {
    return this.forgotPasswordLink;
  }
}

module.exports = LoginPage;
