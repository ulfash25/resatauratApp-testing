import API_ENDPOINT from "../globals/API_ENDPOINT"

class RestauransApp {
    static async homeRestaurant() {
        try {
            const response = await fetch(API_ENDPOINT.LIST_RESTAURANTS)
            const responseJson = await response.json()
            console.log("API Response:", responseJson)
            if (responseJson && Array.isArray(responseJson.restaurants)) {
                return responseJson.restaurants
            }
            console.error("Invalid API response structure:", responseJson)
            return []
        } catch (error) {
            console.error("Error fetching restaurant list:", error) // Logging the error
            return []
        }
    }

    static async detailRestaurant(id) {
        try {
            const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id))
            const responseJson = await response.json()
            return responseJson
        } catch (error) {
            console.error("Error fetching restaurant details:", error) // Logging the error
            return {}
        }
    }
}

export default RestauransApp
