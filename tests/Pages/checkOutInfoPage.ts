import { expect, type Page, type Locator } from "@playwright/test";

export class CheckOutInfo {
  private page: Page;
  private subHeader: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private continueBtn : Locator;
  private cancelBtn: Locator;

  constructor(page: Page) {
    this.page=page;
    this.subHeader = page.locator('[class="subheader"]');
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = page.locator('[class="btn_primary cart_button"]');
    this.cancelBtn = page.locator('[class="cart_cancel_link btn_secondary"]');
  }
  async validateText(text : string){
    await expect(this.subHeader).toHaveText(text);
  }
  async fillDetails(first: string,last:string,postal:string){
    await this.firstName.fill(first);
    await expect(this.firstName).toHaveValue(first);
    await this.lastName.fill(last);
    await expect(this.lastName).toHaveValue(last);
    await this.postalCode.fill(postal);
    await expect(this.postalCode).toHaveValue(postal);
  }
  async clickContinueBtn(){
    await expect(this.continueBtn).toBeVisible();
    await this.continueBtn.click();
  }
  async clickCancelBtn(){
    await expect(this.cancelBtn).toBeVisible();
    await this.cancelBtn.click();
  }

}