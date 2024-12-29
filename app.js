document.addEventListener("DOMContentLoaded", () => {
    var map = L.map('map').setView([20.5937, 78.9629], 5);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    var customIcon = L.icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    var marker = L.marker([20.5937, 78.9629], { icon: customIcon }).addTo(map);
  
    var socket = io.connect('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });
  
    socket.on('locationUpdate', function(data) {
      var lat = data.latitude;
      var lon = data.longitude;
  
      marker.setLatLng([lat, lon]);
      map.setView([lat, lon], 14);
    });
  });
  