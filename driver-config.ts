import { Builder, WebDriver, Browser } from "selenium-webdriver";
import { Options } from "selenium-webdriver/firefox";

export default class Driver {
  private driver!: WebDriver;
  readonly TIMEOUT = 5000;
  readonly URL = "https://www.kriso.ee";

  constructor() {}

  public async initializeDriver() {
    const options = new Options().addArguments("--headless");

    this.driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(options)
      .build();

    await this.driver.manage().window().maximize();
    await this.driver.manage().setTimeouts({ implicit: this.TIMEOUT });
    await this.driver.get(this.URL);
  }

  public getDriver(): WebDriver {
    if (!this.driver) {
      throw new Error(
        "Driver is not initialized. Call initializeDriver() first.",
      );
    }
    return this.driver;
  }

  public async deleteCookies() {
    await this.driver.manage().deleteAllCookies();
  }

  public async quit(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}
