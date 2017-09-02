import di from '@/services'

const ServicesPlugin = {
  install (Vue, options) {
    const services = di.container
    Vue.$services = Vue.prototype.$services = services

    // shorthands for common services
    Vue.$s = Vue.prototype.$s = services
    Vue.$_ = Vue.prototype.$_ = services.translate
    Vue.$sm = Vue.prototype.$sm = services.store
    Vue.$api = Vue.prototype.$api = services.api
  }
}

export default ServicesPlugin
