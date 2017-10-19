export default {
  insertArray (state, { collection }) {
    state.sessions = [...state.sessions, ...collection]
  }
}
