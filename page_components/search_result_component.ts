import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";

export default class SearchResultComponent extends BaseComponent {
  constructor(root: WebElement) {
    super(root);
  }

  #titleBy = By.className("book-title");

  public async getTitle() {
    return await this.root
      .findElement(By.className("book-title"))
      .getAttribute("title");
  }

  public async clickTitle() {
    await this.root.findElement(this.#titleBy).click();
  }

  public async getDescription() {
    return await this.root.findElement(By.className("intro")).getText();
  }

  public async addToCart() {
    await this.root.
  }

  public async getPrice() {
    const text = await this.root
      .findElement(By.className("book-price"))
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
