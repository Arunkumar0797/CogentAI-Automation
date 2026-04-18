# CogentAI Playwright Automation (JavaScript + POM)

Playwright automation framework for `https://dev.cogentai.labs/` using Page Object Model.

## Project Structure

- `pages/` - Page objects
- `tests/auth/login/` - Login test suites grouped by feature area (`TC001` to `TC036`)
- `tests/auth/login/loginTestSupport.js` - Shared test helpers and metadata annotations
- `tests/ui/`, `tests/functional/`, `tests/negative/`, `tests/field-behavior/`, `tests/boundary/`, `tests/accessibility/`, `tests/navigation/` - Legacy split suites
- `test-data/` - Test data JSON
- `utils/` - Reusable utilities and hooks
- `screenshots/` - Failure screenshots

## Prerequisites

- Node.js LTS

## Install

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npx playwright test
```

Headed:

```bash
npx playwright test --headed
```

Run by legacy split suite:

```bash
npm run test:ui
npm run test:functional
npm run test:negative
npm run test:field
npm run test:boundary
npm run test:accessibility
npm run test:navigation
```

Smoke and Regression:

```bash
npm run test:smoke
npm run test:smoke:headed
npm run test:regression
npm run test:regression:headed
```

Suite strategy:

- `@smoke` - Critical business-flow tests for fast release confidence
- `@regression` - Full tagged functional coverage

## View Report

```bash
npx playwright show-report
```

## Test Data

Default credentials are stored in `test-data/testData.json`.
You can override at runtime with environment variables:

- `VALID_EMAIL`
- `VALID_USERNAME`
- `VALID_PASSWORD`

## Notes

- Base URL is configured in `playwright.config.js`.
- Browser launches maximized via Playwright `launchOptions`.
- Failure screenshots are auto-captured by `utils/testBase.js`.
- `TC036` is marked as a known bug expectation because Forgot Password link is missing in current UI.
