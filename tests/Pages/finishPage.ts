import { expect, type Page, type Locator } from "@playwright/test";

export class Finish {
  private page: Page;
  private subHeader: Locator;
  private placedOrder : Locator;

  constructor(page: Page) {
    this.page=page;
    this.subHeader = page.locator('[class="subheader"]');
    this.placedOrder = page.locator('[class="complete-header"]');
  }
  async validateText(text : string){
    await expect(this.subHeader).toHaveText(text);
  }
  async placedOrderTextLine(text : string){
    await expect(this.placedOrder).toHaveText(text);
  }

}