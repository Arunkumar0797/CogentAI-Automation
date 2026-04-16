# Locator Contract - CogentAI Login Automation

This document defines the strict selector contract used by the Playwright POM.
If any selector below changes in the UI, tests should fail and the contract must be updated.

## Scope

Applies to:
- [pages/loginPage.js](D:/CogentAI%20-%20Automation/pages/loginPage.js)
- Login-related tests in [tests](D:/CogentAI%20-%20Automation/tests)

## Strict Selectors

1. Login page heading
- Selector: `getByRole('heading', { name: /welcome to cogentai/i })`
- Purpose: Validate login page is rendered.

2. Username/Email input
- Selector: `#login-email`
- Purpose: Enter username or email.

3. Password input
- Selector: `#login-password`
- Purpose: Enter password.

4. Password visibility toggle
- Selector: `button[aria-label='Show password'], button[aria-label='Hide password']`
- Purpose: Toggle password masking/visibility.

5. Login submit button
- Selector: `getByRole('button', { name: /^log in$|^logging in\\.\\.\\.$/i })`
- Purpose: Submit credentials.

6. Inline validation/error message
- Selector: `p.text-red-400`
- Purpose: Read validation and inline error text.
- Note: Authentication failures may also surface through toast notifications in `[data-rht-toaster]`.

7. Logo on login page
- Selector: `div.mb-10 svg`
- Purpose: Verify logo visibility on login screen.

8. Dashboard marker after successful login
- Selector: `getByRole('heading', { name: /dashboard/i })`
- Purpose: Confirm successful post-login landing.

## Contract Rules

1. Do not add weak fallback selectors in POM.
2. Prefer stable `data-testid` selectors when product team adds them.
3. If UI changes, update:
- [pages/loginPage.js](D:/CogentAI%20-%20Automation/pages/loginPage.js)
- this contract file
- affected test assertions
4. Keep selectors deterministic and single-purpose.

## Recommended Future Improvement

Add explicit test IDs in frontend:
- `data-testid="login-logo"`
- `data-testid="login-email"`
- `data-testid="login-password"`
- `data-testid="login-password-toggle"`
- `data-testid="login-submit"`
- `data-testid="login-error"`
- `data-testid="dashboard-heading"`

Then migrate POM selectors to those test IDs as primary contract.
