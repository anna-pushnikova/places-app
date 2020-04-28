import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import initAxios from '@/requests/axios.js'

Vue.config.productionTip = false

Vue.use(vuelidate)

initAxios()

initApp()


function initApp () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
