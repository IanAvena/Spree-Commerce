import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstName = 'input[name*="firstname"]';
  readonly lastName = 'input[name*="lastname"]';
  readonly address1 = 'input[name*="address1"]';
  readonly city = 'input[name*="city"]';
  readonly stateSelect = 'select[name*="state_id"]';
  readonly zipCode = 'input[name*="zipcode"]';
  readonly phone = 'input[name*="phone"]';
  readonly saveAddressBtn = 'input[value="Save and Continue"]';

  readonly shippingRadio = '.shipping-method-option input[type="radio"]';
  readonly paymentRadio = '.payment-method-option input[type="radio"]';
  readonly completeOrderBtn = 'input[value="Place Order"]';
  readonly successMessage = '.order-completed-message';
  readonly orderNumber = '.order-number';

  constructor(page: Page) {
    this.page = page;
  }

  async fillShippingAddress() {
    await this.page.fill(this.firstName, 'John');
    await this.page.fill(this.lastName, 'Doe');
    await this.page.fill(this.address1, '123 Test Street');
    await this.page.fill(this.city, 'New York');
    await this.page.selectOption(this.stateSelect, { label: 'New York' });
    await this.page.fill(this.zipCode, '10001');
    await this.page.fill(this.phone, '1234567890');
    await this.page.click(this.saveAddressBtn);
  }

  async selectShippingAndVerifyPricing() {
    const shippingOption = this.page.locator(this.shippingRadio).first();
    await expect(shippingOption).toBeVisible();
    await shippingOption.check();

    await expect(this.page.locator('#summary-order-total')).not.toBeEmpty();
    await this.page.click(this.saveAddressBtn);
  }

  async selectPaymentAndComplete() {
    await this.page.locator(this.paymentRadio).first().check();
    await this.page.click(this.completeOrderBtn);
  }

  async verifyOrderSuccess() {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    const orderNum = await this.page.locator(this.orderNumber).textContent();
    expect(orderNum).not.toBeNull();
    console.log(`Order completed successfully. Order ID: ${orderNum}`);
  }
}
