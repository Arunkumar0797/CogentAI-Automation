const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 2 : 1,
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  reporter: [["list"], ["html", { open: "never" }], ["junit", { outputFile: "test-results/junit.xml" }]],
  use: {
    baseURL: process.env.BASE_URL || "https://dev.cogentai.labs/",
    headless: true,
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"]
    },
    trace: "on-first-retry",
    screenshot: "off",
    video: "retain-on-failure"
  }
});
