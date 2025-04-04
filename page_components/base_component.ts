import { WebElement } from "selenium-webdriver";

export default class BaseComponent {
  protected root: WebElement;

  constructor(root: WebElement) {
    this.root = root;
  }
}
