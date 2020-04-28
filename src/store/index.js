import Vue from 'vue'
import Vuex from 'vuex'
import authenticationModule from './modules/authenticationModule'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    authentication: authenticationModule
  },
  plugins: [
    vuexLocal.plugin
  ]
})
