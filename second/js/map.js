mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fsb2hpZGRpbjEyMjEiLCJhIjoiY201NzZud2Q0MDg5MjJqcjd4eXc3aGQ1cSJ9.g0wEIGXxGsbxVJrjBXfK8g';

let infoOpen = document.getElementById("infoOpen")
let placeOpen = document.getElementById("placeOpen")


function nameActive() {
  infoOpen.classList.toggle("active_ride") 
}


function placeActive() {
  placeOpen.classList.toggle("active_ride") 
}
// Foydalanuvchi joylashuvini olish
navigator.geolocation.getCurrentPosition((position) => {
  const userLocation = [position.coords.longitude, position.coords.latitude];

  // Xarita yaratish
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: userLocation, 
    zoom: 6
  });

  // Custom markazdagi ikonka
  const userIcon = document.createElement('div');
  userIcon.className = 'user-icon';
  userIcon.style.width = '40px';
  userIcon.style.height = '40px';
  userIcon.style.backgroundImage = 'url(../images/person.svg)';
  userIcon.style.backgroundSize = 'cover';
  userIcon.style.borderRadius = '50%';

  new mapboxgl.Marker({ element: userIcon })
    .setLngLat(userLocation)
    .addTo(map);

  // Statik yuk ma'lumotlari
  const cargoData = [
    { id: 1, location: [69.2163, 41.2995], title: 'Yuk 1', price: 1500, from: 'Makhachkala', to: 'Moscow', icon: '../images/high.svg' },
    { id: 2, location: [68.2225, 41.3111], title: 'Yuk 2', price: 2000, from: 'Tashkent', to: 'Samarkand', icon: '../images/light.svg' },
    { id: 3, location: [67.2167, 41.3088], title: 'Yuk 3', price: 2500, from: 'Bukhara', to: 'Tashkent', icon: '../images/medium.svg' }
  ]

  map.on('load', () => {
    // GeoJSON radius ma'lumotlarini qo'shish
    map.addSource('radiusSource', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // Загрузки radius qatlamini qo'shish
    map.addLayer({
      id: 'loadingRadiusLayer',
      type: 'fill',
      source: 'radiusSource',
      paint: {
        'fill-color': '#1A73E8',
        'fill-opacity': 0.3
      },
      filter: ['==', ['get', 'type'], 'loading']
    });

    // Выгрузки radius qatlamini qo'shish
    map.addLayer({
      id: 'unloadingRadiusLayer',
      type: 'fill',
      source: 'radiusSource',
      paint: {
        'fill-color': '#fff',
        'fill-opacity': 0.2
      },
      filter: ['==', ['get', 'type'], 'unloading']
    });

    // Yuk markerlarini xaritada ko'rsatish
    cargoData.forEach(cargo => {
      const cargoIcon = document.createElement('div');
      cargoIcon.className = 'cargo-icon';
      cargoIcon.style.width = '50px';
      cargoIcon.style.height = '60px';
      cargoIcon.style.backgroundImage = `url(${cargo.icon})`;
      cargoIcon.style.backgroundSize = 'cover';
      cargoIcon.style.borderRadius = '50%';

      // Narxni formatlash (masalan, 2500 -> 2.5k)
  const formattedPrice = (cargo.price / 1000).toFixed(1) + 'к';

  // Narxni ko'rsatish uchun element yaratish
  const priceElement = document.createElement('span');
  priceElement.className = 'price_marker';
  priceElement.textContent = formattedPrice;

  // Narx elementini cargo-icon ichiga qo'shish
  cargoIcon.appendChild(priceElement);

  // cargoIcon ni tanlangan joyga qo'shing (masalan, DOM element ichiga)
  document.body.appendChild(cargoIcon); 

      const marker = new mapboxgl.Marker({ element: cargoIcon })
        .setLngLat(cargo.location)
        .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="popup_map">
            <div class="w-100 d-flex jbet"> <p class="fs-12 fw-6">Цена:</p> <p class="fs-12 fw-4">${cargo.price}  ₽</p> </div>
    <div class="w-100"> <div class="w-100 extra-line mt-2"> <div> <svg id="cursorLine" class="cursor-line"
                    width="14" height="13" viewBox="0 0 14 13" fill="none" \n xmlns="http://www.w3.org/2000/svg">\n <g
                        filter="url(#filter0_d_25_356)">\n
                        <path\n
                            d="M1.17331 2.14421L5.88691 10.2883C5.9999 10.4835 6.16222 10.6455 6.35758 10.7582C6.55295 10.8708 6.77449 10.9301 7 10.9301C7.22551 10.9301 7.44705 10.8708 7.64242 10.7582C7.83778 10.6455 8.0001 10.4835 8.11309 10.2883L8.11268 10.2883L12.8267 2.14421C12.94 1.94878 12.9997 1.72695 13 1.50107C13.0003 1.27519 12.941 1.05322 12.8282 0.857526C12.7154 0.661829 12.553 0.49931 12.3574 0.386333C12.1618 0.273356 11.9399 0.21391 11.714 0.213982L2.28599 0.213981C2.0601 0.213909 1.83819 0.273355 1.64259 0.386332C1.44699 0.499309 1.28461 0.661828 1.1718 0.857525C1.05899 1.05322 0.999737 1.27519 1 1.50107C1.00027 1.72695 1.06004 1.94878 1.17331 2.14421Z"
                            \n fill="#05388B" />\n
                    </g>\n <defs>\n <filter id="filter0_d_25_356" x="0" y="0.213989" width="14" height="12.7161" \n
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />\n
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" \n result="hardAlpha" />\n
                            <feOffset dy="1" />\n
                            <feGaussianBlur stdDeviation="0.5" />\n
                            <feComposite in2="hardAlpha" operator="out" />\n
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />\n
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25_356" />\n
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_25_356" result="shape" />
                            \n
                        </filter> </defs> </svg></div> </div></div> 
                        <div class="w-100 d-flex jbet mt-sm">
         <p class="fs-12 fw-6">Откуда:</p> <p class="fs-12 fw-4">${cargo.from}</p> </div> 
        <div
        class="w-100 d-flex jbet"> <p class="fs-12 fw-6">Куда:</p> <p class="fs-12 fw-4">${cargo.to}</p> </div> <div
        class="w-100 d-flex jbet"> <p class="fs-12 fw-6">Название:</p> <p class="fs-12 fw-4">${cargo.title}</p>\n </div>
     <div class="w-100 txt-end"> <p class="fs-12 fw-4 success openers" style='text-decoration:underline;'
            onclick='nameActive()' data-value="info-opens">подробно</p> <a  onclick='placeActive()' class="primary w-100 openers" data-value="place-opens" href="#">
            <p class="fs-12 fw-4 w-100 primary">груз на месте выгрузки...</p>
        </a> </div>
          </div>
 
        `);

      marker.setPopup(popup);
    });

    // Slider elementlari
    const loadingRadiusInput = document.getElementById('redRadius');
    const unloadingRadiusInput = document.getElementById('greenRadius');
    const loadingRadiusValue = document.getElementById('loadingRadiusValue');
    const unloadingRadiusValue = document.getElementById('unloadingRadiusValue');

    // Radiuslarni yangilash funksiyasi
    const updateRadiusCircles = () => {
      const loadingRadius = parseFloat(loadingRadiusInput.value); // Загрузки radius
      const unloadingRadius = parseFloat(unloadingRadiusInput.value); // Выгрузки radius

      loadingRadiusValue.textContent = `${loadingRadius} km`;
      unloadingRadiusValue.textContent = `${unloadingRadius} km`;

      // GeoJSON ma'lumotlarini yangilash
      map.getSource('radiusSource').setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [createCircle(userLocation, loadingRadius)]
            },
            properties: { type: 'loading' }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [createCircle(userLocation, unloadingRadius)]
            },
            properties: { type: 'unloading' }
          }
        ]
      });
    };

    // Slider eventlari
    loadingRadiusInput.addEventListener('input', updateRadiusCircles);
    unloadingRadiusInput.addEventListener('input', updateRadiusCircles);

    // Dastlabki radiuslarni yangilash
    updateRadiusCircles();
  });
});

// Halqa uchun koordinatalarni yaratish funksiyasi
function createCircle(center, radiusInKm) {
  const points = 64; // Halqaning silliq ko'rinishi uchun nuqta soni
  const coords = [];
  const earthRadius = 6371; // Yer radiusi (km)

  const [lon, lat] = center;
  const d = radiusInKm / earthRadius;

  for (let i = 0; i <= points; i++) {
    const bearing = (i * 360) / points;
    const bearingRad = (Math.PI / 180) * bearing;

    const latRad = (Math.PI / 180) * lat;
    const lonRad = (Math.PI / 180) * lon;

    const newLat = Math.asin(
      Math.sin(latRad) * Math.cos(d) +
      Math.cos(latRad) * Math.sin(d) * Math.cos(bearingRad)
    );

    const newLon =
      lonRad +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(d) * Math.cos(latRad),
        Math.cos(d) - Math.sin(latRad) * Math.sin(newLat)
      );

    coords.push([(newLon * 180) / Math.PI, (newLat * 180) / Math.PI]);
  }

  return coords;
}
