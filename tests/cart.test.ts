import { Browser, Builder } from "selenium-webdriver";
import type { WebDriver } from "selenium-webdriver";
import SearchPage from "../pages/search_page";
import { Options } from "selenium-webdriver/firefox";

const url = "https://www.kriso.ee";
const TIMEOUT = 5000;
const searchKeyWord = "harry";

let driver: WebDriver;
let searchPage: SearchPage;

describe("Test cart", () => {
  beforeEach(async () => {
    const options = new Options().addArguments("--headless");
    driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(options)
      .build();

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: TIMEOUT });

    await driver.get(url);

    searchPage = new SearchPage(driver);
    await searchPage.acceptCookies();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("TODO", async () => {});
});
