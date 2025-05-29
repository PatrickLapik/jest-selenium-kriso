import { By, Locator, WebDriver } from "selenium-webdriver";

export default class BasePage {
  protected driver: WebDriver;

  #searchBarBy = By.id("top-search-text");
  #searchButtonBy = By.className("btn-search");

  #searchDropDownOptionBy = By.id("top-csel");
  #searchOptionBy = (value: string) => By.xpath(`//option[@value='${value}']`);

  #cookieAcceptBy = By.className("cc-nb-okagree");

  #logoBy = By.className("icon-kriso-logo");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  public async search(searchKeyWord: string) {
    await this.findInputAndFill(this.#searchBarBy, searchKeyWord);
    await this.findAndClick(this.#searchButtonBy);
  }

  public async findAndClick(locator: Locator) {
    await this.driver.findElement(locator).click();
  }

  public async findInputAndFill(locator: Locator, value: string) {
    await this.driver.findElement(locator).sendKeys(value);
  }

  public async selectSearchOption(searchOption: string) {
    await this.findAndClick(this.#searchDropDownOptionBy);
    await this.findAndClick(this.#searchOptionBy(searchOption));
  }

  public async acceptCookies() {
    await this.driver.findElement(this.#cookieAcceptBy).click();
  }

  public async isLogoRendered() {
    const logo = await this.driver.findElement(this.#logoBy);
    expect(logo).toBeDefined();
  }
}
