// Load the DOM
document.addEventListener("DOMContentLoaded", function () {
    // Define the URL for fetching park data
    const url = 'http://127.0.0.1:5000/';

    // Create a Leaflet map and set the initial view
    console.log("Initializing Leaflet map...");
    const map = L.map('map').setView([35.2271, -80.843124], 10);

    // Add tile layer to the map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Define an empty array to hold marker objects
    const markers = [];

    // Fetch park data from the URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);

            // Loop through the park data and create markers for each park
            data.forEach(park => {
                const latitude = park.Latitude;
                const longitude = park.Longitude;
                
                // Determine the marker color according to playground or no playground
                const markerColor = park.playground === "Yes" ? "green" : "red";
                
                // Create a marker with a custom icon
                const marker = L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        className: "custom-icon",
                    html: `<div class="marker" style="background-color: ${markerColor};"></div>`
                    })
                });
                
                // Create a popup for each park
                const popupContent = `<b>${park.Park_name}</b><br>${park.Address}`;

                marker.bindPopup(popupContent);

                // Store the park data with the marker
                marker.park = park;

                // Add the marker to the map
                marker.addTo(map);

                // Store the marker in the markers array
                markers.push(marker);
            });

            // Populate the dropdown with city values
            const cities = [...new Set(data.map(park => park.City))];
            const cityDropdown = document.getElementById("CityDropdown");

            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                cityDropdown.appendChild(option);
            });

            // Event listener for dropdown change
            cityDropdown.addEventListener("change", function () {
                const selectedCity = cityDropdown.value;
                
                // Update the selected city label
                const selectedCityLabel = document.getElementById("SelectedCityLabel");
                // selectedCityLabel.textContent = `Selected City: ${selectedCity}`;

                markers.forEach(marker => {
                    const park = marker.park; // Access park data associated with the marker
            
                    if (selectedCity === "all") {
                        // Show all markers when "all" is selected
                        marker.setOpacity(1);
                    } else if (park.City === selectedCity) {
                            // Show only markers that match the selected city
                            marker.setOpacity(1);
                        }
                    else {
                        // Hide all markers by default
                        marker.setOpacity(0);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

