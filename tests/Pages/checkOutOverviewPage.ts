import { expect, type Page, type Locator } from "@playwright/test";

export class CheckOutOverview {
  private page: Page;
  private subHeader: Locator;
  private finishBtn: Locator;
  private cancelBtn: Locator;

  constructor(page: Page) {
    this.page=page;
    this.subHeader = page.locator('[class="subheader"]');
    this.finishBtn = page.locator('[class="btn_action cart_button"]');
    this.cancelBtn = page.locator('[class="cart_cancel_link btn_secondary"]');
  }
  async validateText(text: string) {
    await expect(this.subHeader).toHaveText(text);
  }
  async clickFinishBtn(){
    await expect(this.finishBtn).toBeVisible();
    await this.finishBtn.click();
  }
  async clickCancelBtn(){
    await expect(this.cancelBtn).toBeVisible();
    await this.cancelBtn.click();
  }
}
