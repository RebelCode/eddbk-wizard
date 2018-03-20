// @flow

import di from '@/services/di.js'

        const dateFormats = {
          month: 'MM/YYYY',
          date: 'DD/MM/YYYY',
          time: 'h:m a',
          displayDay: 'D MMMM'
        }

di.service('config', function () {
  return {
    appEl: '#app',
    'API_BASE_URL': 'http://127.0.0.1:8000',
    dateFormats
  }
})
