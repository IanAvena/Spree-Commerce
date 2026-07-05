import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/ProductPage';

test('product page object can browse and expose details', async ({ page }) => {
  const productPage = new ProductPage(page);

  await page.setContent(`
    <html>
      <body>
        <a class="product-component" href="/products/demo-product" onclick="document.querySelector('.product-title').style.display='block'; return false;">Demo Product</a>
        <h1 class="product-title" style="display:none">Demo Product</h1>
        <div class="price">$19.99</div>
        <button id="add-to-cart-button" onclick="document.querySelector('.alert-success').style.display='block';">Add to cart</button>
        <div class="alert-success" style="display:none">Added to cart</div>
      </body>
    </html>
  `);

  await productPage.browseAndSelectProduct();
  const details = await productPage.getProductDetails();

  expect(details.name).toBe('Demo Product');
  expect(details.price).toBe('$19.99');

  await productPage.addToCart();
  await expect(page.locator('.alert-success')).toBeVisible();
});
