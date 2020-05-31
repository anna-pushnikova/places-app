import firebase from 'firebase'
import placeConverter from '@/store/marker_help.js'

export default {

  actions: {   

    async setMarker({commit}, place) {
      const placeToSend = placeConverter.toFirestore(place)
      await firebase.firestore().collection('markers').add(placeToSend)
    },

    async fetchMarkers() {
      try {
        const collection = await firebase.firestore().collection("markers").get()
        const markers = collection.docs
        const newMarkers = markers.map(marker => marker.data())
        return newMarkers
      } catch(e) { e.message }
    },

    async deleteMarker(id) {
      try {
        const ref = await firebase.firestore().collection("markers").where('geometry.placeId', '==', id).get()
        const docId = ref.docs[0].id
        await firebase.firestore().collection("markers").doc(docId).delete()
      } catch(e) { e.message }
    }
          
  }
}