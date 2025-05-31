import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";
import { parsePrice } from "../helpers";

export default class CartItemComponent extends BaseComponent {
  #priceBy = By.className("subtotal");
  #removeButtonBy = By.className("btn-small gr cart-btn-remove ajaxcartupdate");

  constructor(root: WebElement) {
    super(root);
  }

  public async getPrice() {
    const priceText = await this.root.findElement(this.#priceBy).getText();
    return parsePrice(priceText); 
  }

  public async removeItem() {
    await this.findAndClick(this.#removeButtonBy);
  }
}
