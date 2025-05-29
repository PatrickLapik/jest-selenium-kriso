import { Locator, WebElement } from "selenium-webdriver";

export default class BaseComponent {
  public root: WebElement;

  constructor(root: WebElement) {
    this.root = root;
  }

  public async findAndClick(locator: Locator) {
    const element = await this.root.findElement(locator); 
    await element.click();
  }
}
