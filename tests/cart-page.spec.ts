import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';

test('cart page object can verify cart details and checkout flow', async ({ page }) => {
  const cartPage = new CartPage(page);

  await page.setContent(`
    <html>
      <body>
        <div class="cart-item-name">Demo Product</div>
        <div class="cart-item-price">$19.99</div>
        <div class="cart-item-quantity"><input value="1" /></div>
        <button name="checkout" onclick="document.body.dataset.checkout='clicked';">Checkout</button>
      </body>
    </html>
  `);

  await cartPage.verifyCartDetails('Demo Product', '$19.99');
  await cartPage.proceedToCheckout();

  await expect(page.locator('body')).toHaveAttribute('data-checkout', 'clicked');
});
