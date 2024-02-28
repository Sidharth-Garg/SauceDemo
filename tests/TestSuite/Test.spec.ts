import { Page, test, BrowserContext } from "@playwright/test";
import { Login } from "../Pages/loginPage";
import { Home } from "../Pages/homePage";
import { Product } from "../Pages/productPage";
import { Cart } from "../Pages/cartPage";
import { CheckOutInfo } from "../Pages/checkOutInfoPage";
import { CheckOutOverview } from "../Pages/checkOutOverviewPage";
import { Finish } from "../Pages/finishPage";
const data = require("../Data/dataSheet.json");
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import * as log from "../../util/Logger";
import {readExcelFile} from "../../util/readExcelFile"
let context: BrowserContext;
let page: Page;
let login: Login;
let home: Home;
let product: Product;
let cart: Cart;
let checkoutinfo: CheckOutInfo;
let checkoutoverview: CheckOutOverview;
let finish: Finish;
let records;
let excelRead;
let ProductName;
test.describe("Test Cases", () => {
  records = parse(
    fs.readFileSync(path.join(__dirname, "../Data/credentials.csv")),
    {
      columns: true,
      skip_empty_lines: true,
    }
  );
  test.beforeAll("Intialising", async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    login = await new Login(page);
    home = await new Home(page);
    product = await new Product(page);
    cart = await new Cart(page);
    checkoutinfo = await new CheckOutInfo(page);
    checkoutoverview = await new CheckOutOverview(page);
    finish = await new Finish(page);
    excelRead=new readExcelFile();
    ProductName=await excelRead.getProductName();
  });
  for (const record of records) {
    test.beforeEach("Opening Website and Logging in", async () => {
      await login.goToUrl(data.baseurl);
      await login.enterUsername(record.userName);
      await login.enterPassword(record.password);
      await login.clickLoginBtn();
      await log.Logger.info("Login Successful");
    });
  }
  test("Sort Results, Click On Product and Add To Cart", async () => {
    await home.selectSortType(data.sorttype);
    await home.clickItemAndAddToCart(ProductName[0]);
    await product.clickAddTocartBtn(data.itemprice1);
    await product.backToHome();
    await home.clickItemAndAddToCart(ProductName[1]);
    await product.clickAddTocartBtn(data.itemprice2);
    await product.clickOnCartBtn();
    await cart.validateText(data.carttext);
    await cart.clickCheckoutBtn();
    await checkoutinfo.validateText(data.checkoutinfotext);
    await checkoutinfo.fillDetails(data.first, data.last, data.postal);
    await checkoutinfo.clickContinueBtn();
    await checkoutoverview.validateText(data.checkoutoverviewtext);
    await checkoutoverview.clickFinishBtn();
    await finish.validateText(data.finishtext);
    await finish.placedOrderTextLine(data.placedordertext);
  });
  test("Sort Results, Select Product and Add To Cart", async () => {
    await home.selectSortType(data.sorttype);
    await home.addItemToCart(data.itemname1, data.itemprice1);
    await home.addItemToCart(data.itemname2, data.itemprice2);
    await home.clickOnCartBtn();
    await cart.validateText(data.carttext);
    await cart.clickContinueBtn();
    await home.addItemToCart(data.itemname2, data.itemprice2);
    await home.clickOnCartBtn();
    await cart.clickCheckoutBtn();
    await checkoutinfo.validateText(data.checkoutinfotext);
    await checkoutinfo.fillDetails(data.first, data.last, data.postal);
    await checkoutinfo.clickContinueBtn();
    await checkoutoverview.validateText(data.checkoutoverviewtext);
    await checkoutoverview.clickFinishBtn();
    await finish.validateText(data.finishtext);
    await finish.placedOrderTextLine(data.placedordertext);
  });
  test.afterEach("Logout", async () => {
    await home.clickMenuBtn();
    await home.clickListOption(data.listoption);
  });
  test.afterAll("Closing Instances", async () => {
    await page.close();
    await context.close();
  });
});
