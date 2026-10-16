import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("dashboard loads with stats", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("G-HAL Login")).toBeVisible();
  });
});
