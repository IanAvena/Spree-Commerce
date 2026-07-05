import { test, expect } from '@playwright/test';
import { CheckoutPage } from './pages/CheckoutPage';

test('checkout page object can fill address and complete checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await page.setContent(`
    <html>
      <body>
        <input name="bill_firstname" />
        <input name="bill_lastname" />
        <input name="bill_address1" />
        <input name="bill_city" />
        <select name="bill_state_id">
          <option value="1">New York</option>
        </select>
        <input name="bill_zipcode" />
        <input name="bill_phone" />
        <input value="Save and Continue" type="button" />

        <div class="shipping-method-option">
          <input type="radio" name="shipping" />
        </div>
        <div id="summary-order-total">$19.99</div>

        <div class="payment-method-option">
          <input type="radio" name="payment" />
        </div>
        <input value="Place Order" type="button" />

        <div class="order-completed-message">Order completed successfully</div>
        <div class="order-number">#1001</div>
      </body>
    </html>
  `);

  await checkoutPage.fillShippingAddress();
  await checkoutPage.selectShippingAndVerifyPricing();
  await checkoutPage.selectPaymentAndComplete();
  await checkoutPage.verifyOrderSuccess();

  await expect(page.locator('.order-completed-message')).toBeVisible();
});
