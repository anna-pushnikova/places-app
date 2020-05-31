<template>

<div class="map-container mt-5">
  <div style="display: none">
    <input 
      id="pacInput"
      class="controls"
      type="text"
      placeholder="Enter a location"
      ref="pacInput"
      @keydown.stop="onKeydown">
  </div>
  <div class="map" ref="map"></div>
  <div id="infowindow-content" ref="infowindowContent">
    Name: <span id="place-name" class="title"></span><br>
    Address: <span id="place-address"></span><br>
    <button v-if="isAutocomplete" rel="addMarkerButton" class="my-1 ml-1 btn btn-success" type="button" id="place-button" @click="addMarker">Add Place</button>
    <button v-else-if="!isAutocomplete" rel="addMarkerButton" class="my-1 ml-1 btn btn-info" type="button" id="place-button" @click="removeMarker">Remove Place</button>
  </div>
</div>

</template>

<script>
import gmapsInit from '@/utils/gmaps'

export default {
  data: () => ({
    isAutocomplete: true,
    place: null,
    infowindow: null,
    map: null,
    marker: null,
    autocomplete: null,
    placeId: '',
    alert: false
  }),
  mounted() {
    this.initGMap()
    this.displayFetchedMarkers()
  },
  methods: {
    async removeMarker() {
      try {
        await this.$store.dispatch('deleteMarker', this.placeId)
        this.$swal('Marker was deleted', 'success') 
      } catch (e) {
        this.$swal('Something went wrong', 'error')
      }
      
      this.initGMap()
      this.displayFetchedMarkers()
    },
    onKeydown(event) {
      const newEvent = new Event('keydown')
      newEvent.keyCode = 40

      // If enter key, or tab key
      if (event.keyCode === 13 || event.keyCode === 9) {
        google.maps.event.trigger(event.target, 'keydown', newEvent)
      }
    },
    async fetchMarkers() {
      return await this.$store.dispatch('fetchMarkers')
    },
    async displayFetchedMarkers() {
      const places = await this.fetchMarkers()

      places.forEach(place => {

        const marker = new google.maps.Marker({
          map: this.map,
          place: place.geometry
        })

        marker.setVisible(true)

        marker.addListener('click', () => {
          this.placeId = place.geometry.placeId
          
          this.isAutocomplete = false

          this.infowindow.close()
          this.setInfoWindowContent(place)
          this.infowindow.open(this.map, marker);
          
        })
      })
    },
    async addMarker() {
      const places = await this.fetchMarkers()

      if (places.findIndex(place => place.geometry.placeId === this.marker.place.placeId) !== -1) {
        this.$swal('Marker already exists', 'warning') 
      } else {
        try {
          await this.$store.dispatch('setMarker', this.place) 
          this.$swal('Marker was added', 'success')
        } catch(e) {
          this.$swal('Something went wrong', 'error')
        }
      }
    },
    setInfoWindowContent(place) {
       // Select info window
      this.infowindow = new google.maps.InfoWindow()
      const infowindowContent = this.$refs.infowindowContent
      this.infowindow.setContent(infowindowContent)

      infowindowContent.children['place-name'].textContent = place.name
      infowindowContent.children['place-address'].textContent = place.formatted_address
    
    },
    autocompleteHandler() {
      this.infowindow.close()
      this.isAutocomplete = true

      this.place = this.autocomplete.getPlace()

      if (!this.place.geometry) {
        return
      }

      if (this.place.geometry.viewport) {
        this.map.fitBounds(this.place.geometry.viewport)
      } else {
        this.map.setCenter(this.place.geometry.location)
        this.map.setZoom(17)
      }

      // Set the position of the marker using the place ID and location.
      this.marker.setPlace({
        placeId: this.place.place_id,
        location: this.place.geometry.location,
      })

      this.marker.setVisible(true)

      this.setInfoWindowContent(this.place)
      this.infowindow.open(this.map, this.marker)
    },
    setMarker() {
      this.marker = new google.maps.Marker({
        map: this.map
      });

      this.marker.addListener('click', () => {
        this.infowindow.open(this.map, this.marker)
      })
    },
    setAutocomplete() {
      /*
      * Autocomplete
      */
    
      // set Autocomplete for input
      const input = this.$refs.pacInput
      this.autocomplete = new google.maps.places.Autocomplete(input)
      this.autocomplete.bindTo('bounds', this.map)

      // Specify the place data fields that needed
      this.autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

      this.setMarker()

      this.autocomplete.addListener('place_changed', this.autocompleteHandler);
      
    },
    async initGMap() {
      /*
      * Init Map
      */
      const google = await gmapsInit()

      // Set Map
      const sydney = new google.maps.LatLng(-33.867, 151.195)
      this.map = new google.maps.Map(this.$refs.map, {center: sydney, zoom: 5})
      this.infowindow = new google.maps.InfoWindow()

      this.setAutocomplete()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
@import '~bootstrap/scss/_alert.scss';

.map-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.btn {
  font-size: 14px;
  padding: 2px 5px;
}

.map {
  overflow: hidden;
  height: 100%;
  width: 100%;
  z-index: 0;
  color: #333;
  z-index: 0;
}

.controls {
  background-color: map_get($colors, "white");
  border-radius: 2px;
  border: 1px solid transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  height: 40px;
  margin-left: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

.controls:focus {
  border-color: map_get($colors, "crimson");
}

#infowindow-content {
  display: none;
}

.map #infowindow-content {
  display: inline-block;

}

.alert {
  display: block;
  position: absolute;
  bottom: 5%;
  left: 5%;
}
</style>
