import { By, until, WebDriver } from "selenium-webdriver";
import BasePage from "./base_page";
import SearchResultComponent from "../page_components/search_result_component";
import FilterComponent from "../page_components/filter_component";
import ItemPage from "./item_page";
import CheckoutPage from "./checkout_page";

export default class SearchPage extends BasePage {
  #searchResultBy = By.xpath(
    "//div[@class='booklist-wrap']//div[@class='product']",
  );

  #filteringOptionsBy = By.className("filters-content");
  #cartMessageBy = By.className("msg msg-info");
  #cartButtonBy = By.className("cart-bubble full");

  #navItemBy = (value: string) =>
    By.xpath(`//li[@class='nav-item']/a[contains(text(), '${value}')]`);

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async getSearchResults() {
    const results = await this.driver.findElements(this.#searchResultBy);

    return results.map((e) => new SearchResultComponent(e));
  }

  public async getFilteringOptions() {
    const filters = await this.driver.findElement(this.#filteringOptionsBy);

    return new FilterComponent(filters);
  }

  public async doesSelectedSubjectShowFilteredResults() {
    const filters = await this.getFilteringOptions();
    const selectedSubject = await filters.getSelectedSubjectText();

    expect(await this.driver.getTitle()).toContain(selectedSubject);
  }

  public async doSearchResultsShowUp() {
    expect(await this.getSearchResults()).toBeTruthy();
  }

  public async doSearchResultsContainSearchKeyWord(searchKeyWord: string) {
    const results = await this.getSearchResults();

    const result = results[0];

    const title = await result.getTitle();

    if (title.includes(searchKeyWord)) {
      expect(title).toContain(searchKeyWord.toLowerCase());
    } else {
      await result.clickTitle();

      const itemPage = new ItemPage(this.driver);
      const desc = await itemPage.getDescription();

      expect(desc.toLowerCase()).toContain(searchKeyWord.toLowerCase());
    }

    this.driver.navigate().back();
  }

  public async isSearchOptionApplied(option: string) {
    const url = await this.driver.getCurrentUrl();

    expect(url).toContain(option);
  }

  public async didItemGetAddedToShoppingCart() {
    const message = await this.driver.findElement(this.#cartMessageBy);
    await this.waitForElementRendered(message);

    expect(await message.getText()).toBe("Toode lisati ostukorvi");
  }

  public async checkout() {
    await this.findAndClick(this.#cartButtonBy);
    return new CheckoutPage(this.driver);
  }

  public async isNavItemVisible(item: string) {
    expect(await this.driver.findElement(this.#navItemBy(item))).toBeTruthy();
  }

  public async clickNavItem(item: string) {
    await this.findAndClick(this.#navItemBy(item));
  }
}
