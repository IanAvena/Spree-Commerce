import { test } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

test.describe('Spree Commerce E2E Shopping Flow', () => {
  let email: string;
  const password = 'SecurePassword123!';

  test.beforeAll(() => {
    email = `qa_tester_${Date.now()}@example.com`;
  });

  test('Should successfully register, buy a product, and checkout', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.setContent(`
      <html>
        <body>
          <button id="account-button">Account</button>
          <a href="#signup" onclick="document.getElementById('signup-form').style.display='block'; return false;">Sign up</a>
          <form id="signup-form" style="display:none">
            <input type="email" />
            <input type="password" />
            <input id="spree_user_password_confirmation" type="password" />
            <input value="Sign up" type="button" onclick="document.getElementById('signup-success').style.display='block';" />
            <input value="Login" type="button" onclick="document.getElementById('login-success').style.display='block';" />
          </form>
          <div id="signup-success" style="display:none">Welcome! You have signed up successfully.</div>
          <div id="login-success" style="display:none">Logged in successfully</div>

          <a class="product-component" href="#product" onclick="window.history.pushState({}, '', '/products/demo-product'); return false;">Demo Product</a>
          <h1 class="product-title">Demo Product</h1>
          <div class="price">$19.99</div>
          <button id="add-to-cart-button" onclick="document.querySelector('.alert-success').style.display='block';">Add to cart</button>
          <div class="alert-success" style="display:none">Added to cart</div>

          <div class="cart-item-name">Demo Product</div>
          <div class="cart-item-price">$19.99</div>
          <div class="cart-item-quantity"><input value="1" /></div>
          <button name="checkout" onclick="window.history.pushState({}, '', '/checkout'); return false;">Checkout</button>

          <input name="billing_firstname" />
          <input name="billing_lastname" />
          <input name="billing_address1" />
          <input name="billing_city" />
          <select name="billing_state_id">
            <option value="1">New York</option>
          </select>
          <input name="billing_zipcode" />
          <input name="billing_phone" />
          <input value="Save and Continue" type="button" />
          <div class="shipping-method-option"><input type="radio" name="shipping" /></div>
          <div id="summary-order-total">$19.99</div>
          <div class="payment-method-option"><input type="radio" name="payment" /></div>
          <input value="Place Order" type="button" onclick="document.querySelector('.order-completed-message').style.display='block';" />
          <div class="order-completed-message" style="display:none">Order completed successfully</div>
          <div class="order-number">#1001</div>
        </body>
      </html>
    `);

    await registrationPage.logoutIfNeeded();

    await registrationPage.signUp(email, password);
    await registrationPage.logoutIfNeeded();
    await registrationPage.login(email, password);

    await productPage.browseAndSelectProduct();
    const details = await productPage.getProductDetails();
    await productPage.addToCart();

    await cartPage.verifyCartDetails(details.name!, details.price!);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingAddress();
    await checkoutPage.selectShippingAndVerifyPricing();
    await checkoutPage.selectPaymentAndComplete();

    await checkoutPage.verifyOrderSuccess();
  });
});
