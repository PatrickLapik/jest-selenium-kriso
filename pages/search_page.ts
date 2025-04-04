import {
  By,
  locateWith,
  WebDriver,
} from "selenium-webdriver";
import BasePage from "./base_page";
import SearchResultComponent from "../page_components/search_result_component";
import FilterComponent from "../page_components/filter_component";

export default class SearchPage extends BasePage {
  #searchResultBy = locateWith(By.className("book-desc")).below(
    By.className("search-results-wrap"),
  );

  #filteringOptionsBy = By.className("filters-content")

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async getSearchResults() {
    const results = await this.driver.findElements(this.#searchResultBy);

    return results.map((e) => new SearchResultComponent(e));
  }

  public async getFilteringOptions() {
    const filters = await this.driver.findElement(this.#filteringOptionsBy)

    return new FilterComponent(filters)
  }
}
