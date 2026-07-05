import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly userIcon = '#account-button';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('https://demo.spreecommerce.org/');
    await expect(this.page).toHaveURL(/spreecommerce.org/);
  }

  async clickUserIcon() {
    await this.page.locator(this.userIcon).click();
  }
}
