// Function to fetch and render restaurants
async function fetchAndRenderRestaurants() {
    try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const restaurants = await response.json();
        renderRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        displayError('Failed to load restaurants. Please try again later.');
    }
}

// Function to display error messages
function displayError(message) {
    const main = document.querySelector('main.restaurants');
    main.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="fetchAndRenderRestaurants()">Try Again</button>
        </div>
    `;
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
            <img src="${restaurant.photo}" alt="${restaurant.name}">
            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>
                <p class="address">📍 ${restaurant.address}</p>
                <p class="phone">📞 ${restaurant.phone}</p>
            </div>
            <button class="delete-btn" aria-label="Delete ${restaurant.name}">×</button>
        `;

        // Add event listener to the delete button
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click when clicking delete
            if (confirm(`Are you sure you want to delete ${restaurant.name}?`)) {
                deleteRestaurant(restaurant.id);
            }
        });

        // Make the whole card clickable except for the delete button
        card.addEventListener('click', () => {
            window.location.href = `/restaurants/${restaurant.id}`;
        });

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
            // Add a small delay to account for Railway's propagation time
            setTimeout(fetchAndRenderRestaurants, 1000);
        } else {
            throw new Error('Failed to delete restaurant');
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        alert('Failed to delete the restaurant. Please try again later.');
    }
}

// Initial fetch and render when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderRestaurants);