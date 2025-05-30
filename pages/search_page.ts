import { By, WebDriver } from "selenium-webdriver";
import BasePage from "./base_page";
import SearchResultComponent from "../page_components/search_result_component";
import FilterComponent from "../page_components/filter_component";
import ItemPage from "./item_page";

export default class SearchPage extends BasePage {
  #searchResultBy = By.xpath(
    "//div[@class='booklist-wrap']//div[@class='product']",
  );

  #filteringOptionsBy = By.className("filters-content");

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
  }

  public async isSearchOptionApplied(option: string) {
    const url = await this.driver.getCurrentUrl();

    expect(url).toContain(option);
  }
}
