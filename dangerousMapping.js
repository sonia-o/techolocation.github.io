const map2 = L.map('map2').setView([51.3, -85.3], 5); // Updated ID

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map2); // Updated to use map2

const markers2 = L.markerClusterGroup(); // Updated variable name

fetch('dangerousLocDB.csv') 
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
                        markers2.addLayer(marker); 
                    }
                });
                map2.addLayer(markers2); 
            }
        });
    })
    .catch(error => {
        console.error('Error loading the CSV file:', error);
        alert('Failed to load species data. Please check the console for details.');
    });
