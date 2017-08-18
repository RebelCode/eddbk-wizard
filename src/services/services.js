// @flow

import Bottle from 'bottlejs'
import translate from './i18n/translate.js'
import axios from 'axios'
import { HttpHandlerInterface } from './interfaces/HttpHandlerInterface.js'
import { FormatTranslatorInterface } from './interfaces/FormatTranslatorInterface.js'

const di = new Bottle()

di.constant('translator', translate)

di.factory('translate', function (container: { translator: FormatTranslatorInterface }) {
  return container.translator.translate
})

di.constant('API_BASE_URL', '')

di.factory('http', function (container: { API_BASE_URL: string }) {
  axios.defaults.baseURL = container.API_BASE_URL
  return {
    get: axios.get,
    post: axios.post
  }
})

di.factory('fetchServices', function (container: { http: HttpHandlerInterface }) {
  return () => {
    return container.http.get('services/')
  }
})

export default di.container
