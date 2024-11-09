// Function to fetch and render restaurants
async function fetchAndRenderRestaurants() {
    try {
        const response = await fetch('/api/restaurants');
        const restaurants = await response.json();
        renderRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
}

// Function to render restaurants
function renderRestaurants(restaurants) {
    const main = document.querySelector('main.restaurants');
    main.innerHTML = ''; // Clear existing content

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.setAttribute('data-id', restaurant.id);

        card.innerHTML = `
            <img src="${restaurant.photo}" alt="Restaurant Image">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.address}</p>
            <p>${restaurant.phone}</p>
            <button class="delete-btn">X</button>
        `;

        // Add event listener to the delete button
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteRestaurant(restaurant.id));

        main.appendChild(card);
    });
}

// Function to delete a restaurant
async function deleteRestaurant(id) {
    try {
        const response = await fetch(`/api/restaurants/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            // Re-fetch and re-render restaurants
            await fetchAndRenderRestaurants();
        } else {
            alert('Failed to delete the restaurant.');
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
    }
}

// Initial fetch and render when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderRestaurants);
