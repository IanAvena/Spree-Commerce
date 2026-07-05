import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly firstProductCard = '.product-component';
  readonly productName = '.product-title';
  readonly productPrice = '.price';
  readonly addToCartButton = '#add-to-cart-button';

  constructor(page: Page) {
    super(page);
  }

  async browseAndSelectProduct() {
    const product = this.page.locator(this.firstProductCard).first();
    await product.click();
    await expect(this.page.locator(this.productName)).toBeVisible();
  }

  async getProductDetails() {
    const name = await this.page.locator(this.productName).textContent();
    const price = await this.page.locator(this.productPrice).textContent();
    return { name: name?.trim(), price: price?.trim() };
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
    await expect(this.page.locator('.alert-success')).toBeVisible();
  }
}
