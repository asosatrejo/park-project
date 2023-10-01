// Read in parks.json from the URL 
const url = "https://gis.charlottenc.gov/arcgis/rest/services/HNS/HousingLocationalToolLayers/MapServer/10/query?outFields=*&where=1%3D1&f=geojson"

let map = L.map('map').setView([ 35.2271, -80.843124], 10);

// Add tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);-80.843124

// Create an empty array to hold park markers
const parkMarkers = [];

// Fetch park data from the URL
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Loop through the park data and create markers for each park
        data.features.forEach(park => {
            const marker = L.marker([park.geometry.coordinates[1], park.geometry.coordinates[0]]).addTo(map);
            
            // Display the park name as a popup
            marker.bindPopup(park.properties.NAME);
            
            // Add the marker to the parkMarkers array
            parkMarkers.push(marker);
        });
    })
