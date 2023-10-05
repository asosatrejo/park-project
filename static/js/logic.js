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

    // Color variables
    const yesPlay = "#08b626";
    const noPlay = "#2665ba"

    // Create a legend control and position it in the bottom right corner
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create("div", "legend");

        // Define legend items
        const legendItems = [
            { label: "Playground", color: yesPlay },
            { label: "No Playground", color: noPlay },
        ];

        // Create legend items
        legendItems.forEach((item) => {
            const legendItem = L.DomUtil.create("div", "legend-item", div);
            const legendMarker = L.DomUtil.create("div", "legend-marker", legendItem);
            legendMarker.style.backgroundColor = item.color;
            L.DomUtil.create("span", "legend-label", legendItem).textContent = item.label;
        });

        return div;
    };

    // Add the legend to the map
    legend.addTo(map);

    // Define an empty array to hold marker objects
    const markers = [];

    // Create overlay layers for different park types
    const parkTypeOverlay = {
        "Community Park": L.layerGroup(),
        "Neighborhood Park": L.layerGroup(),
        "Regional Park": L.layerGroup(),
        "Golf Course": L.layerGroup(),
        "Nature Preserve": L.layerGroup(),
    };
    // Add the overlay layers to the map using the L.control.layers control
    const overlayControl = L.control.layers(null, parkTypeOverlay, { collapsed: false });
    //overlayControl.addTo(map);

    // Display Individual Park Info When Selected
    function updateParkInfo(park) {
        // Change Park Name When park marker is clicked
        let element = document.getElementById("parkName");
        element.innerHTML = park.Park_name;
        // Change park link
        element = document.getElementById("parkSite");
        element.innerHTML = "More Info: " + '<a href="' + park.parkurl + '">Website</a>'
        // Change park Street Name
        element = document.getElementById("parkStreet");
        element.innerHTML = park.Address;
        // Change park Phone
        element = document.getElementById("parkNum");
        element.innerHTML = "Phone Number: " + park.Phone;
        // Change park Type
        element = document.getElementById("parkType");
        element.innerHTML = park.PARK_TYPE;
    }

    // Display Park Amenities
    const parkAms = [" Restroom", " Camping", " Picnic Area", " Playground",
        " Basketball", " Tennis", " Volleyball", " Walking Trail", " Dogpark",
        " Garden", " Fitness", " Gazebo", " Play Swings", " Parking"]
    
    function displayAmenities(park){
        const element = document.getElementById("amenities");
        element.innerHTML = '';

        let amenities_list = [];
        let amenities_count = -1;

        // Check for Amenities to Display
        (park.restroom == "Yes") ? amenities_count++ && amenities_list.push(parkAms[0]) : console.log("false");
        (park.camping == "Yes") ? amenities_count++ && amenities_list.push(parkAms[1]) : console.log("false");
        (park.picnic == "Yes") ? amenities_count++ && amenities_list.push(parkAms[2]) : console.log("false");
        (park.playground == "Yes") ? amenities_count++ && amenities_list.push(parkAms[3]) : console.log("false");
        (park.basketball == "Yes") ? amenities_count++ && amenities_list.push(parkAms[4]) : console.log("false");
        (park.tennis == "Yes") ? amenities_count++ && amenities_list.push(parkAms[5]) : console.log("false");
        (park.volleyball == "Yes") ? amenities_count++ && amenities_list.push(parkAms[6]) : console.log("false");
        (park.walking == "Yes") ? amenities_count++ && amenities_list.push(parkAms[7]) : console.log("false");
        (park.dogpark == "Yes") ? amenities_count++ && amenities_list.push(parkAms[8]) : console.log("false");
        (park.garden == "Yes") ? amenities_count++ && amenities_list.push(parkAms[9]) : console.log("false");
        (park.fitness == "Yes") ? amenities_count++ && amenities_list.push(parkAms[10]) : console.log("false");
        (park.gazebo == "Yes") ? amenities_count++ && amenities_list.push(parkAms[11]) : console.log("false");
        (park.playswings == "Yes") ? amenities_count++ && amenities_list.push(parkAms[12]) : console.log("false");
        (park.parking == "Yes") ? amenities_count++ && amenities_list.push(parkAms[13]) : console.log("false");

        // Display Amenities in a list, create li to append to list
        for (i = 0; i < amenities_list.length; i++) {
            let li = document.createElement('li');
            li.innerText = amenities_list[i];
            element.appendChild(li);
        }

        (amenities_count === -1) ? amenities_count = 0 : amenities_count = amenities_count;
        return amenities_count;
    };

    // Create Bar Chart to Display Zipcodes
    // Function to create and display a chart
    let parkChart = null;
    function createParkChart(selectedZip) { 
        // Extract park information 
        const zipCounts = {}; 
        selectedZip.forEach((x) => {zipCounts[x] = (zipCounts[x]||0)+1;});
        const chartCanvas = document.getElementById('parkChart');
        
        // Get the canvas element where the chart will be displayed 
        if (!parkChart) {
             
            // Create a chart context 
            const ctx = chartCanvas.getContext('2d'); 
            // Define the chart data 
            const chartData = { 
                labels: Object.keys(zipCounts), 
                datasets: [ { data: Object.values(zipCounts), 
                    label: 'Zip Codes',
                    backgroundColor: [ 
                        'rgba(110,144,60,0.5)', 
                        'rgba(148,229,107,0.5)', 
                        'rgba(0, 138, 133, 0.5)', 
                        'rgba(8,182,38,0.5)', 
                        'rgba(38,101,186,0.5)' ], 
                    borderColor: [ 
                        'rgba(110,144,60,1)', 
                        'rgba(148,229,107,1)', 
                        'rgba(0, 138, 133, 1)', 
                        'rgba(8,182,38,1)', 
                        'rgba(38,101,186,1)' ], 
                    borderWidth: 1, }, ], }; 
            // Define the chart options 
            const chartOptions = { 
                responsive: true, 
                maintainAspectRatio: false, }; 
            // Create the chart 
            parkChart = new Chart(ctx, { type: 'bar', data: chartData, options: chartOptions, }); 
             
        } else {
            parkChart.data.datasets[0].data = Object.values(zipCounts);
            parkChart.data.labels.data = Object.values(zipCounts);
            parkChart.update();
        };
        
        chartCanvas.style.display = 'block'; // Show the chart
         
    };

    
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

    // Fetch park data from the URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);


// ----------------- Main -----------------

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
                const markerColor = park.playground === "Yes" ? yesPlay : noPlay;
                // Create a marker with a custom icon
                const marker = L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        className: "custom-icon",
                        html: `<div class="marker" style="background-color: ${markerColor};"></div>`
                    })
                });
                // Amenities
                const amenitiesCount = displayAmenities(park);
                const amenityMeterHtml = createAmenityMeter(amenitiesCount);
                // Create a popup for each park
                const popupContent = `<b>${park.Park_name}</b><br>${amenityMeterHtml}`;
                marker.bindPopup(popupContent);
                // Store the park data with the marker
                marker.park = park;
                // Determine the overlay layer based on the park type and add the marker to it
                if (parkTypeOverlay[park.Park_type]) {
                    parkTypeOverlay[park.Park_type].addLayer(marker);
                }
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
            
            const allZip = data.map(park => {
                return park["Zip Code"]; // Return zipcodes
            });
            createParkChart(allZip);
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
                        createParkChart(allZip);
                    } else if (park.City === selectedCity) {
                        // Show only markers that match the selected city
                        marker.setOpacity(1);
                    } else {
                        // Hide all markers by default
                        marker.setOpacity(0);
                    }
                });
                map.setView(findCityCoordinates(selectedCity), 12);
                // Filter data by park based on selected city
                const selectedZip = data.filter(park => {
                    return park.City === selectedCity;
                })
                .map(park => {
                    return park["Zip Code"]; // Return zipcodes
                });
                createParkChart(selectedZip);
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
        title: { text: "Average Amenities: 2/14" }, // Updated title to display "2/14"
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 14] // Set the maximum range of the gauge to 14
            }
        }
    }
    ];
    var layout = { width: 300, height: 200, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gaugeDiv', data, layout);