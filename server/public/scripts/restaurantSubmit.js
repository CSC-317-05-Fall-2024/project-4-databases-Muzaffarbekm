function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const form = event.target;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send a POST request to the server
    fetch('/api/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 201) {
            // Restaurant created successfully
            // Redirect to the restaurants page
            window.location.href = '/restaurants';
        } else {
            // Handle errors
            alert('Failed to add the restaurant.');
        }
    })
    .catch(error => {
        console.error('Error adding restaurant:', error);
    });
}

// Assign the event handler to the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#restaurant-form form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
