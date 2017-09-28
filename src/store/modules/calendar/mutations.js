// import { vueSet } from 'vue-deepset'

export default {
  insertArray (state, { collection }) {
    state.sessions = [...state.sessions, ...collection]
  }
}
