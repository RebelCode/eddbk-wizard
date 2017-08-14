import Bottle from 'bottlejs'
const di = new Bottle()

import axios from 'axios'

import fetchTodos from './api/fetchTodos'

di.constant('log', function (msg) {
  console.log(msg)
})

di.constant('API_BASE', 'https://jsonplaceholder.typicode.com')

di.provider('http', function () {
  this.$get = function (container) {
    axios.defaults.baseURL = container.API_BASE
    return axios
  }
})

di.factory('fetchTodos', fetchTodos)

export default di.container
