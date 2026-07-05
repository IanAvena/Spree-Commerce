import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly emailInput = 'input[name="spree_user[email]"]';
  readonly passwordInput = 'input[name="spree_user[password]"]';
  readonly loginButton = 'input[type="submit"]';
  readonly dashboardHeading = 'h1';

  constructor(page: Page) {
    super(page);
  }

  async openAdminPanel() {
    await this.page.goto('http://localhost:3000/admin');
    await expect(this.page).toHaveURL(/\/admin/);
  }

  async loginAsDefaultUser() {
    await this.page.fill(this.emailInput, 'spree@example.com');
    await this.page.fill(this.passwordInput, 'spree123');
    await this.page.click(this.loginButton);
    await expect(this.page.locator(this.dashboardHeading)).toBeVisible();
  }
}
