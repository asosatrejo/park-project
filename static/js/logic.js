// Wait for the DOM to be fully loaded before running the script
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
                console.log("Creating marker for park:", park.Park_name, "Lat:", latitude, "Lon:", longitude);

                // Create a marker for each park
                const marker = L.marker([latitude, longitude]);
                marker.bindPopup(park.Park_name);

                // Add the marker to the map
                marker.addTo(map);

                // Store the marker in the markers array
                markers.push(marker);
            });

            // Populate the dropdown with unique park_type values
            const parkTypes = [...new Set(data.map(park => park.PARK_TYPE))];
            const typeDropdown = document.getElementById("parkTypeDropdown");

            parkTypes.forEach(parkType => {
                const option = document.createElement("option");
                option.value = parkType;
                option.textContent = parkType;
                typeDropdown.appendChild(option);
            });

            // Event listener for dropdown change
            typeDropdown.addEventListener("change", function () {
                const selectedType = typeDropdown.value;

                // Hide all markers
                markers.forEach(marker => {
                    marker.setOpacity(0);
                });

                // Show markers that match the selected park_type or show all if "All Types" is selected
                data.forEach(park => {
                    const latitude = park.Latitude;
                    const longitude = park.Longitude;

                    if (selectedType === "all" || park.PARK_TYPE === selectedType) {
                        const matchingMarker = markers.find(marker => {
                            const [lat, lon] = marker.getLatLng();
                            return lat === latitude && lon === longitude;
                        });

                        if (matchingMarker) {
                            matchingMarker.setOpacity(1);
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
