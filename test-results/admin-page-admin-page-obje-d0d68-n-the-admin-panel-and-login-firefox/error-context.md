# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-page.spec.ts >> admin page object can open the admin panel and login
- Location: tests/admin-page.spec.ts:4:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="submit"]')
    - locator resolved to <input type="submit" value="Login"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - textbox [ref=e3]: spree@example.com
    - textbox [active] [ref=e4]: spree123
    - button "Login" [ref=e5]
  - heading "Dashboard" [level=1] [ref=e6]
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class AdminPage extends BasePage {
  5  |   readonly emailInput = 'input[name="spree_user[email]"]';
  6  |   readonly passwordInput = 'input[name="spree_user[password]"]';
  7  |   readonly loginButton = 'input[type="submit"]';
  8  |   readonly dashboardHeading = 'h1';
  9  | 
  10 |   constructor(page: Page) {
  11 |     super(page);
  12 |   }
  13 | 
  14 |   async openAdminPanel() {
  15 |     await this.page.goto('http://localhost:3000/admin');
  16 |     await expect(this.page).toHaveURL(/\/admin/);
  17 |   }
  18 | 
  19 |   async loginAsDefaultUser() {
  20 |     await this.page.fill(this.emailInput, 'spree@example.com');
  21 |     await this.page.fill(this.passwordInput, 'spree123');
> 22 |     await this.page.click(this.loginButton);
     |                     ^ Error: page.click: Test timeout of 30000ms exceeded.
  23 |     await expect(this.page.locator(this.dashboardHeading)).toBeVisible();
  24 |   }
  25 | }
  26 | 
```