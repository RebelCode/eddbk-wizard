import _ from 'lodash'
import Vue from 'vue'

export const set = (state, { key, value }) => {
  if (_.has(state, key) === false) throw new Error(`Can't set value. Key ${key} doesn't exist.`)
  _.set(state, key, value)
}

export const insert = (state, { list, key, value }) => {
  Vue.set(state[list], key, value)
}

export const insertBunch = (state, { list, collection, keyProp }) => {
  _.each(collection, item => {
    Vue.set(state[list], item[keyProp], item)
  })
}

export const commonMutations = {
  set,
  insert,
  insertBunch
}
