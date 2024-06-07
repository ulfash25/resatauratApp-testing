import RestauransApp from "../../data/restaurant-source"
import { createRestaurantItemTemplate } from "../templates/template-creator"

const Home = {
    async render() {
        return `
      <div class="content">
        <h2 class="content__heading">Restaurants</h2>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `
    },

    async afterRender() {
        const restaurantsContainer = document.querySelector("#restaurants")
        if (!restaurantsContainer) {
            console.error("Element #restaurants not found")
            return
        }

        try {
            const restaurants = await RestauransApp.homeRestaurant()
            console.log("Fetched restaurants:", restaurants)

            if (Array.isArray(restaurants) && restaurants.length > 0) {
                restaurants.forEach((restaurant) => {
                    restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant)
                })
            } else {
                console.warn("No restaurants found or invalid data format.")
                restaurantsContainer.innerHTML = "<p>No restaurants found.</p>"
            }
        } catch (error) {
            console.error("Error in afterRender:", error)
            restaurantsContainer.innerHTML = "<p>Error fetching restaurants.</p>"
        }
    },
}

export default Home
