import SearchPage from "../pages/search_page";
import Driver from "../driver-config";
import CheckoutPage from "../pages/checkout_page";

const searchKeyWord = "harry";

let driverConfig: Driver;
let searchPage: SearchPage;
let checkoutPage: CheckoutPage;

describe("Shopping cart tests", () => {
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

  test("Product can be added to cart", async () => {
    await searchPage.search(searchKeyWord);
    const items = await searchPage.getSearchResults();
    await items[0].addToCart();
    await searchPage.didItemGetAddedToShoppingCart();
    await searchPage.closeModal();
  });

  test("2 Products can be added to cart", async () => {
    const items = await searchPage.getSearchResults();
    await items[1].addToCart();
    await searchPage.closeModal();
    expect(await searchPage.getItemCountInCart()).toBe("2");
  });

  test("Verify checkout has 2 products", async () => {
    checkoutPage = await searchPage.checkout();
    const cartItems = await checkoutPage.getCartItems();
    expect(cartItems.length).toBe(2);
  });

  test("Check if total adds correctly up", async () => {
    await checkoutPage.verifyCartPrice();
  });

  test("Remove one item from cart and verify price", async () => {
    let cartItems = await checkoutPage.getCartItems();
    await cartItems[0].removeItem();
    cartItems = await checkoutPage.getCartItems();
    expect(cartItems.length).toBe(1);
    await checkoutPage.verifyCartPrice();
  })
});
