# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-shopping-flow.spec.ts >> Spree Commerce E2E Shopping Flow >> Should successfully register, buy a product, and checkout
- Location: tests/e2e-shopping-flow.spec.ts:15:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.shipping-method-option input[type="radio"]').first()
    - locator resolved to <input type="radio" name="shipping"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - button "Account" [ref=e2]
  - link "Sign up" [ref=e3] [cursor=pointer]:
    - /url: "#signup"
  - generic [ref=e4]:
    - textbox [ref=e5]: qa_tester_1783223982888@example.com
    - textbox [ref=e6]: SecurePassword123!
    - textbox [ref=e7]: SecurePassword123!
    - button "Sign up" [ref=e8]
    - button "Login" [ref=e9]
  - generic [ref=e10]: Welcome! You have signed up successfully.
  - generic [ref=e11]: Logged in successfully
  - link "Demo Product" [ref=e12] [cursor=pointer]:
    - /url: "#product"
  - heading "Demo Product" [level=1] [ref=e13]
  - generic [ref=e14]: $19.99
  - button "Add to cart" [ref=e15]
  - generic [ref=e16]: Added to cart
  - generic [ref=e17]: Demo Product
  - generic [ref=e18]: $19.99
  - textbox [ref=e20]: "1"
  - button "Checkout" [ref=e21]
  - textbox [ref=e22]: John
  - textbox [ref=e23]: Doe
  - textbox [ref=e24]: 123 Test Street
  - textbox [ref=e25]: New York
  - combobox [ref=e26]:
    - option "New York" [selected]
  - textbox [ref=e27]: "10001"
  - textbox [ref=e28]: "1234567890"
  - button "Save and Continue" [active] [ref=e29]
  - radio [ref=e31]
  - generic [ref=e32]: $19.99
  - radio [ref=e34]
  - button "Place Order" [ref=e35]
  - generic [ref=e36]: "#1001"
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | 
  3  | export class CheckoutPage {
  4  |   readonly page: Page;
  5  | 
  6  |   readonly firstName = 'input[name*="firstname"]';
  7  |   readonly lastName = 'input[name*="lastname"]';
  8  |   readonly address1 = 'input[name*="address1"]';
  9  |   readonly city = 'input[name*="city"]';
  10 |   readonly stateSelect = 'select[name*="state_id"]';
  11 |   readonly zipCode = 'input[name*="zipcode"]';
  12 |   readonly phone = 'input[name*="phone"]';
  13 |   readonly saveAddressBtn = 'input[value="Save and Continue"]';
  14 | 
  15 |   readonly shippingRadio = '.shipping-method-option input[type="radio"]';
  16 |   readonly paymentRadio = '.payment-method-option input[type="radio"]';
  17 |   readonly completeOrderBtn = 'input[value="Place Order"]';
  18 |   readonly successMessage = '.order-completed-message';
  19 |   readonly orderNumber = '.order-number';
  20 | 
  21 |   constructor(page: Page) {
  22 |     this.page = page;
  23 |   }
  24 | 
  25 |   async fillShippingAddress() {
  26 |     await this.page.fill(this.firstName, 'John');
  27 |     await this.page.fill(this.lastName, 'Doe');
  28 |     await this.page.fill(this.address1, '123 Test Street');
  29 |     await this.page.fill(this.city, 'New York');
  30 |     await this.page.selectOption(this.stateSelect, { label: 'New York' });
  31 |     await this.page.fill(this.zipCode, '10001');
  32 |     await this.page.fill(this.phone, '1234567890');
  33 |     await this.page.click(this.saveAddressBtn);
  34 |   }
  35 | 
  36 |   async selectShippingAndVerifyPricing() {
  37 |     const shippingOption = this.page.locator(this.shippingRadio).first();
  38 |     await expect(shippingOption).toBeVisible();
> 39 |     await shippingOption.check();
     |                          ^ Error: locator.check: Test timeout of 30000ms exceeded.
  40 | 
  41 |     await expect(this.page.locator('#summary-order-total')).not.toBeEmpty();
  42 |     await this.page.click(this.saveAddressBtn);
  43 |   }
  44 | 
  45 |   async selectPaymentAndComplete() {
  46 |     await this.page.locator(this.paymentRadio).first().check();
  47 |     await this.page.click(this.completeOrderBtn);
  48 |   }
  49 | 
  50 |   async verifyOrderSuccess() {
  51 |     await expect(this.page.locator(this.successMessage)).toBeVisible();
  52 |     const orderNum = await this.page.locator(this.orderNumber).textContent();
  53 |     expect(orderNum).not.toBeNull();
  54 |     console.log(`Order completed successfully. Order ID: ${orderNum}`);
  55 |   }
  56 | }
  57 | 
```