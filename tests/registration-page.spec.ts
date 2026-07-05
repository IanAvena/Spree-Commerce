import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';

test('registration page object exposes auth flows', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await page.setContent(`
    <html>
      <body>
        <button id="account-button">Account</button>
        <a href="#signup">Sign up</a>
        <form>
          <input type="email" />
          <input type="password" />
          <input id="spree_user_password_confirmation" type="password" />
          <input value="Sign up" type="submit" />
          <input value="Login" type="submit" />
        </form>
      </body>
    </html>
  `);

  await registrationPage.clickUserIcon();
  await expect(page.locator('#account-button')).toBeVisible();

  await registrationPage.page.click('text=Sign up');
  await registrationPage.page.fill('input[type="email"]', 'test@example.com');
  await registrationPage.page.fill('input[type="password"]', 'secret123');
  await registrationPage.page.fill('#spree_user_password_confirmation', 'secret123');

  await expect(registrationPage.page.locator('input[value="Sign up"]')).toBeVisible();
});
