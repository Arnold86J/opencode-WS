// TASK-047 COMPLETED — E2E dashboard
import { test, expect } from "@playwright/test"
test("dashboard bento loads", async ({ page }) => { await page.goto("/dashboard"); await expect(page.locator("text=WAU")).toBeVisible() })
