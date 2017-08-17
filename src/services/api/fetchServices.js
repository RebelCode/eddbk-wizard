export default function ({ http }) {
  return () => {
    return http.get('services/')
  }
}
