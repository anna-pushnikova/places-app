import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'

import numberFilter from '@/filters/number'
import capitalLetterFilter from '@/filters/capitalLetter'

import VueGoogleApi from 'vue-google-api/index.js'

import toastPlugin from './utils/alert'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobeAmericas, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.filter('number', numberFilter)
Vue.filter('capitalLetter', capitalLetterFilter)
Vue.use(toastPlugin)

Vue.config.devtools = true

/*
* Fontawesome 
*/

library.add(faGlobeAmericas, faFileAlt, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/*
* Google authorizaion
*/


Vue.use(VueGoogleApi, {
  apiKey: process.env.VUE_APP_API_KEY,
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: process.env.VUE_APP_SCOPE,
  discoveryDocs: [ process.env.VUE_APP_DISCOVERY_DOCS ] 
  // all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
})

/*
* App's Firebase initialization
*/ 

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
})

/*
* Vue initialization
*/

initApp()

function initApp () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
