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

di.factory('api', function (container: { http: HttpHandlerInterface, config: { bookingStatusTransitions: Object } }) {
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

    /**
     * Send creation booking request.
     *
     * @param {string} start Booking start date, in ISO8601.
     * @param {string} end Booking end date, in ISO8601.
     * @param {number} service Booking service id.
     * @param {string} clientTz Client timezone name.
     * @param {string|null} notes Additional notes for booking.
     *
     * @return {Promise<any>} Booking creation request.
     */
    createBooking ({ start, end, service, clientTz, notes }) {
      console.info('post to /bookings', {
        start,
        end,
        service,
        resource: service,
        transition: container.config.bookingStatusTransitions.cart,
        clientTz,
        notes
      })
      return http.post('/bookings', {
        start,
        end,
        service,
        resource: service,
        transition: container.config.bookingStatusTransitions.cart,
        clientTz,
        notes
      })
    }
  }
  return api
})
