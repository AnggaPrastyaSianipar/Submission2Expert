import restaurantdb from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const beranda = {
  async render() {
    return `
    <section class="hero" id="hero">
        <img src="./heros/hero-image_4.jpg" alt="Restaurant Tasty Bites" class="hero-image" tabindex="0">
        <div class="hero-content">
           <h1 tabindex="0">Welcome to Our Restaurant</h1>
            <p tabindex="0">Choose what suits your taste</p>

            <!-- Search Bar -->
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search by city" aria-label="Search for restaurants by city">
                <button class="search-btn" aria-label="Search restaurants">Search</button>
            </div>
        </div>
    </section>

    <!-- Daftar Restoran -->
    <section id="restaurant-list">
        <h2 tabindex="0">Restaurant List</h2>
        <div class="restaurant-container" id="restaurants">
            <!-- Content will be inserted here via JavaScript -->
        </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await restaurantdb.beranda();
    const restaurantContainer = document.querySelector('#restaurants');
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('.search-btn');

    // Definisikan fungsi sebelum digunakan
    function displayRestaurants(restaurantsList) {
      restaurantContainer.innerHTML = '';
      restaurantsList.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }

    function filterRestaurantsByCity(city) {
      const filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.city.toLowerCase().includes(city),
      );
      displayRestaurants(filteredRestaurants);
    }

    // Tampilkan semua restoran secara default
    displayRestaurants(restaurants);

    // Event listener untuk tombol search
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        filterRestaurantsByCity(query);
      } else {
        displayRestaurants(restaurants); // Tampilkan semua restoran jika tidak ada query
      }
    });

    // Event listener untuk search input (tekan Enter)
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
          filterRestaurantsByCity(query);
        } else {
          displayRestaurants(restaurants); // Tampilkan semua restoran jika tidak ada query
        }
      }
    });
  },
};

export default beranda;
