import { By, WebElement } from "selenium-webdriver";
import BaseComponent from "./base_component";

export default class FilterComponent extends BaseComponent {
  constructor(root: WebElement) {
    super(root);
  }

  #priceFiltersBy = By.xpath("//h3[text()='Hind']/following-sibling::div");
  #aTagBy = By.css("a");
  #subjectsBy = By.className("left-subjects");
  #clickableBy = (value: string) =>
    By.xpath(`//div[@id='section-wrap']//li/a[contains(text(), '${value}')]`);
  #selectedSubjectBy = By.xpath("//li[@class='filtered current selected']/a");
  #itemCountBy = (value: string) =>
    By.xpath(
      `//div[@id='section-wrap']//li/a[contains(text(), '${value}')]/span`,
    );

  public async getSubjects() {
    const subjects = await this.root.findElement(this.#subjectsBy);

    return await subjects.findElements(this.#aTagBy);
  }

  public async findAndClickFilter(value: string) {
    const filter = await this.root.findElement(this.#clickableBy(value));
    await filter.click();
  }

  public async getSelectedSubjectText() {
    const subjectText = await this.root
      .findElement(this.#selectedSubjectBy)
      .getText();
    return this.cleanText(subjectText);
  }

  public async getPriceFilters() {
    const prices = await this.root.findElement(this.#priceFiltersBy);
    return await prices.findElements(this.#aTagBy);
  }

  public async getItemCountOnFilters(name: string) {
    const itemText = await this.root
      .findElement(this.#itemCountBy(name))
      .getText();
    const digits = itemText.match(/\d+/g)?.join("") ?? "";
    const itemCount = parseInt(digits, 10);

    return isNaN(itemCount) ? 0 : itemCount;
  }

  public async getMinMaxPriceFromPriceFilter() {
    const prices = await this.getPriceFilters();
    const parsedPrices = await Promise.all(
      prices.map(async (e) => {
        const text = await e.getText();
        const matches = text.match(/\d{1,3},\d{2}/g);

        if (!matches || matches.length < 2) return null;

        const [minStr, maxStr] = matches;
        return {
          min: parseFloat(minStr.replace(",", ".")),
          max: parseFloat(maxStr.replace(",", ".")),
        };
      }),
    );
    return parsedPrices;
  }

  private cleanText(text: string) {
    return text.replace(/\s*\(\d+\)\s*$/, "").trim();
  }
}
