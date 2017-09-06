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
    Vue.$repo = Vue.prototype.$repo = services.repo
    Vue.$eventHub = Vue.prototype.$eventHub = services.eventHub
  }
}

export default ServicesPlugin
