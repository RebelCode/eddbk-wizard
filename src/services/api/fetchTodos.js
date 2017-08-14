export default function ({ http }) {
  return function () {
    return http.get('/todos')
  }
}
