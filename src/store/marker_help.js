class Place {
  constructor(
    formatted_address,
    name,
    placeId,
    location
  ) {
    this.formatted_address = formatted_address,
    this.name = name,
    this.geometry = {
      placeId: placeId,
      location: {
        lng: geometry.location.lng(),
        lat: geometry.location.lat()
      }
    }
  }
}

// Firestore data converter
const placeConverter = {
  toFirestore: function(place) {
    return {
      formatted_address: place.formatted_address,
      name: place.name,
      geometry: {
        placeId: place.place_id,
        location: {
          lng: place.geometry.location.lng(),
          lat: place.geometry.location.lat()
        }
      }
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new Place (data.placeId, data.name, data.geometry, data.geometry.location, data.formatted_address)
  }
}

export default placeConverter