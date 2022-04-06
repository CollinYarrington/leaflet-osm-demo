document.addEventListener('DOMContentLoaded', (event) => {
    // Defines the map
    var map = L.map('map').setView([0, -0], 4);

    // OMS light map layer
    var osmLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        // fullscreenControl: {
        //     pseudoFullscreen: false // if true, fullscreen to page width and height
        // }
    }).addTo(map);

    // OMS dark map layer
    osmDark = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",{
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        // fullscreenControl: {
        //     pseudoFullscreen: false // if true, fullscreen to page width and height
        // }
    });

    var baseMaps = {
        "OSMlight": osmLight,
        "OSMdark": osmDark
    };

    // This bit of code gets the locations to be displayed within the search results.
    map.addControl( new L.control.search({
        url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
        propertyName: 'display_name',
        jsonpParam: 'json_callback',
        propertyLoc: ['lat','lon'],
        autoCollapse: true,
        autoType: false,
        minLength: 2,
        moveToLocation: function(latlng, title, map) {
            console.log(latlng.lat);
            map.panTo(new L.LatLng(latlng.lat, latlng.lng));
        }
    }).addTo(map));

    L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);
    L.control.scale().addTo(map);

    // This is your main markers A and B
    var mainMarkerStyles = `
        background-color: red;
        width: 25px;
        height: 25px;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        transform: rotate(45deg);
        opacity: 0.6;
        border-top-left-radius: 60%;
        border-top-right-radius: 50% 80%;
        border-bottom-left-radius: 80% 50%;
        border-bottom-right-radius: 0%;`;

    var extraMarkerStyles = `
        background-color: blue;
        width: 25px;
        height: 25px;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        transform: rotate(45deg);
        opacity: 0.6;
        border-top-left-radius: 60%;
        border-top-right-radius: 50% 80%;
        border-bottom-left-radius: 80% 50%;
        border-bottom-right-radius: 0%;`;

    // Adds a new custom Icon using html elements
    var custIcon1 = L.divIcon({
        className:"custom-div-icon",
        iconAnchor: [-15,10],
        labelAnchor: [0, 0],
        popupAnchor: [0, -36],
        html:`<span style="${mainMarkerStyles}" />`
    });

    // Adds a new extra custom Icon using html elements
    var custIcon2 = L.divIcon({
        className:"custom-div-icon",
        iconAnchor: [-15,10],
        labelAnchor: [0, 0],
        popupAnchor: [0, -36],
        html:`<span style="${extraMarkerStyles}" />`
    });

    // This plots the route you between two locations using leaflet-routing-machine
    L.Routing.control({
        waypoints: [
            L.latLng([-33.935863141170785 , 18.378308415412906]),
            L.latLng([-33.83188131822215 , 18.650673329830173])
        ],
        position: 'bottomright',
        createMarker: function(i, wp, nWps) {
            if (i === 0 || i === nWps - 1) {
                // here change the starting and ending icons
                return L.marker(wp.latLng, {
                icon: custIcon1, // here pass the custom marker icon instance
                draggable: true
                }).bindPopup("<p>Some place in Clifton</p>")
                .openPopup();
            } else {
                // here change all the others
                return L.marker(wp.latLng, {
                icon: custIcon2,
                draggable: true
                });
            }
        },
        routeWhileDragging: true
    }).addTo(map);

})



