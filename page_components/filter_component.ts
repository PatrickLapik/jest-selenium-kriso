import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";

export default class FilterComponent extends BaseComponent {
  constructor(root: WebElement) {
    super(root);
  }

  public async getSubjects() {
    const subjects = await this.root.findElement(By.className("left-subjects"));

    return await subjects.findElements(By.css("a"));
  }

  public async getSelectedSubject() {
    const subjects = await this.getSubjects();
    return subjects.find((e) => e.findElement(By.css(".current")));
  }
}
