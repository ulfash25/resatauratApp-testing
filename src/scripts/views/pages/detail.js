import UrlParser from "../../routes/url-parser"
import RestaurantsApp from "../../data/restaurant-source"
import { createRestaurantDetailTemplate } from "../templates/createRestaurantDetailTemplate"
import LikeButtonInitiator from "../../utils/like-button-initiator"

const Detail = {
    async render() {
        return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner()
        console.log("Parsed URL:", url) // Log parsed URL for debugging

        try {
            const response = await RestaurantsApp.detailRestaurant(url.id)
            console.log("Fetched restaurant details:", response) // Log fetched restaurant details

            const restaurantContainer = document.querySelector("#restaurant")
            if (restaurantContainer && response.restaurant) {
                restaurantContainer.innerHTML = createRestaurantDetailTemplate(response.restaurant)
            } else {
                console.error("Element #restaurant not found or invalid data structure")
            }

            // Inisialisasi tombol suka
            LikeButtonInitiator.init({
                likeButtonContainer: document.querySelector("#likeButtonContainer"),
                restaurant: response.restaurant,
            })
        } catch (error) {
            console.error("Error fetching restaurant details:", error)
        }
    },
}

export default Detail
