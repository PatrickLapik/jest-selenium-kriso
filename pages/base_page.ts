import { By, Locator, WebDriver } from "selenium-webdriver";

export default class BasePage {
  protected driver: WebDriver;

  #searchBarBy: Locator = By.id("top-search-text");
  #searchButtonBy: Locator = By.className("btn-search");

  #logoBy: Locator = By.className("icon-kriso-logo");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  public async search(searchKeyWord: string) {
    await this.driver.findElement(this.#searchBarBy).sendKeys(searchKeyWord);
    await this.driver.findElement(this.#searchButtonBy).click();
  }

  public async isLogoRendered(): Promise<boolean> {
    const logo = await this.driver.findElement(this.#logoBy);

    return logo ? true : false;
  }
}
