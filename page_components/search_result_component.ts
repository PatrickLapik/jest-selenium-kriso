import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";

export default class SearchResultComponent extends BaseComponent {
  constructor(root: WebElement) {
    super(root);
  }

  #bookTitleBy = By.className("book-title");
  #addToCartButtonBy = By.className("btn or btn-add2cart wnd-modal");
  #descriptionBy = By.className("intro");
  #bookPriceBy = By.className("book-price");

  public async getTitle() {
    return await this.root
      .findElement(this.#bookTitleBy)
      .getAttribute("title");
  }

  public async clickTitle() {
    await this.findAndClick(this.#bookTitleBy);
  }

  public async getDescription() {
    return await this.root.findElement(this.#descriptionBy).getText();
  }

  public async addToCart() {
    await this.root.findElement(this.#addToCartButtonBy).click();
  }

  public async getPrice() {
    const text = await this.root
      .findElement(this.#bookPriceBy)
      .getText();

    const parsedPrice = text
      .match(/\d+\,\d+|\d+/g)
      ?.map((e) => parseFloat(e.replace(",", ".")));

    if (!parsedPrice) {
      return;
    }

    return parsedPrice[0];
  }
}
