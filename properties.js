
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW1yZWFsZXN0YXRldGVjaCIsImEiOiJjbHB3bjVsZ2EwZzByMm9wYmVtZDVwb2hyIn0.d66L0eAH0VLt2CvD8stQlw'

  // create empty locations geojson object
  let mapLocations = {
    type: 'FeatureCollection',
    features: []
  }

  let selectedMapLocations = []

  const pitchMap = 60

  // Initialize map and load in #map wrapperd
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mmrealestatetech/clvdp45qa00ku01qz7wx0gymq',
    center: [17.929102, 43.808274],
    // minZoom: 1,
    // maxZoom: 20
    //pitch: pitchMap,
    //bearing: -60,
    zoom: 4.5
  })

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
    if (!map.getLayer('locations')) {
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
          // 'circle-width': 24,
          'circle-radius': 10,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#23323D',
          'circle-color': '#00FF47',
          'circle-opacity': 1
        }
      })
    }
    if (!map.getLayer('clusters')) {
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'locations',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#fff',
          'circle-radius': 20
        }
      })
    }

    if (!map.getLayer('cluster-count')) {
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 16
        },
        paint: {
          'text-color': '#1b2433'
        }
      })
    }

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
        bearing: -60,
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

      //map.setPitch(45);
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
            zoom: zoom,
            bearing: -60
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

  // zoom on hover
  $('.div-block-665').on('mouseenter', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1.05)')
  })
  $('.div-block-665').on('mouseleave', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1)')
  })

  const memberstack = window.$memberstackDom

  const updateButtonVisibility = async function (button, jsonGroup) {
    const itemId = button.getAttribute('ms-code-save-child')
    const member = await memberstack.getMemberJSON()

    const savedItems =
      member.data && member.data[jsonGroup] ? member.data[jsonGroup] : []
    const isItemSaved = savedItems.includes(itemId)

    const saveButton = button
    const parentElement = button.closest('[ms-code-save]')
    const unsaveButtons = parentElement.querySelectorAll(
      `[ms-code-unsave-child="${itemId}"]`
    )

    unsaveButtons.forEach((unsaveButton) => {
      if (isItemSaved) {
        saveButton.style.display = 'none'
        unsaveButton.style.display = 'block'
      } else {
        saveButton.style.display = 'block'
        unsaveButton.style.display = 'none'
      }
    })
  }

  const toggleLikeButton = async function (button, jsonGroup) {
    const itemId = button.getAttribute('ms-code-save-child')
    const member = await memberstack.getMemberJSON()

    if (!member.data) {
      member.data = {}
    }

    if (!member.data[jsonGroup]) {
      member.data[jsonGroup] = []
    }

    const isItemSaved = member.data[jsonGroup].includes(itemId)

    const parentElement = button.closest('[ms-code-save]')
    const unsaveButtons = parentElement.querySelectorAll(
      `[ms-code-unsave-child="${itemId}"]`
    )

    if (isItemSaved) {
      member.data[jsonGroup] = member.data[jsonGroup].filter(
        (item) => item !== itemId
      )
      button.style.display = 'block'
      unsaveButtons.forEach((unsaveButton) => {
        unsaveButton.style.display = 'none'
      })
    } else {
      member.data[jsonGroup].push(itemId)
      button.style.display = 'none'
      unsaveButtons.forEach((unsaveButton) => {
        unsaveButton.style.display = 'block'
      })
    }

    await memberstack.updateMemberJSON({
      json: member.data
    })

    updateButtonVisibility(button, jsonGroup)
  }

  memberstack.getCurrentMember().then(({ data }) => {
    if (data) {
      // Member is logged in
      const saveButtons = document.querySelectorAll('[ms-code-save-child]')

      saveButtons.forEach((button) => {
        const jsonGroup =
          button.getAttribute('ms-code-save') ||
          button.closest('[ms-code-save]').getAttribute('ms-code-save')
        updateButtonVisibility(button, jsonGroup)
        button.addEventListener('click', async function (event) {
          event.preventDefault()
          await toggleLikeButton(button, jsonGroup)
        })
      })

      const unsaveButtons = document.querySelectorAll('[ms-code-unsave-child]')

      unsaveButtons.forEach((button) => {
        const jsonGroup =
          button.getAttribute('ms-code-save') ||
          button.closest('[ms-code-save]').getAttribute('ms-code-save')
        button.addEventListener('click', async function (event) {
          event.preventDefault()
          const parentElement = button.closest('[ms-code-save]')
          const saveButton = parentElement.querySelector(
            `[ms-code-save-child="${button.getAttribute(
              'ms-code-unsave-child'
            )}"]`
          )
          await toggleLikeButton(saveButton, jsonGroup)
        })
      })
    } else {
      const saveButtons = document.querySelectorAll('[ms-code-save-child]')
      const unsaveButtons = document.querySelectorAll('[ms-code-unsave-child]')

      unsaveButtons.forEach((unsaveButton) => {
        unsaveButton.style.display = 'none'
      })

      saveButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
          event.preventDefault()
          memberstack.openModal('SIGNUP').then((loginData) => {
            memberstack.hideModal()
            window.location.reload()
          })
        })
      })
    }
  })

