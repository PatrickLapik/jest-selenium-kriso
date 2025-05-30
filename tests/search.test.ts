import { Browser, Builder } from "selenium-webdriver";
import type { WebDriver } from "selenium-webdriver";
import SearchPage from "../pages/search_page";
import { Options } from "selenium-webdriver/firefox";

const url = "https://www.kriso.ee";
const TIMEOUT = 5000;
const searchKeyWord = "harry";

let driver: WebDriver;
let searchPage: SearchPage;

describe("Search products by keywords", () => {
  beforeEach(async () => {
    const options = new Options().addArguments("--headless");
    driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: TIMEOUT });

    await driver.get(url);

    searchPage = new SearchPage(driver);
    await searchPage.acceptCookies();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("Confirm the page has a Kriso title/logo", async () => {
    await searchPage.isLogoRendered();
  });

  test("Search harry potter and ensure multiple products are shown", async () => {
    await searchPage.search(searchKeyWord);
    await searchPage.doSearchResultsShowUp();
  });

  test("Seach harry potter and ensure that the results contain the search keyword", async () => {
    const searchKeyWord = "harry potter";
    await searchPage.search(searchKeyWord);
    await searchPage.doSearchResultsContainSearchKeyWord(searchKeyWord);
  });

  test("Ensure that products can be sorted by subject", async () => {
    await searchPage.search(searchKeyWord);
    const filters = await searchPage.getFilteringOptions();
    await filters.findAndClickFilter("Arts and Architecture");
    await searchPage.doesSelectedSubjectShowFilteredResults();
  });

  test("Ensure that products can be sorted by price", async () => {
    await searchPage.search(searchKeyWord);

    let filters = await searchPage.getFilteringOptions();

    const priceFilters = await filters.getPriceFilters();
    const firstPriceFilter = priceFilters[0];

    const minMax = await filters.getMinMaxPriceFromPriceFilter();

    if (!minMax[0]) {
      return;
    }

    const firstMinMax = minMax[0];

    await firstPriceFilter.click();

    const results = await searchPage.getSearchResults();

    for (const result of results) {
      const bookPrice = await result.getPrice();

      expect(bookPrice).toBeGreaterThan(firstMinMax.min);
      expect(bookPrice).toBeLessThan(firstMinMax.max);
    }

    expect(priceFilters).toBeDefined();
  });

  test("Ensure when filtering Estonian books search results show Estonian books", async () => {
    const searchOption = "estonian2";
    await searchPage.selectSearchOption(searchOption);
    await searchPage.search(searchKeyWord);
    await searchPage.isSearchOptionApplied(searchOption);
  });
});
