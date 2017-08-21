import services from './index.js'

const ServicesPlugin = {
  install (Vue, options) {
    Vue.$services = Vue.prototype.$services = services
    Vue.$s = Vue.prototype.$s = services // a shorthand for all services
    Vue.$_ = Vue.prototype.$_ = services.translate // a shorthand for translate service
  }
}

export default ServicesPlugin
