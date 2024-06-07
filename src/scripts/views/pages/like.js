import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurant</h2>
        <div id="restaurants" class="restaurant">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<p>No restaurants liked yet.</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }

    // Logging untuk memastikan elemen dirender
    console.log('Rendered restaurants:', restaurants);
  },
};

export default Like;
