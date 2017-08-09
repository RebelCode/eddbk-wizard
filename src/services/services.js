import Bottle from 'bottlejs'
const di = new Bottle()

import axios from 'axios'

import fetchTodos from './api/fetchTodos'

di.constant('log', function (msg) {
  console.log(msg)
})

di.constant('API_BASE', 'https://jsonplaceholder.typicode.com')
axios.defaults.baseURL = di.container.API_BASE

di.constant('http', axios)

di.factory('fetchTodos', fetchTodos)

export default di.container
