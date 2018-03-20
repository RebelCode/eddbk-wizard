// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ServicesPlugin from './services/plugin.js'
import store from './store'
import App from './App.vue'

export default function (bottle) {
  Vue.use(ServicesPlugin, bottle)
  Vue.use(Vuex)
  Vue.config.productionTip = false

  const vueInstance = new Vue({
    el: bottle.container.config.appEl,
    template: '<App/>',
    store,
    components: { App }
  })

  return vueInstance
}
