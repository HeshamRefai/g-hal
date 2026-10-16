import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("G-HAL Login")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/login");
    await expect(page.getByText("G-HAL Login")).toBeVisible();
  });
});
