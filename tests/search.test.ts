import { Browser, Builder } from "selenium-webdriver";
import type { WebDriver } from "selenium-webdriver";
import SearchPage from "../pages/search_page";

const url = "https://www.kriso.ee";
const TIMEOUT = 5000;

let driver: WebDriver;
let searchPage: SearchPage;

describe("Search products by keywords", () => {
  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: TIMEOUT });

    await driver.get(url);

    searchPage = new SearchPage(driver);
  });

  afterEach(async () => {
    await driver.quit();
  });

  // test("Confirm the page has a Kriso title/logo", async () => {
  //   let logo = await searchPage.isLogoRendered();
  //   expect(logo).toBeTruthy();
  // });
  //
  // test("Search harry potter and ensure multiple products are shown", async () => {
  //   let searchKeyWord = "harry potter";
  //   await searchPage.search(searchKeyWord);
  //   const results = await searchPage.getSearchResults();
  //
  //   console.log(results)
  //
  //   expect(results).toBeTruthy();
  // });
  //
  // test("Seach harry potter and ensure that the results contain the search keyword", async () => {
  //   let searchKeyWord = "harry potter";
  //   await searchPage.search(searchKeyWord);
  //   let results = await searchPage.getSearchResults();
  //
  //   for (const result of results) {
  //     const title = await result.getTitle();
  //     const desc = await result.getDescription();
  //
  //     if (title.includes(searchKeyWord)) {
  //       expect(title).toContain(searchKeyWord.toLowerCase());
  //     } else {
  //       expect(desc).toContain(searchKeyWord.toLowerCase());
  //     }
  //   }
  // });

  test("Ensure that products can be sorted by subject", async () => {
    let searchKeyWord = "harry";
    await searchPage.search(searchKeyWord);

    let filters = await searchPage.getFilteringOptions();
    let subjects = await filters.getSubjects();
    const firstSubject = subjects[0];
    const firstSubjectText = await firstSubject.getText();

    console.log(firstSubject);

    expect(firstSubject).toBeDefined();

    await firstSubject.click();

    filters = await searchPage.getFilteringOptions();

    const selected = await filters.getSelectedSubject()

    console.log(await selected?.getText())

    expect(await driver.getTitle()).toContain(firstSubjectText);
  });
});
