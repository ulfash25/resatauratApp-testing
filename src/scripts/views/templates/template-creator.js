import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<h2 class="restaurant__title">${restaurant.name}</h2>
<picture>
    <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <source media="(min-width: 601px)" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous" loading="lazy"/>
    </picture>
    <div class="restaurant__info">
    <h3>Information</h3>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
    <h4>Categories</h4>
    <ul>
      ${restaurant.categories.map((category) => `<li>${category.name}</li>`).join('')}
    </ul>
    <h4>Menu</h4>
    <div class="restaurant__menu">
      <h5>Food</h5>
      <ul>
        ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
      </ul>
      <h5>Drinks</h5>
      <ul>
        ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="restaurant__overview">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__reviews">
    <h3>Reviews</h3>
    ${restaurant.customerReviews.map((review) => `
      <div class="review">
        <h4>${review.name}</h4>
        <p>${review.review}</p>
        <p><small>${review.date}</small></p>
      </div>
    `).join('')}
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant">
    <div class="restaurant__header">
    <picture>
    <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <source media="(min-width: 601px)" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
    <img class="restaurant__header__poster" alt="${restaurant.name}" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" crossorigin="anonymous" loading="lazy">
    </picture>
        <div class="restaurant__header__rating">
        <p>⭐️<span class="restaurant__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant__content">
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p class="restaurant__description">${restaurant.description}</p>
    </div>
  </div>
`;
const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
