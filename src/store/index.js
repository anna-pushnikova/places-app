import Vue from 'vue'
import Vuex from 'vuex'
import markers from './markersModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markers
  }
})
