import { expect, type Page, type Locator } from "@playwright/test";


export class Cart {
  private page: Page;
  private subHeader: Locator;
  private removeBtn: Locator;
  private continueBtn: Locator;
  private checkoutBtn: Locator;

  constructor(page: Page) {
    this.page=page;
    this.subHeader = page.locator('[class="subheader"]');
    this.removeBtn = page.getByRole("button", { name: "REMOVE" });
    this.continueBtn = page.locator('[class="btn_secondary"]');
    this.checkoutBtn = page.locator('[class="btn_action checkout_button"]');
  }
  async validateText(text : string){
    await expect(this.subHeader).toHaveText(text);
  }
  async clickRemoveBtn(){
    await expect(this.removeBtn).toBeVisible();
    this.removeBtn.click();
  }
  async clickContinueBtn(){
    await expect(this.continueBtn).toBeVisible();
    this.continueBtn.click();
  }
  async clickCheckoutBtn(){
    await expect(this.checkoutBtn).toBeVisible();
    this.checkoutBtn.click();
  }

}
