// @flow

import di from '@/services/di.js'
import { StoreManagerInterface } from './interfaces/StoreManagerInterface.js'
import vuexBasedStore from './vuexBasedStore.js'

di.constant('storeManager', vuexBasedStore)
di.factory('store', function (container: { storeManager: StoreManagerInterface }) {
  return container.storeManager
})
