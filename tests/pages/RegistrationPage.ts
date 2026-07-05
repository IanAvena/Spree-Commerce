import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  readonly signUpLink = 'text=Sign up';
  readonly emailInput = 'input[type="email"]';
  readonly passwordInput = 'input[type="password"]';
  readonly passwordConfirmationInput = '#spree_user_password_confirmation';
  readonly signUpButton = 'input[value="Sign up"]';
  readonly loginButton = 'input[value="Login"]';
  readonly logoutLink = 'text=Logout';

  constructor(page: Page) {
    super(page);
  }

  async signUp(email: string, pass: string) {
    await this.clickUserIcon();
    await this.page.click(this.signUpLink);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, pass);
    await this.page.fill(this.passwordConfirmationInput, pass);
    await this.page.click(this.signUpButton);

    await expect(this.page.locator('text=Welcome! You have signed up successfully.')).toBeVisible();
  }

  async logoutIfNeeded() {
    if (await this.page.locator(this.logoutLink).isVisible()) {
      await this.page.click(this.logoutLink);
    }
  }

  async login(email: string, pass: string) {
    await this.clickUserIcon();
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, pass);
    await this.page.click(this.loginButton);
    await expect(this.page.locator('text=Logged in successfully')).toBeVisible();
  }
}
