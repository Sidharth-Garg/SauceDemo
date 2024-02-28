import { expect, type Page, type Locator } from "@playwright/test";

export class Home {
  private page: Page;
  private menuBtn: Locator;
  private menuList: Locator;
  private sortList: Locator;
  private itemList: Locator;
  private itemPrice: Locator;
  private addToCartBtn: Locator;
  private removeFromCartBtn: Locator;
  private cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuBtn = page.getByRole("button", { name: "Open Menu" });
    this.menuList = page.locator('[class="bm-item-list"]>a');
    this.sortList = page.locator('[class="product_sort_container"]');
    this.itemList = page.locator('[class="inventory_item_label"]>a');
    this.itemPrice = page.locator('[class="inventory_item_price"]');
    this.addToCartBtn = page.getByRole("button", { name: "ADD TO CART" });
    this.removeFromCartBtn = page.getByRole("button", { name: "REMOVE" });
    this.cartBtn = page.locator('[class="shopping_cart_container"]>a');
  }
  async checkUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }
  async clickMenuBtn() {
    await expect(this.menuBtn).toBeVisible();
    await this.menuBtn.click();
  }
  async clickListOption(option: string) {
    const listSize = await this.menuList.count();
    for (let i = 0; i < listSize; i++) {
      const element = await this.menuList.nth(i);
      const text = await element.textContent();
      if (text == option) {
        await expect(element).toBeVisible();
        await element.click();
        break;
      }
    }
  }
  async selectSortType(sortType: string) {
    await this.sortList.selectOption(sortType);
  }
  async clickItemAndAddToCart(itemName: string) {
    const listSize = await this.itemList.count();
    for (let i = 0; i < listSize; i++) {
      const element = await this.itemList.nth(i);
      const text = await element.textContent();
      if (text == itemName) {
        await expect(element).toBeVisible();
        await element.click();
        break;
      }
    }
  }
  async addItemToCart(itemName: string, itemPrice: string) {
    const listSize = await this.itemList.count();
    let i;
    for (i = 0; i < listSize; i++) {
      const element = await this.itemList.nth(i);
      const text = await element.textContent();
      if (text == itemName) {
        await expect(element).toBeVisible();
        break;
      }
    }
    await this.addToCartBtn.nth(i).click();
  }
  async clickRemoveCartBtn(itemName: string, itemPrice: string) {
    const listSize = await this.itemList.count();
    let i;
    for (i = 0; i < listSize; i++) {
      const element = await this.itemList.nth(i);
      const text = await element.textContent();
      if (text == itemName) {
        await expect(element).toBeVisible();
        break;
      }
    }
    const element1 = await this.itemList.nth(i);
    await expect(this.itemPrice.nth(i)).toHaveText(itemPrice);
    await this.removeFromCartBtn.nth(i).click();
  }
  async clickOnCartBtn() {
    await expect(this.cartBtn).toBeVisible();
    await this.cartBtn.click();
  }
}
