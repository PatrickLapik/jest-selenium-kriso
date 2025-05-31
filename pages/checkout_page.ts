import { By, WebDriver } from "selenium-webdriver";
import CartItemComponent from "../page_components/cart_item_component";
import BasePage from "./base_page";
import { parsePrice } from "../helpers";

export default class CheckoutPage extends BasePage {
  #cartItemsBy = By.xpath("//table[@id='tbl-cartitems']/tbody/tr");
  #totalBy = By.xpath("//li[@class='order-total']/span[@class='o-value']");

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async getCartItems() {
    const items = await this.driver.findElements(this.#cartItemsBy);
    return items.map((i) => new CartItemComponent(i));
  }

  public async verifyCartPrice() {
    const items = await this.getCartItems();
    const totalText = await this.driver.findElement(this.#totalBy).getText();
    const total = parsePrice(totalText);
    let calculatedTotal = 0;

    for(const item of items) {
      const itemPrice = await item.getPrice();  
      if (!itemPrice) return;
      calculatedTotal += itemPrice;
    }

    expect(calculatedTotal).toBe(total);
  }
}
