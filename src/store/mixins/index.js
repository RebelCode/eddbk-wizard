import _ from 'lodash'

export const set = (state, { key, value }) => {
  if (_.has(state, key) === false) throw new Error(`Can't set value. Key ${key} doesn't exist.`)
  _.set(state, key, value)
}

export const commonMutations = {
  set
}
