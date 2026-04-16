# CogentAI Playwright Automation (JavaScript + POM)

Playwright automation framework for `https://dev.cogentai.labs/` using Page Object Model.

## Project Structure

- `pages/` - Page objects
- `tests/ui/` - UI validation tests (`TC001`-`TC008`)
- `tests/functional/` - Positive functional login tests (`TC009`-`TC011`)
- `tests/negative/` - Negative login tests (`TC012`-`TC018`)
- `tests/field-behavior/` - Field behavior tests (`TC019`-`TC023`)
- `tests/boundary/` - Boundary and input-limits tests (`TC024`-`TC031`)
- `tests/accessibility/` - Keyboard/UX accessibility tests (`TC032`-`TC034`)
- `tests/navigation/` - Post-login/navigation tests (`TC035`-`TC036`)
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

Run by suite (industry-style execution):

```bash
npm run test:ui
npm run test:functional
npm run test:negative
npm run test:field
npm run test:boundary
npm run test:accessibility
npm run test:navigation
```

Smoke and Regression (real-world pipeline style):

```bash
npm run test:smoke
npm run test:smoke:headed
npm run test:regression
npm run test:regression:headed
```

CI pipeline behavior:

- Pull Requests: runs `smoke` suite
- Nightly schedule: runs full `regression` suite
- Manual trigger (`workflow_dispatch`): runs both jobs
- Artifacts uploaded on each run:
  - `playwright-report`
  - `screenshots`

Smoke coverage in this project:

- `TC001` launch redirect
- `TC007` login button visibility
- `TC009` valid login by email
- `TC010` valid login by username
- `TC011` post-login redirect to Start/New chat
- `TC035` secure browser-back behavior after login

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
