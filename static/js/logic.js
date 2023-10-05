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

     // Display Individual Park Info When Selected
     function updateParkInfo(park){
        // Change Park Name When park marker is clicked
        let element = document.getElementById("parkName");
        element.innerHTML = park.Park_name;
        // Change park link
        element = document.getElementById("parkSite");
        element.innerHTML = '<a href="'+park.parkurl +'">Website</a>'
        // Change park Street Name
        element = document.getElementById("parkStreet");
        element.innerHTML = park.Address;
        // Update park image
        /*element = document.getElementById("parkMap");
        element.innerHTML='<img src="ParkMaps/' + park.PARK_ID +'.png" alt="park image">';*/
    }
    // Display Park Amenities
    const parkAmenities = ["restroom", "camping", "picnic", "playground",
        "basketball", "tennis", "volleyball", "shelter", "walking", "dogpark",
        "ampitheate", "garden", "fitness", "gazebo", "playswings", "parking"]
    
    function displayAmenities(park){
        let element = document.getElementById("amenities");
        
        element.innerHTML = amenities_list;
    }


    // Fetch park data from the URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);
            
            // Function to find the coordinates of a city
            function findCityCoordinates(cityName) {
                for (const park of data) {
                    if (park.City === cityName) {
                        console.log(park.Latitude)
                        return [park.Latitude, park.Longitude];
                    }
                }
                return null;
            }
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
                const popupContent = `<b>${park.Park_name}</b>`;

                marker.bindPopup(popupContent);

                // Store the park data with the marker
                marker.park = park;

                // Add the marker to the map
                marker.addTo(map);

                // Add Event Listener when marker is clicked
                marker.addEventListener('click', event => {
                    updateParkInfo(park);
                    displayAmenities(park);
                 });


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

                markers.forEach(marker => {
                    const park = marker.park; // Access park data associated with the marker
            
                    if (selectedCity === "all") {
                        // Show all markers when "all" is selected
                        marker.setOpacity(1);
                        map.setView([35.2271, -80.843124], 10);
                    } else if (park.City === selectedCity) {
                            // Show only markers that match the selected city
                            marker.setOpacity(1);
                        }
                    else {
                        // Hide all markers by default
                        marker.setOpacity(0);
                    }
                });
                map.setView(findCityCoordinates(selectedCity), 12);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
