import _ from 'lodash'

const mapStore = (namespace, map) => {
  if (Array.isArray(map)) {
    const _map = {}
    map.forEach((key) => { _map[key] = key })
    map = _map
  }
  Object.keys(map).forEach((key) => {
    const storeKey = map[key]
    map[key] = {
      get () {
        if (this.$store.getters.hasOwnProperty(namespace + '/' + storeKey)) {
          return this.$store.getters[namespace + '/' + storeKey]
        }
        return _.get(this.$store.state, namespace + '.' + storeKey)
      },
      set (value) {
        if (this.$store.getters.hasOwnProperty(namespace + '/' + storeKey)) {
          throw new Error('Cannot execute setter on value from getter')
        }
        this.$store.commit('set', { key: namespace + '.' + storeKey, value })
      }
    }
  })
  return map
}

export {
  mapStore
}
