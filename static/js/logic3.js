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
        element.innerHTML = amenities_list.join(", ");
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

// Fetch and Plot Gauge
fetch('http://127.0.0.1:5000/Park_Amenities.csv')
.then(response => response.text())
.then(data => {
    const allLines = data.split('\n');
    const header = allLines[0].split(',');
    const amenityCountIndex = header.indexOf('amenity_count');
    
    let totalAmenities = 0;
    let rowCount = 0;
    
    for (let i = 1; i < allLines.length; i++) {
        const line = allLines[i].split(',');
        if (line[amenityCountIndex]) {
            totalAmenities += Number(line[amenityCountIndex]);
            rowCount++;
        }
    }

    const averageAmenities = totalAmenities / rowCount;
    buildAmenitiesGauge(averageAmenities);
      })
      .catch(error => {
          console.error('Error:', error);
      });

      function buildAmenitiesGauge(totalParks, parksWithAmenities) {
        var averageAmenities = parksWithAmenities;
        var maxAmenities = totalParks;
        var level = (averageAmenities / maxAmenities) * 180;
    
        var degrees = 180 - level;
        var radius = 0.5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
    
        var mainPath = "M -.0 -0.05 L .0 0.05 L ";
        var pathX = String(x);
        var space = " ";
        var pathY = String(y);
        var pathEnd = " Z";
        var path = mainPath.concat(pathX, space, pathY, pathEnd);
    
        var data = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "27,161,187,1" },
                showlegend: false,
                name: "Amenities",
                text: averageAmenities,
                hoverinfo: "text+name"
            },
            {
                values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                rotation: 90,
                text: ["18-20", "16-18", "14-16", "12-14", "10-12", "8-10", "6-8", "4-6", "2-4", "0-2"],
                textinfo: "text",
                textposition: "inside",
                marker: {
                    colors: [
                        "rgba(0, 105, 11, .5)",
                        "rgba(10, 120, 22, .5)",
                        "rgba(14, 127, 0, .5)",
                        // ... more colors can be added based on the range
                    ]
                },
                labels: ["18-20", "16-18", "14-16", "12-14", "10-12", "8-10", "6-8", "4-6", "2-4", "0-2"],
                hoverinfo: "label",
                hole: 0.5,
                type: "pie",
                showlegend: false
            }
        ];
    
        var layout = {
            shapes: [
                {
                    type: "path",
                    path: path,
                    fillcolor: "rgba(27,161,187,1)",
                    line: {
                        color: "rgba(27,161,187,1)"
                    }
                }
            ],
            title: "<b>Average Park Amenities</b>",
            height: 550,
            width: 550,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };
    
        var GAUGE = document.getElementById("gaugeDiv");
        Plotly.newPlot(GAUGE, data, layout);
    }
    
    fetch('http://127.0.0.1:5000/Park_Amenities.csv')
        .then(response => response.text())
        .then(data => {
            const allLines = data.split('\n');
            const header = allLines[0].split(',');
            const amenityCountIndex = header.indexOf('amenity_count');
    
            let totalAmenities = 0;
            let rowCount = 0;
    
            for (let i = 1; i < allLines.length; i++) {
                const line = allLines[i].split(',');
                if (line[amenityCountIndex]) {
                    totalAmenities += Number(line[amenityCountIndex]);
                    rowCount++;
                }
            }
    
            const averageAmenities = totalAmenities / rowCount;
            buildAmenitiesGauge(20, averageAmenities);  // Total parks set as 20 for the gauge
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
    fetch('http://127.0.0.1:5000/filtered_parks_count')
        .then(response => response.json())
        .then(data => {
            fetch('http://127.0.0.1:5000/')
                .then(response => response.json())
                .then(allParks => {
                    buildAmenitiesGauge(allParks.length, data.count);
                }
                )
        }
        )
        .catch(error => {
            console.error('Error:', error);
        });

