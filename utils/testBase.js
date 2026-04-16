const { test: base, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const test = base;

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const screenshotsDir = path.join(__dirname, "..", "screenshots");
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]+/g, "_").slice(0, 80);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = path.join(screenshotsDir, `${safeTitle}-${timestamp}.png`);

    await page.screenshot({ path: filePath, fullPage: true });
    await testInfo.attach("failure-screenshot", {
      path: filePath,
      contentType: "image/png"
    });
  }
});

module.exports = { test, expect };
