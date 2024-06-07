const assert = require("assert")

const actualValue = 10
const expectedValue = 10
assert.strictEqual(actualValue, expectedValue, "The actual value is not equal to the expected value")

Feature("Liking Restaurant")

Before(({ I }) => {
    I.amOnPage("/#/like")
})

Scenario("showing empty liked restaurants", ({ I }) => {
    I.waitForElement("#restaurants", 10)
    I.seeElement("#mainContent")
    I.seeElement("#restaurants")
    // I.see('Tidak ada film untuk ditampilkan', '.restaurant-item__not__found');
})

Scenario("liking one restaurant", async ({ I }) => {
    I.amOnPage("/")
    I.waitForElement(".restaurant__title a")
    const firstRestaurant = locate(".restaurant__title a").first()
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant)
    I.click(firstRestaurant)
    I.seeElement("#likeButton")
    I.click("#likeButton")

    I.amOnPage("/#/like")
    I.waitForElement(".restaurant__title")
    const likedRestaurantTitle = await I.grabTextFrom(".restaurant__title")
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle)
})

Scenario("unliking one restaurant", async ({ I }) => {
    I.amOnPage("/")
    I.waitForElement(".restaurant__title a", 30)
    const firstLikedRestaurant = locate(".restaurant__title a").first()
    const firstLikedRestaurantTitle = await I.grabTextFrom(firstLikedRestaurant)
    I.click(firstLikedRestaurant)
    I.seeElement("#likeButton")
    I.click("#likeButton")
    I.amOnPage("/#/like")
    I.waitForElement(".restaurant__title a", 30)
    I.click(".restaurant__title a")
    I.seeElement("#likeButton")
    I.click("#likeButton")
    I.saveScreenshot("after_unlike.png")
    I.wait(10)
    I.amOnPage("/#/like")
    I.waitForElement("#restaurants", 20)
    I.dontSee(firstLikedRestaurantTitle)
    I.saveScreenshot("final_state.png")
})

Scenario("checking home page", async ({ I }) => {
    I.amOnPage("/")
    I.waitForElement(".restaurant__title a", 30)

    // Assert home page elements
    I.waitForElement(".content__heading", 10)
    I.seeElement("#restaurants")

    // Fetch and assert restaurants
    const restaurants = await I.grabNumberOfVisibleElements(".restaurant__title a")
    assert.ok(restaurants > 0, "No restaurants found on home page")
})
