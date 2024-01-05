mapboxgl.accessToken =
  'pk.eyJ1IjoibW1yZWFsZXN0YXRldGVjaCIsImEiOiJjbHB3bjVsZ2EwZzByMm9wYmVtZDVwb2hyIn0.d66L0eAH0VLt2CvD8stQlw'

// create empty locations geojson object
let mapLocations = {
  type: 'FeatureCollection',
  features: []
}

let selectedMapLocations = []

// Initialize map and load in #map wrapper
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mmrealestatetech/clpwonvpb01id01pa4n307r5n',
  center: [17.929102, 43.808274]
  // minZoom: 1,
  // maxZoom: 20
  // zoom: 5.4
})
// Load an image from an external URL.
// map.loadImage(
//   'https://uploads-ssl.webflow.com/656f3c6c0f405e41180cd571/6579b3d85fb17cf50c09520a_location.png',
//   (error, image) => {
//     if (error) throw error
//     // Add the loaded image to the style's sprite with the ID 'kitten'.
//     map.addImage('custom-marker', image)
//   }
// )

// Adjust zoom of map for mobile and desktop
// let mq = window.matchMedia('(min-width: 480px)')
// if (mq.matches) {
//   map.setZoom(5.4) //set map zoom level for desktop size
// } else {
//   map.setZoom(2.6) //set map zoom level for mobile size
// }

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl())

// Get cms items
let listLocations = document.getElementById('location-list').childNodes

// For each colleciton item, grab hidden fields and convert to geojson proerty
function getGeoData() {
  listLocations.forEach(function (location) {
    // console.log(location)
    let locationLat = location.querySelector('#locationLatitude').value
    let locationLong = location.querySelector('#locationLongitude').value
    let locationInfo = location.querySelector('.locations-map_card').innerHTML
    let coordinates = [locationLong, locationLat]
    let locationID = location.querySelector('#locationID').value
    let geoData = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      },
      properties: {
        id: locationID,
        description: locationInfo
      }
    }

    if (mapLocations.features.includes(geoData) === false) {
      mapLocations.features.push(geoData)
    }
  })
}

getGeoData()

// Define mapping function to be invoked later
function addMapPoints() {
  /* Add the data to your map as a layer */
  map.addLayer({
    id: 'locations',
    type: 'circle',
    // type: 'symbol',
    /* Add a GeoJSON source containing place coordinates and information. */
    source: {
      type: 'geojson',
      data: mapLocations,
      cluster: true,
      clusterMaxZoom: 10, // Max zoom to cluster points on
      clusterRadius: 80
    },
    // layout: {
    //   'icon-image': 'custom-marker'
    // },
    paint: {
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-color': '#cc0000',
      'circle-opacity': 1,
      'circle-stroke-color': 'white'
    }
  })

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'locations',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#cc0000',
      'circle-radius': 20
    }
  })

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'locations',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  })

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'locations', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice()
    const description = e.features[0].properties.description

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    // Populate the popup and set its coordinates if description exists
    if (description) {
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map)
    }
  })

  // Center the map on the coordinates of any clicked circle from the 'locations' layer.
  map.on('click', 'locations', (e) => {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      speed: 0.5,
      curve: 1,
      easing(t) {
        return t
      }
    })
  })
  // Zoom map to fit all locations
  if (mapLocations.features.length > 0) {
    const bounds = new mapboxgl.LngLatBounds()
    mapLocations.features.forEach(function (location) {
      bounds.extend([
        location.geometry.coordinates[0],
        location.geometry.coordinates[1]
      ])
    })

    map.fitBounds(bounds, { padding: 40 })
  }

  // Change the cursor to a pointer when the mouse is over the 'locations' layer.
  map.on('mouseenter', 'locations', () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'locations', () => {
    map.getCanvas().style.cursor = ''
  })

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer'
  })
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = ''
  })
  map.on('click', 'clusters', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    })
    const clusterId = features[0].properties.cluster_id
    map
      .getSource('locations')
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        })
      })
  })
}

//When map is loaded initialize with data
map.on('load', function (e) {
  addMapPoints()
})

const countriesFilterWrap = document.getElementById('location-list')

function handleCountriesFilter() {
  // Remove existing map layer
  if (map.getLayer('locations')) {
    map.removeLayer('locations')
  }

  // Remove cluster layers
  if (map.getLayer('clusters')) {
    map.removeLayer('clusters')
  }

  if (map.getLayer('cluster-count')) {
    map.removeLayer('cluster-count')
  }

  // Remove existing map source
  if (map.getSource('locations')) {
    map.removeSource('locations')
  }
  mapLocations.features = []
  getGeoData()
  addMapPoints()
}

// Finesweet CMS Filter config, events, and callbacks
window.fsAttributes = window.fsAttributes || []
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    // console.log('cmsfilter Successfully loaded!')

    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances

    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on('renderitems', (renderedItems) => {
      handleCountriesFilter()
    })
  }
])

// resize map on left panel toggle
const sidebarLeftToggle = document.getElementById('sidebar-left_icon')
let waitForAnimation = null

sidebarLeftToggle.addEventListener('click', () => {
  if (waitForAnimation) {
    clearTimeout(waitForAnimation)
  }
  waitForAnimation = setTimeout(() => {
    map.resize()
  }, 500)
})
