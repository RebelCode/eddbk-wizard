// @flow

import di from '@/services/di'
import { HttpHandlerInterface } from './interfaces/HttpHandlerInterface.js'
import axios from 'axios'
import { apiSettings } from '@/config'

di.constant('API_BASE_URL', apiSettings.baseUrl)

di.factory('http', function (container: { API_BASE_URL: string }) {
  // axiosMocks(axios, ['/services', '/sessions'])
  axios.defaults.baseURL = container.API_BASE_URL
  return {
    get: axios.get,
    post: axios.post
  }
})

di.factory('api', function (container: { http: HttpHandlerInterface }) {
  const http = container.http

  return {
    fetchServices () {
      return http.get('/services')
    },

    fetchSessions ({ params }) {
      return http.get(`/service/${params.serviceId}/sessions`, {
        params: {
          start: params.start,
          end: params.end
        }
      })
    }
  }
})
