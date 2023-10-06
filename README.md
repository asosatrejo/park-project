# park-project
# Project Overview
![image](https://github.com/asosatrejo/park-project/assets/135572871/2e243cf5-0c31-485a-90d9-9a748c30656c)

This data visualization project displays an interactive visualization of Mecklenburg County parks and their amenities within a given area. The project utilizes various technologies, including Python Flask for the API, HTML/CSS for the frontend, JavaScript for user interaction, and Leaflet for map visualization.

# Project highlights:
- **Backend** Our visualization includes a Python Flask-powered API, HTML/CSS, JavaScript, and MongoDB database. <br>
- **Frontend** Our Mecklenburg County Parks dashboard page includes multiple charts that all update from the same dataset. <br>
- **JS Libraries** The dashboard displays park zip codes using the charts.js library that updates when a specific city is selected and a gauge chart that visualizes the number of amenities in a park using Plotly.<br>
- **Dataset** It is powered by a dataset containing records for 365 parks. <br>
- **User-driven interaction** Our dashboard uses a drop down menu to filter parks by city with a zoom feature that centers the map.. Markers are also color coded to display parks with and without playgrounds. <br>
- **Views** The visualization includes a Leaflet map with a tile layer from OpenStreetMaps for location, a chart with park zip codes, a filtered list of park amenities, and an amenities gauge to show the average number of 
 amenities. <br>

### Usage
The map view displays markers representing parks on an interactive map.
Users can select a city from the dropdown menu to filter parks by city.
Clicking on a park marker on the map will display detailed information about the selected park.
The "Park Amenities View" lists the amenities available at the selected park.

### Data Source
This project includes records for 365 parks in Mecklenburg County obtained from:
* [The City of Charlotte Open Data Portal](https://data.charlottenc.gov/)
* [Open Mapping Mecklenburg County GIS](https://maps.mecknc.gov/openmapping/index.html)

# Requirements
### Data and Delivery
- Data components used in the project are clearly documented. 
- The dataset contains at least 100 unique records.
- A database is used to house the data (SQL, MongoDB, SQLite, etc.). 
- The project is powered by a Python Flask API and includes HTML/CSS, JavaScript, and the chosen database. 
### Back End 
- The page created to showcase data visualizations runs without error. 
- A JavaScript library not shown in class is used in the project. 
- The project conforms to one of the following designs: 
- A Leaflet or Plotly chart built from data gathered through web scraping.
- A dashboard page with multiple charts that all reference the same data.
### Visualizations 
- A minimum of three unique views present the data.
- Multiple user-driven interactions (such as dropdowns, filters, or a zoom feature) are included on the final page. 
- The final page displays visualizations in a clear, digestable manner. 
- The data story is easy to interpret for users of all levels. 
### Group Presentation 
- All group members speak during the presentation. 
- The content is relevant to the project.
- The presentation maintains audience interest. 
- Content, transitions, and conclusions flow smoothly within any time restrictions. 

## Helpful Links
### Chart.js
- [Getting Started](https://www.chartjs.org/docs/latest/getting-started/)
- [Updating Charts using Charts.js](https://www.chartjs.org/docs/latest/developers/updates.html)

### HTML Related
- [How to create columns in HTML](https://www.educative.io/answers/how-to-create-columns-in-html)
- [JavaScript HTML DOM EventListener](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
- [How to create columns using HTML](https://www.educative.io/answers/how-to-create-columns-in-html)
- [How to create columns using HTML](https://www.educative.io/answers/how-to-create-columns-in-html)

### Other
- [An Abbreviated JavaScript If Statement](https://www.thoughtco.com/create-a-shorter-if-statement-in-javascript-2037428#:~:text=variable%20name%20contains.-,A%20Shorter%20IF%20Statement,are%20optional%20for%20single%20statements)
- [In the park Color Palette](https://www.color-hex.com/color-palette/7650)
- [Palette](http://colrd.com/palette/19065/)
