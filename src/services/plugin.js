import services from './services.js'

const ServicesPlugin = {
  install (Vue, options) {
    Vue.prototype.$services = services
    Vue.prototype.$s = services // a shorthand for all services
    Vue.prototype.$t = services.translate // a shorthand for translate service
  }
}

export default ServicesPlugin
