import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemName = '.cart-item-name';
  readonly cartItemPrice = '.cart-item-price';
  readonly cartItemQty = '.cart-item-quantity input';
  readonly checkoutButton = 'button[name="checkout"], input[name="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartDetails(expectedName: string, expectedPrice: string) {
    await expect(this.page.locator(this.cartItemName)).toBeVisible();

    const actualName = await this.page.locator(this.cartItemName).textContent();
    const actualPrice = await this.page.locator(this.cartItemPrice).textContent();
    const actualQty = await this.page.locator(this.cartItemQty).getAttribute('value');

    expect(actualName?.trim()).toContain(expectedName);
    expect(actualPrice?.trim()).toContain(expectedPrice);
    expect(actualQty).toBe('1');
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
    await expect(this.page.locator(this.checkoutButton)).toBeVisible();
  }
}
