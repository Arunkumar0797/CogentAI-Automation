const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  workers: 1,
  retries: 1,
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  reporter: [["html", { open: "never" }], ["list"]],
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
