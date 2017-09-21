// @flow

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ServicesPlugin from './services/plugin.js'
import store from './store'
import App from './App.vue'

Vue.use(ServicesPlugin)
Vue.use(Vuex)
Vue.config.productionTip = false

const BookingWizard = (options: {
  el: string,
  translations: Object
}) => {
  const vueInstance = new Vue({
    el: options.el,
    template: '<App/>',
    store,
    components: { App }
  })

  return vueInstance
}

window.BookingWizard = BookingWizard
