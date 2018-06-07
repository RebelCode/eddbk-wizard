// @flow

import di from '@/services/di.js'

const dateFormats = {
  month: 'MM/YYYY',
  date: 'DD/MM/YYYY',
  time: 'h:mm a',
  displayDay: 'D MMMM',
  fullDate: 'dddd Do MMMM YYYY'
}

const bookingStatusTransitions = {
  cart: 'cart'
}

di.service('config', function () {
  return {
    appEl: '#app',
    'API_BASE_URL': 'http://127.0.0.1:8000',
    redirectUrl: null,
    dateFormats,
    bookingStatusTransitions
  }
})
