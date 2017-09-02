// @flow

import Bottle from 'bottlejs'
import translate from './i18n/translate.js'
import axios from 'axios'
// import axiosMocks from './api/mocks/axiosMocks.js'
import { HttpHandlerInterface } from './interfaces/HttpHandlerInterface.js'
import { FormatTranslatorInterface } from './interfaces/FormatTranslatorInterface.js'
import { StoreManagerInterface } from './interfaces/StoreManagerInterface.js'
import vuexBasedStore from './storeManager/vuexBasedStore.js'
import { apiSettings } from '@/config'

export const di = new Bottle()

di.constant('translator', translate)

di.factory('translate', function (container: { translator: FormatTranslatorInterface }) {
  return container.translator.translate
})

di.constant('API_BASE_URL', apiSettings.baseUrl)

di.factory('http', function (container: { API_BASE_URL: string }) {
  // axiosMocks(axios, ['/services', '/sessions'])
  axios.defaults.baseURL = container.API_BASE_URL
  return {
    get: axios.get,
    post: axios.post
  }
})

di.factory('fetchServices', function (container: { http: HttpHandlerInterface }) {
  return () => {
    return container.http.get('/services')
  }
})

di.factory('fetchSessions', function (container: { http: HttpHandlerInterface }) {
  return ({ params }) => {
    return container.http.get('/sessions', { params })
  }
})

di.constant('storeManager', vuexBasedStore)
di.factory('store', function (container: { storeManager: StoreManagerInterface }) {
  return container.storeManager
})

export default di.container
