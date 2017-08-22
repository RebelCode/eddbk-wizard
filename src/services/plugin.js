import services from './index.js'

const ServicesPlugin = {
  install (Vue, options) {
    Vue.$services = Vue.prototype.$services = services
    Vue.$s = Vue.prototype.$s = services // a shorthand for all services
    Vue.$_ = Vue.prototype.$_ = services.translate // a shorthand for translate service
    Vue.$st = Vue.prototype.$st = services.store // a shorthand for store service
  }
}

export default ServicesPlugin
