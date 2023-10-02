/*const element = document.getElementById("id01");
element.innerHTML = "New Heading";*/

// Update Park Name when Clicked on
const pName = document.getElementById("parkName")

map.addEventListener('tap', event => {
    if (event.target instanceof H.map.Marker) {
        // Some action. Typically, you want to use the data that you may have referenced
        // in the marker creation code, or get the coordinates. Here we log the data
        console.log( event.target.getData() );
        Element.innerHTML = park.park_name;
     }
 }