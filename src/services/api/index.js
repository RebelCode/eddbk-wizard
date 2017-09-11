// @flow

import di from '@/services/di'
import { HttpHandlerInterface } from './interfaces/HttpHandlerInterface.js'
import { ApiInterface } from './interfaces/ApiInterface.js'
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

  const api: ApiInterface = {
    fetchServices () {
      return http.get('/services')
    },

    fetchSessions ({ serviceId, start, end }) {
      return http.get(`/service/${serviceId}/sessions`, {
        params: {
          start,
          end
        }
      })
    }
  }
  return api
})
