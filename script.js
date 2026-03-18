let map;
let service;
let infoWindow;
let markers = [];


//login_logout

function goToRole(){
  window.location.href = "role.html";
}

function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}



// 🔥 Toggle logic
// const user = localStorage.getItem("loggedInUser");

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if(user !== null){
  const nameElement = document.getElementById("userName");
  if(nameElement){
    nameElement.innerText = "Hi, " + user.name;
  }
}

if(user){
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "inline-block";
  document.getElementById("profile").style.display = "flex";

} else {
  document.getElementById("loginBtn").style.display = "inline-block";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("profile").style.display = "none";
}

// Initialize Map
function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 28.6139, lng: 77.2090 } // Default: Delhi
  });

  infoWindow = new google.maps.InfoWindow();

  // Auto detect user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(userLocation);

        const userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });

        searchNearbyMechanics(userLocation);
      },
      () => {
        alert("Location access denied.");
      }
    );
  }
}

// Search Nearby Mechanics
function searchNearbyMechanics(location) {

  clearMarkers();
  document.querySelector(".cards-section").innerHTML = "";

  const request = {
    location: location,
    radius: 5000, // 5km radius
    keyword: "car repair"
  };

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, (results, status) => {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

      results.forEach(place => {
        createMarker(place);
        createCard(place);
      });

    } else {
      alert("No mechanics found nearby.");
    }

  });
}

// Create Map Marker
function createMarker(place) {

  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  markers.push(marker);

  marker.addListener("click", () => {
    infoWindow.setContent(`
      <strong>${place.name}</strong><br>
      Rating: ${place.rating || "N/A"}<br>
      ${place.vicinity || ""}
    `);
    infoWindow.open(map, marker);
  });
}

// Create Mechanic Card
function createCard(place) {

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h3>${place.name}</h3>
    <p>⭐ ${place.rating || "N/A"}</p>
    <p>${place.vicinity || ""}</p>
    <button onclick="openLocation('${place.place_id}')">
      View on Map
    </button>
  `;

  document.querySelector(".cards-section").appendChild(card);
}

// Open in Google Maps
function openLocation(placeId) {
  window.open(
    `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    "_blank"
  );
}

// Search by Typed Location
function findMechanic() {

  const address = document.querySelector(".search-box input").value;

  if (!address) {
    alert("Please enter a location.");
    return;
  }

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: address }, (results, status) => {

    if (status === "OK") {

      const location = results[0].geometry.location;

      map.setCenter(location);
      searchNearbyMechanics(location);

    } else {
      alert("Location not found.");
    }

  });
}

// Clear Old Markers
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Emergency Button Action
document.querySelector(".emergency-btn").addEventListener("click", () => {
  alert("Searching nearest emergency mechanic...");
});

