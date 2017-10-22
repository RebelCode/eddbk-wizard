const ServicesPlugin = {
  install (Vue, bottle) {
    const services = bottle.container
    Vue.$services = Vue.prototype.$services = services

    // shorthands for common services
    Vue.$s = Vue.prototype.$s = services
    Vue.$_ = Vue.prototype.$_ = services.translate
    Vue.$sm = Vue.prototype.$sm = services.store
    Vue.$api = Vue.prototype.$api = services.api
    Vue.$eventBus = Vue.prototype.$eventBus = services.eventBus
    Vue.$config = Vue.prototype.$config = services.config
  }
}

export default ServicesPlugin
