// @flow
import di from '@/services/di'
import { HttpHandlerInterface } from './interfaces/HttpHandlerInterface.js'
import { ApiInterface } from './interfaces/ApiInterface.js'
import axios from 'axios'

di.factory('http', function (container: { config: { API_BASE_URL: string } }) {
  // axiosMocks(axios, ['/services', '/sessions'])
  axios.defaults.baseURL = container.config.API_BASE_URL
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
      return http.get('/sessions', {
        params: {
          service: serviceId,
          start,
          end
        }
      })
    },

    createBooking ({ start, end, service }) {
      return http.post('/bookings', {
        start,
        end,
        service,
        resource: service,
        transition: 'cart'
      })
    }
  }
  return api
})
