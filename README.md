# CogentAI Playwright Automation (JavaScript + POM)

Playwright automation framework for `https://dev.cogentai.labs/` using Page Object Model.

## Project Structure

- `pages/` - Page objects
- `tests/auth/login/` - Login test suites grouped by feature area (`TC001` to `TC036`)
- `tests/auth/login/loginTestSupport.js` - Shared test helpers and metadata annotations
- `test-data/` - Test data JSON
- `utils/` - Reusable utilities and hooks
- `.github/workflows/playwright-ci.yml` - CI pipeline for smoke and nightly regression
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

Login domain only:

```bash
npm run test:login
```

Headed:

```bash
npx playwright test --headed
```

Headed login domain:

```bash
npm run test:login:headed
```

Smoke and Regression:

```bash
npm run test:smoke
npm run test:smoke:headed
npm run test:quality-gate
npm run test:regression
npm run test:regression:headed
```

Suite strategy:

- `@smoke` - Critical business-flow tests for fast release confidence
- `@regression` - Full tagged functional coverage
- `test:quality-gate` - PR-fast smoke run that stops on first failure

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
- CI safety rules enabled: `forbidOnly` on CI, increased retries and workers.
- Browser launches maximized via Playwright `launchOptions`.
- Failure screenshots are auto-captured by `utils/testBase.js`.
- `TC036` is marked as a known bug expectation because Forgot Password link is missing in current UI.
