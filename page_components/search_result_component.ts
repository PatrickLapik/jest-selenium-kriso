import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";

export default class SearchResultComponent extends BaseComponent {
  constructor(root: WebElement) {
    super(root);
  }

  public async getTitle() {
    return this.root
      .findElement(By.className("book-title"))
      .getAttribute("title");
  }

  public async getDescription() {
    return this.root.findElement(By.className("intro")).getText();
  }
}
