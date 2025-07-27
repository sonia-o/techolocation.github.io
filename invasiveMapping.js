const map1 = L.map('map1').setView([51.3, -85.3], 5); // Updated ID

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map1); // Updated to use map1

const markers1 = L.markerClusterGroup(); // Updated variable name

fetch('invasiveLocDB.csv') 
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            header: true,
            complete: function(results) {
                results.data.forEach(row => {
                    const lat = parseFloat(row.decimalLatitude); 
                    const lon = parseFloat(row.decimalLongitude); 

                    if (!isNaN(lat) && !isNaN(lon)) {
                        const marker = L.marker([lat, lon]).bindPopup(`
                            <b>Species:</b> ${row.species}<br>
                            <b>Location:</b> ${row.locality}<br>
                            <b>Date Observed:</b> ${row.eventDate}
                        `); 
                        markers1.addLayer(marker); 
                    }
                });
                map1.addLayer(markers1); 
            }
        });
    })
    .catch(error => {
        console.error('Error loading the CSV file:', error);
        alert('Failed to load species data. Please check the console for details.');
    });
