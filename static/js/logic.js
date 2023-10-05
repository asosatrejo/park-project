document.addEventListener("DOMContentLoaded", function () {
    // Define the URL for fetching park data
    const url = 'http://127.0.0.1:5000/';

    // Initialize Leaflet map
    console.log("Initializing Leaflet map...");
    const map = L.map('map').setView([35.2271, -80.843124], 10);

    // Add tile layer to the map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Create and add legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create("div", "legend");
        const legendItems = [
            { label: "Playground", color: "green" },
            { label: "No Playground", color: "red" },
        ];
        legendItems.forEach((item) => {
            const legendItem = L.DomUtil.create("div", "legend-item", div);
            const legendMarker = L.DomUtil.create("div", "legend-marker", legendItem);
            legendMarker.style.backgroundColor = item.color;
            L.DomUtil.create("span", "legend-label", legendItem).textContent = item.label;
        });
        return div;
    };
    legend.addTo(map);

    // Marker array and park info update functions
    const markers = [];
    function updateParkInfo(park) {
        document.getElementById("parkName").innerHTML = park.Park_name;
        document.getElementById("parkSite").innerHTML = '<a href="'+park.parkurl +'">Website</a>';
        document.getElementById("parkStreet").innerHTML = park.Address;
    }

    // Amenity display and meter creation functions
    const parkAms = ["Restroom", "Camping", "Picnic Area", "Playground",
        "Basketball", "Tennis", "Volleyball", "Walking Trail", "Dogpark",
        "Garden", "Fitness", "Gazebo", "Play Swings", "Parking"];

    function displayAmenities(park) {
        let element = document.getElementById("amenities");
        let amenities_list = [];
        let amenities_count = 0; // Initialize count to 0

        for (const [index, amenity] of parkAms.entries()) {
            if (park[amenity.toLowerCase().replace(/ /g, "")] === "Yes") {
                amenities_count++;
                amenities_list.push(parkAms[index]);
            }
        }

        // Update the amenities list display
        element.innerHTML = "";  // Clear previous amenities
        amenities_list.forEach(amenity => {
            let li = document.createElement('li');
            li.innerText = amenity;
            element.appendChild(li);
        });

        return amenities_count;
    }

    function createAmenityMeter(count) {
        const totalAmenities = 14;
        const percentage = (count / totalAmenities) * 100;

        return `
            <div class="amenity-meter-bg">
                <div class="amenity-meter-fill" style="width: ${percentage}%;" data-count="${count}"></div>
            </div>
            <div class="amenity-count">${count}/${totalAmenities} amenities</div>
        `;
    }

   // Fetch park data
fetch(url)
.then(response => response.json())
.then(data => {
    function findCityCoordinates(cityName) {
        for (const park of data) {
            if (park.City === cityName) {
                return [park.Latitude, park.Longitude];
            }
        }
        return null;
    }

    // Create markers with popups
    data.forEach(park => {
        const markerColor = park.playground === "Yes" ? "green" : "red";
        const marker = L.marker([park.Latitude, park.Longitude], {
            icon: L.divIcon({
                className: "custom-icon",
                html: `<div class="marker" style="background-color: ${markerColor};"></div>`
            })
        });

        const amenitiesCount = displayAmenities(park);
        const amenityMeterHtml = createAmenityMeter(amenitiesCount);
        const popupContent = `<b>${park.Park_name}</b><br>${amenityMeterHtml}`;
        marker.bindPopup(popupContent);
        marker.park = park;
        marker.addTo(map);
        marker.addEventListener('click', () => {
            updateParkInfo(park);
            displayAmenities(park);
        });
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
            const park = marker.park; // Access park data associated with the marker

            if (selectedCity === "all") {
                marker.setOpacity(1);
                map.setView([35.2271, -80.843124], 10);
            } else if (park.City === selectedCity) {
                marker.setOpacity(1);
            } else {
                marker.setOpacity(0);
            }
        });
        map.setView(findCityCoordinates(selectedCity), 12);
    });

    // Calculate the average amenities across all parks
let totalAmenitiesCount = 0;
data.forEach(park => {
    totalAmenitiesCount += displayAmenities(park);
});
const averageAmenities = Math.round(totalAmenitiesCount / data.length);  // Round the average value

// Create and display the average amenities meter
const averageAmenityMeterHtml = createAmenityMeter(averageAmenities);
const averageAmenityMeterDiv = document.createElement('div');
averageAmenityMeterDiv.id = 'averageAmenityMeter';
averageAmenityMeterDiv.innerHTML = `
    <h3>Average Park Amenities</h3>
    ${averageAmenityMeterHtml}
`;
document.body.appendChild(averageAmenityMeterDiv);

})
.catch(error => {
    console.error('Error fetching data:', error);
});
});

// Gauge Chart
var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: 2, // Updated value to 2
        title: { text: "Park Amenities: 2/14" }, // Updated title to display "2/14"
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 14] // Set the maximum range of the gauge to 14
            }
        }
    }
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gaugeDiv', data, layout);
