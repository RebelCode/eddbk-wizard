// @flow

import MockAdapter from 'axios-mock-adapter'

export default function (axios: Object, routes: Array<mixed>) {
  const mock = new MockAdapter(axios)

  if (routes.includes('/services')) {
    const jsonData = require('./json/services.json')
    mock.onGet('/services').reply(200, jsonData)
  }

  if (routes.includes('/sessions')) {
    const jsonData = require('./json/sessions.json')
    mock.onGet('/sessions').reply(200, jsonData)
  }
}
