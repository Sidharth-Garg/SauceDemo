import { expect, Page, Locator } from "@playwright/test";

export class Product {
  private page: Page;
  private itemPriceText: Locator;
  private addToCartBtn: Locator;
  private removeFromCartBtn: Locator;
  private backBtn: Locator;
  private cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPriceText = page.locator('[class="inventory_details_price"]');
    this.addToCartBtn = page.getByRole("button", { name: "ADD TO CART" });
    this.removeFromCartBtn = page.getByRole("button", { name: "REMOVE" });
    this.backBtn = page.getByRole("button", { name: "<- Back" });
    this.cartBtn = page.locator('[class="shopping_cart_container"]>a');
  }
  async clickAddTocartBtn(itemPrice: string) {
    await expect(this.itemPriceText).toHaveText(itemPrice);
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
  }
  async backToHome() {
    await expect(this.backBtn).toBeVisible();
    await this.backBtn.click();
  }
  async clickRemoveCartBtn() {
    await expect(this.removeFromCartBtn).toBeVisible();
    await this.removeFromCartBtn.click();
  }
  async clickOnCartBtn() {
    await expect(this.cartBtn).toBeVisible();
    await this.cartBtn.click();
  }
}
