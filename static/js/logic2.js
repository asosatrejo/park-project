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
        const amenities_list = []
        for (i=0, i; parkAmenities.length; i++){
            if (park.parkAmenities[i] !== "No"){
                amenities_list.push(park.parkAmenities[i]);
            }
        }
        element.innerHTML = parkAmenities;
    }

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
                const popupContent = `<b>${park.Park_name}</b><br>${park.Address}`;
    
                marker.bindPopup(popupContent);

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
                markers.forEach(marker => {
                    marker.setOpacity(1);
                });

                // Show markers that match the selected city or show all if "All Cities" is selected
                data.forEach(park => {
                    const latitude = park.Latitude;
                    const longitude = park.Longitude;

                    if (selectedCity === "all" || park.City === selectedCity) {
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

