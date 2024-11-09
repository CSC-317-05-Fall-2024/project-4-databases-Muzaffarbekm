/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/
// public/scripts/header.js

// Populate the header
document.querySelector('header').innerHTML = `
    <header>Travel Guide</header>
`;

// Populate the navigation bar
document.querySelector('nav').innerHTML = `
    <a href="/">Home</a>
    <a href="/attractions">Attractions</a>
    <a href="/restaurants">Restaurants</a>
    <a href="/add-restaurant.html">Add Restaurant</a> <!-- New link -->
`;


// Populate the footer
document.querySelector('footer').innerHTML = `
    <p>&copy; 2024 Travel Guide. All rights reserved.</p>
`;


