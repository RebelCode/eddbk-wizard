import services from './services.js';

const ServicesPlugin = {
  install (Vue, options) {
    Vue.prototype.$services = services;
  }
}

export default ServicesPlugin;
