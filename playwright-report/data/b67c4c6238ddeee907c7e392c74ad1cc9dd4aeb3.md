# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-page.spec.ts >> product page object can browse and expose details
- Location: tests/product-page.spec.ts:4:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#add-to-cart-button')
    - locator resolved to <button id="add-to-cart-button" onclick="document.querySelector('.alert-success').style.display='block';">Add to cart</button>
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
  - link "Demo Product" [ref=e2] [cursor=pointer]:
    - /url: /products/demo-product
  - heading "Demo Product" [level=1] [ref=e3]
  - generic [ref=e4]: $19.99
  - button "Add to cart" [active] [ref=e5]
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class ProductPage extends BasePage {
  5  |   readonly firstProductCard = '.product-component';
  6  |   readonly productName = '.product-title';
  7  |   readonly productPrice = '.price';
  8  |   readonly addToCartButton = '#add-to-cart-button';
  9  | 
  10 |   constructor(page: Page) {
  11 |     super(page);
  12 |   }
  13 | 
  14 |   async browseAndSelectProduct() {
  15 |     const product = this.page.locator(this.firstProductCard).first();
  16 |     await product.click();
  17 |     await expect(this.page.locator(this.productName)).toBeVisible();
  18 |   }
  19 | 
  20 |   async getProductDetails() {
  21 |     const name = await this.page.locator(this.productName).textContent();
  22 |     const price = await this.page.locator(this.productPrice).textContent();
  23 |     return { name: name?.trim(), price: price?.trim() };
  24 |   }
  25 | 
  26 |   async addToCart() {
> 27 |     await this.page.click(this.addToCartButton);
     |                     ^ Error: page.click: Test timeout of 30000ms exceeded.
  28 |     await expect(this.page.locator('.alert-success')).toBeVisible();
  29 |   }
  30 | }
  31 | 
```