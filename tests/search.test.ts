import SearchPage from "../pages/search_page";
import Driver from "../driver-config";

const searchKeyWord = "harry potter";

let searchPage: SearchPage;
let driverConfig: Driver 

describe("Search products by keywords", () => {
  beforeAll(async () => {
    driverConfig = new Driver();
    await driverConfig.initializeDriver();

    searchPage = new SearchPage(driverConfig.getDriver());
    await searchPage.acceptCookies();
  });

  afterAll(async () => {
    await driverConfig.quit();
  });

  test("Confirm the page has a Kriso title/logo", async () => {
    await searchPage.isLogoRendered();
  });

  test("Search harry potter and ensure multiple products are shown", async () => {
    await searchPage.search(searchKeyWord);
    await searchPage.doSearchResultsShowUp();
  });

  test("Search harry potter and ensure that the results contain the search keyword", async () => {
    await searchPage.doSearchResultsContainSearchKeyWord(searchKeyWord);
  });

  test("Ensure that products can be sorted by subject", async () => {
    const filters = await searchPage.getFilteringOptions();
    await filters.findAndClickFilter("Arts and Architecture");
    await searchPage.doesSelectedSubjectShowFilteredResults();
  });

  test("Ensure that products can be sorted by price", async () => {
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
