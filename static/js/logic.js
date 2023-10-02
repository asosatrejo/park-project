// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Define the URL for fetching park data
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://127.0.0.1:5000/';

    // Create a Leaflet map and set the initial view
    console.log("Initializing Leaflet map...");
    const map = L.map('map').setView([35.2271, -80.843124], 10);

// Add tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create an empty array to hold park markers
const parkMarkers = [];

// Fetch park data from the URL
fetch(proxyUrl + apiUrl)
    .then(response => response.json())
    .then(data => {
        // Loop through the park data and create markers for each park
        data.forEach(park => {
            const latitude = park.Latitude;
            const longitude = park.Longitude;
            const marker = L.marker([latitude, longitude]).addTo(map);
            
            // Display the park name as a popup
            marker.bindPopup(park.Park_name);
            
            // Add the marker to the parkMarkers array
            parkMarkers.push(marker);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
