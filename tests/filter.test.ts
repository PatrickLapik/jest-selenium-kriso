import Driver from "../driver-config";
import SearchPage from "../pages/search_page";

let driverConfig: Driver;
let searchPage: SearchPage;

describe("Search products by filter menu", () => {
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

  test("Confirm the category 'Muusikaraamatud ja noodid' is visible", async () => {
    await searchPage.isNavItemVisible("Muusikaraamatud ja noodid");
  });

  test("Navigate to 'Muusikaraamatud ja noodid' -> 'Õppematerjalid'", async () => {
    await searchPage.clickNavItem("Muusikaraamatud ja noodid");
    const filters = await searchPage.getFilteringOptions();
    await filters.findAndClickFilter("Õppematerjalid");
    const items = await searchPage.getSearchResults();
    expect(items.length).toBeGreaterThan(0);
  });

  test("Navigate to 'Bänd ja ansambel' and ensure it shows the proper results", async () => {
    let filters = await searchPage.getFilteringOptions();
    await filters.findAndClickFilter("Bänd ja ansambel");
    filters = await searchPage.getFilteringOptions();
    expect(await filters.getSelectedSubjectText()).toBe("Bänd ja ansambel");
  });

  test("Filter 'Õppematerjalid' should have more items than 'Bänd ja ansambel'", async () => {
    let filters = await searchPage.getFilteringOptions();
    expect(
      await filters.getItemCountOnFilters("Õppematerjalid"),
    ).toBeGreaterThan(await filters.getItemCountOnFilters("Bänd ja ansambel"));
  });

  test("Navigate to 'CD' format and ensure there are less results than before", async () => {
    const filters = await searchPage.getFilteringOptions();
    expect(
      await filters.getItemCountOnFilters("Bänd ja ansambel"),
    ).toBeGreaterThan(await filters.getItemCountOnFilters("CD"));
    await filters.findAndClickFilter("CD");
    await searchPage.ensureUrlContains("CD"); 
  })
});
