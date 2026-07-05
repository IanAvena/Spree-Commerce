import { test, expect } from '@playwright/test';
import { AdminPage } from './pages/AdminPage';

test('admin page object can open the admin panel and login', async ({ page }) => {
  const adminPage = new AdminPage(page);

  await page.route('**/admin*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `
        <html>
          <body>
            <form>
              <input name="spree_user[email]" />
              <input name="spree_user[password]" />
              <input type="submit" value="Login" />
            </form>
            <h1>Dashboard</h1>
          </body>
        </html>
      `,
    });
  });

  await adminPage.openAdminPanel();
  await adminPage.loginAsDefaultUser();

  await expect(page.locator('h1')).toContainText('Dashboard');
});
