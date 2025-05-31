import { By, Locator, until, WebDriver, WebElement } from "selenium-webdriver";

export default class BasePage {
  protected driver: WebDriver;

  #searchBarBy = By.id("top-search-text");
  #searchButtonBy = By.className("btn-search");

  #searchDropDownOptionBy = By.id("top-csel");
  #searchOptionBy = (value: string) => By.xpath(`//option[@value='${value}']`);

  #cookieAcceptBy = By.className("cc-nb-okagree");

  #logoBy = By.className("icon-kriso-logo");

  #cartButtonBy = By.className("cart-bubble full");

  #modalCloseButtonBy = By.className("wnd-close");

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

  public async getItemCountInCart() {
    return await this.driver.findElement(this.#cartButtonBy).getText();
  }

  public async closeModal() {
    const button = await this.driver.findElement(this.#modalCloseButtonBy);
    await this.waitForElementRendered(button);
    await button.click();
  }

  public async waitForElementRendered(element: WebElement) {
    await this.driver.wait(until.elementIsVisible(element), 2000);
  }

  public async ensureUrlContains(value: string) {
    expect(await this.driver.getCurrentUrl()).toContain(value);
  }
}
