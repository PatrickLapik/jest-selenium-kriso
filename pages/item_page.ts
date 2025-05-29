import { By, WebDriver } from "selenium-webdriver";
import BasePage from "./base_page";

export default class ItemPage extends BasePage {
    #descriptionBy = By.xpath("//div[@itemprop='description']")   

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async getDescription() {
        return await this.driver.findElement(this.#descriptionBy).getText();
    }
}
